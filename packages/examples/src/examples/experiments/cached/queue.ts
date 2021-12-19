import {deferred} from "./deferred";

export interface QueueResult<T> {
  next: Promise<QueueResult<T>>
  value: T
  done?: boolean
}
export interface Queue<T> extends AsyncIterable<T>, PromiseLike<T> {
  value<Z extends T>(value: Z): Z;
  end(): void;
  reject(error: unknown): void;
}
/**
 * Returns an async iterable that moves forward in value
 * Whenever an iterator is added, it will start at the most recent value
 * that was yielded, and continue from there
 */
export function queue<T>(enabled?: boolean): Queue<T> {
  let done = false;
  let current = deferred<QueueResult<T>>();
  let value: T;
  let error: unknown;
  const q: Queue<T> = {
    value<Z extends T>(nextValue: Z): Z {
      if (enabled !== false) {
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
      if (enabled !== false) {
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
      if (enabled !== false) {
        error = nextError;
        current.reject(nextError);
      }
    },
    [Symbol.asyncIterator](): AsyncIterator<T> {
      let initialValue = value;
      let result: Partial<QueueResult<T>> = {
        next: current.promise
      };
      return {
        async next() {
          if (typeof initialValue !== "undefined") {
            const result = { value: initialValue, done: false };
            initialValue = undefined;
            return result;
          }
          result = await result.next;
          return {
            value: result.value,
            done: result.done
          }
        }
      }
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
