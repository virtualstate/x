/**
 * Indicates if a value is a {@link MarshalledSourceReference}
 * @param value
 */
export function isMarshalledSourceReference(value) {
    return (typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        typeof value === "bigint");
}
/**
 * Indicates if a value is a {@link SourceReference}
 * @param value
 */
export function isSourceReference(value) {
    return (typeof value === "symbol" ||
        isMarshalledSourceReference(value));
}
//# sourceMappingURL=source-reference.js.map