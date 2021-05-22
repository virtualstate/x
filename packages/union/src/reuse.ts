export const Reuse = Symbol.for("@virtualstate/union/reuse");

export function isReuse<T extends object>(value: T): value is T & { [Reuse]: true } {
  function isReuseLike(value: object): value is { [Reuse]: unknown } {
    return !!value;
  }
  return isReuseLike(value) && value[Reuse] === true;
}

export function setReuse<T extends object>(value: T): asserts value is T & { [Reuse]: true } {
  if (isReuse(value)) {
    return;
  }
  Object.defineProperty(value, Reuse, {
    get() {
      return true;
    }
  });
}
