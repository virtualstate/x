import { AsyncIterableLike } from "iterable";
import { VNode, VNodeRepresentationSource } from "./vnode";
import { SourceReference } from "./source-reference";

/**
 * A {@link SourceReference} that requires asynchronous resolution
 */
export type AsyncSourceRepresentation = VNodeRepresentationSource | Promise<unknown> | AsyncIterable<unknown>;
/**
 * A {@link SourceReference} that can be resolved synchronously
 */
export type SyncSourceRepresentation = SourceReference | Iterable<SourceReference>;
/**
 * A {@link SourceReference} with requiring _either_ synchronous or asynchronous resolution
 */
export type SourceRepresentation = AsyncSourceRepresentation | SyncSourceRepresentation;
/**
 * A function that resolves to a {@link SourceRepresentation} which can be further processed to obtain a group of {@link SourceReference} values
 */
export type SourceRepresentationFactory<O extends object = object> = (options: O, children: VNode) => SourceRepresentation;
/**
 * A value that represents a {@link SourceReference}
 */
export type SourceRepresentationLike<O extends object = object> = SourceRepresentation | SourceRepresentationFactory<O>;
/**
 * A value that represents a {@link SourceReference}
 */
export type BasicSourceRepresentation<O extends object = object> = SourceRepresentationLike<O> | AsyncIterableLike<SourceRepresentationLike<O>>;
/**
 * A value that represents a {@link SourceReference}
 */
export type Source<O extends object = object> = BasicSourceRepresentation<O> | AsyncIterableLike<BasicSourceRepresentation<O>>;
