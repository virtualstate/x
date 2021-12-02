export function isAsyncIterable<T>(value: unknown): value is AsyncIterable<T> {
  function isAsyncIterableInstance(value: unknown): value is AsyncIterable<T> {
    return !!value;
  }
  return !!(
    isAsyncIterableInstance(value) &&
    value[Symbol.asyncIterator] instanceof Function
  );
}
