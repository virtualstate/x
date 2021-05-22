/**
 * A scalar source reference that can be transmitted or stored
 */
export declare type MarshalledSourceReference = string | number | boolean | BigInt;
/**
 * A scalar source reference, this could be either referencing a {@link NativeVNode} or referencing direct source
 *
 * A symbol cannot be stored, it exists only in process
 */
export declare type SourceReference = MarshalledSourceReference | symbol;
/**
 * Indicates if a value is a {@link MarshalledSourceReference}
 * @param value
 */
export declare function isMarshalledSourceReference(value: unknown): value is MarshalledSourceReference;
/**
 * Indicates if a value is a {@link SourceReference}
 * @param value
 */
export declare function isSourceReference(value: unknown): value is SourceReference;
//# sourceMappingURL=source-reference.d.ts.map