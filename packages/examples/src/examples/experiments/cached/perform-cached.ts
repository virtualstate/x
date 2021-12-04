import {deferred} from "./deferred";
import {isAsyncIterable, isPromise} from "iterable";

export async function *performCached<T>(
  caches: (Pick<WeakMap<object, unknown>, "get" | "set"> | undefined)[],
  intermediateCacheEnabled: boolean,
  key: object,
  input: AsyncIterable<T>
): AsyncIterable<T> {
  /**
   * Returns an async iterable that moves forward in value
   * Whenever an iterator is added, it will start at the most recent value
   * that was yielded, and continue from there
   */
  function queue<T>() {
    interface QueueResult {
      next: Promise<QueueResult>
      value: T
      done?: boolean
    }
    interface Queue extends AsyncIterable<T>, PromiseLike<T> {
      value<Z extends T>(value: Z): Z;
      end(): void;
      reject(error: unknown): void;
    }
    let done = false;
    let current = deferred<QueueResult>();
    let value: T;
    let error: unknown;
    const q: Queue = {
      value<Z extends T>(nextValue: Z): Z {
        if (intermediateCacheEnabled) {
          value = nextValue;
          const previous = current;
          current = deferred();
          previous.resolve({
            next: current.promise,
            value: nextValue,
            done: false
          });
        }
        return nextValue;
      },
      end() {
        done = true;
        if (intermediateCacheEnabled) {
          current.resolve({
            value: undefined,
            done: true,
            next: current.promise
          });
        }
      },
      reject(nextError: unknown) {
        if (done) return;
        done = true;
        if (intermediateCacheEnabled) {
          error = nextError;
          current.reject(nextError);
        }
      },
      async *[Symbol.asyncIterator](): AsyncIterator<T> {
        if (typeof value !== "undefined") {
          yield value;
        }
        let result: Partial<QueueResult> = {
          next: current.promise
        }
        do {
          result = await result.next;
          if (!result.done && typeof result.value !== "undefined") {
            yield value;
          }
        } while (!result.done)
      },
      async then(resolve, reject) {
        if (error) {
          return reject(error);
        }
        if (done) {
          return resolve(value);
        }
        return wait().then(resolve, reject);
        async function wait<T>() {
          let value;
          for await (value of q) {}
          return value;
        }
      }
    };
    return q;
  }

  const existingValue = caches.reduce((found, cache) => found ?? cache?.get(key), undefined);
  if (intermediateCacheEnabled && isAsyncIterable<T>(existingValue)) {
    // If we have an async iterable, we can replay it
    return yield * existingValue;
  } else if (intermediateCacheEnabled && isPromise<T>(existingValue)) {
    const value: T = await existingValue;
    if (isValueNotUndefined(value)) {
      yield value;
    }
    return;
  } else if (isValueNotUndefined(existingValue) && (intermediateCacheEnabled || !isPromise(existingValue))) {
    return yield existingValue;
  }
  const q = queue<T>();
  if (intermediateCacheEnabled) {
    for (const cache of caches) {
      cache?.set(key, q);
    }
  }
  let value: T;
  try {
    for await (value of input) {
      yield q.value(value);
    }
  } catch (error) {
    if (intermediateCacheEnabled) {
      resetCachesIfPromise()
      q.reject(error);
    }
    await Promise.reject(error);
    throw error; // awaiting a rejected promise above should close this stack... but for a programmers eye...
  }
  for (const cache of caches) {
    cache?.set(key, value);
  }
  if (intermediateCacheEnabled) {
    q.end();
  }

  function resetCachesIfPromise() {
    for (const cache of caches) {
      if (cache?.get(key) === q) {
        cache.set(key, undefined);
      }
    }
  }

  function isValueNotUndefined(value: unknown): value is T {
    return typeof value !== "undefined";
  }
}
