export function isIterable<T>(value: unknown): value is Iterable<T> {
  function isIterableInstance(value: unknown): value is Iterable<T> {
    return !!value;
  }
  return !!(
    isIterableInstance(value) &&
    value[Symbol.iterator] instanceof Function
  );
}
