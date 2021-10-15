import { isSourceReference, SourceReference, MarshalledSourceReference } from "./source-reference";
import { isAsyncIterable, AsyncIterableLike, isIterable } from "iterable";
import { Fragment } from "./fragment";
import type { PromiseVNodeThenFn } from "./then";

/**
 * Generic VNode, represents a virtual node within a state tree
 *
 * The VNode can be used to hydrate native state or external sources
 */
export interface VNode {
  /**
   * A unique reference to this {@link VNode}, this could be a globally unique symbol like {@link Fragment}
   */
  reference: SourceReference;
  /**
   * An `AsyncIterable` that will return a `VNode[]` that represents a group of children updates
   * Each iteration represents an update to the {@link VNode}'s children state
   */
  children?: AsyncIterable<VNode[]>;
  /**
   * The resolved source for the {@link VNode}
   */
  source?: unknown;
  /**
   * The options provided to the {@link VNode} from the {@link CreateNodeFn} function
   */
  options?: object;
  /**
   * See {@link ScalarVNode}
   */
  scalar?: boolean;
  /**
   * See {@link NativeVNode}
   */
  native?: boolean;
  /**
   * See {@link PromiseVNode}
   */
  then?: unknown;
}

export interface PromiseVNode extends VNode {
  then: PromiseVNodeThenFn;
}

/**
 * A {@link VNode} that has been marshalled, allowing for transmission or storage of the VNode state
 *
 * Children can be represented as a synchronous iterable such as an array, which then utilises synchronous iterables
 * for each update list of children
 */
export type MarshalledVNode = Omit<VNode, "children" | "reference"> & {
  reference?: MarshalledSourceReference;
  children: Iterable<Iterable<MarshalledVNode | MarshalledSourceReference>>;
};

/**
 * A {@link VNode} that has a scalar {@link SourceReference} {@link VNode.source}
 *
 * A {@link ScalarVNode} can still have both {@link VNode.options} and {@link VNode.children}, so they should not be
 * disregarded
 *
 * A {@link ScalarVNode} can be used to represent a {@link VNode} with no backing {@link VContext}, which can be
 * picked up in a later external process
 */
export interface ScalarVNode<S extends SourceReference = SourceReference> extends VNode {
  source: S;
  scalar: true;
}

/**
 * Readers should utilise {@link NativeVNode} to indicate that the {@link VNode} is backed by a native
 * representation
 */
export interface NativeVNode extends VNode {
  native: true;
}

/**
 * A {@link FragmentVNode} indicates a {@link VNode} where the {@link FragmentVNode} should be ignored and its
 * {@link VNode.children} should take its place
 *
 * A {@link FragmentVNode} may have no children, in which case, it should be ignored completely
 */
export interface FragmentVNode extends VNode {
  reference: typeof Fragment;
}

export interface FragmentVNodeWithChildren extends FragmentVNode {
  children: AsyncIterable<VNode[]>
}

export interface SourceReferenceVNode<S extends SourceReference = SourceReference> extends VNode {
  source: S;
}

/**
 * A {@link VNode} that requires asynchronous resolution
 */
export type AsyncVNodeRepresentation = Promise<VNode> | AsyncIterable<VNode>;
/**
 * A {@link VNode} that can be resolved synchronously
 */
export type SyncVNodeRepresentation = SourceReference | VNode | Iterable<VNode>;
/**
 * A {@link VNode} with requiring _either_ synchronous or asynchronous resolution
 */
export type VNodeRepresentation = AsyncVNodeRepresentation | SyncVNodeRepresentation;
/**
 * A value that represents a {@link VNode}
 */
export type BasicVNodeRepresentation = VNodeRepresentation | AsyncIterableLike<VNodeRepresentation>;
/**
 * A value that represents a {@link VNode}
 */
export type VNodeRepresentationSource = BasicVNodeRepresentation | AsyncIterableLike<BasicVNodeRepresentation>;
