/**
 * A scalar source reference that can be transmitted or stored
 */
export type MarshalledSourceReference = string | number | boolean | BigInt;
/**
 * A scalar source reference, this could be either referencing a {@link NativeVNode} or referencing direct source
 *
 * A symbol cannot be stored, it exists only in process
 */
export type SourceReference = MarshalledSourceReference | symbol;
