export function assert(value, assertion) {
    const resolved = assertion ?? this;
    if (!resolved) {
        throw new Error("Expected assertion");
    }
    if (!resolved.is(value)) {
        throw new Error(resolved.message ?? "Unexpected value");
    }
}
//# sourceMappingURL=assert.js.map