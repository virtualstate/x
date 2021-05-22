interface Assertion<V, T extends V> {
  is(value: V): value is T;
  message?: string;
}

export function assert<V, T extends V, This extends (Assertion<V, T> | void)>(this: This, value: V, assertion: This extends Assertion<V, T> ? never : Assertion<V, T>): asserts value is T {
  const resolved: Assertion<V, T> | void = assertion ?? this;
  if (!resolved) {
    throw new Error("Expected assertion");
  }
  if (!resolved.is(value)) {
    throw new Error(resolved.message ?? "Unexpected value");
  }
}
