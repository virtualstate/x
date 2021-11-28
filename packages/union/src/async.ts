import {isAsyncIterable} from "iterable";

export type Input<T> = AsyncIterable<T> | Iterable<T>;

export function asAsync<T>(iterable: Input<T>): AsyncIterable<T> {
  if (isAsyncIterable(iterable)) {
    return iterable;
  } else {
    return as();
  }
  async function *as() {
    yield *iterable;
  }
}
