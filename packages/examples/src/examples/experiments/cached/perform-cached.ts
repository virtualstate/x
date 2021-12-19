import {deferred} from "./deferred";
import {isAsyncIterable, isPromise} from "iterable";
import {queue} from "./queue";

export async function *performCached<T>(
  caches: (Pick<WeakMap<object, unknown>, "get" | "set"> | undefined)[],
  intermediateCacheEnabled: boolean,
  key: object,
  input: AsyncIterable<T>
): AsyncIterable<T> {

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
  const q = queue<T>(intermediateCacheEnabled);
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
