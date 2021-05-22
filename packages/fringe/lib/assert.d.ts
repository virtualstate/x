interface Assertion<V, T extends V> {
    is(value: V): value is T;
    message?: string;
}
export declare function assert<V, T extends V, This extends (Assertion<V, T> | void)>(this: This, value: V, assertion: This extends Assertion<V, T> ? never : Assertion<V, T>): asserts value is T;
export {};
//# sourceMappingURL=assert.d.ts.map