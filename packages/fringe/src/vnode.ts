import { isSourceReference, SourceReference, MarshalledSourceReference } from "./source-reference";
import { isAsyncIterable, AsyncIterableLike, isIterable } from "iterable";
import { Fragment } from "./fragment";
import type { PromiseVNodeThenFn } from "./then";
import type { VNodeChildren } from "./children";

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
  children?: VNodeChildren;
  /**
   * The resolved source for the {@link VNode}
   *
   * A {@link VContext} may choose to utilise an external value to represent the source
   */
  source?: unknown;
  /**
   * The options provided to the {@link VNode} from the {@link createNode} function
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
 * {@link VContext} should utilise {@link NativeVNode} to indicate that the {@link VNode} is backed by a native
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
export type AsyncVNodeRepresentation = Promise<SyncVNodeRepresentation> | AsyncIterable<SyncVNodeRepresentation>;
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

function isVNodeLike(value: unknown): value is Partial<VNode> {
  return !!value && (typeof value === "object" || typeof value === "function");
}

/**
 * Indicates if a value is a {@link VNode}
 * @param value
 */
export function isVNode(value: unknown): value is VNode {
  return !!(
    isVNodeLike(value) &&
    isSourceReference(value.reference) &&
    (
      !value.children ||
      isAsyncIterable(value.children)
    ) &&
    (
      !value.options ||
      typeof value.options === "object"
    )
  );
}


/**
 * Asserts a value is a {@link VNode}
 * @param value
 */
export function assertVNode(value: unknown): asserts value is VNode {
  if (!isVNode(value)) {
    throw new Error("Expected VNode");
  }
}

/**
 * Indicates if a value is a {@link NativeVNode}
 * @param value
 */
export function isNativeVNode(value: unknown): value is NativeVNode {
  function isNativeVNodeLike(value: unknown): value is VNode & { native?: unknown, source?: unknown } {
    return isVNode(value);
  }
  return (
    isNativeVNodeLike(value) &&
    value.native === true
  );
}


/**
 * Asserts a value is a {@link NativeVNode}
 * @param value
 */
export function assertNativeVNode(value: unknown): asserts value is NativeVNode {
  if (!isNativeVNode(value)) {
    throw new Error("Expected NativeVNode");
  }
}

/**
 * Indicates if a value is a {@link ScalarVNode}
 * @param value
 */
export function isScalarVNode(value: unknown): value is ScalarVNode;
export function isScalarVNode<T extends SourceReference = SourceReference>(value: unknown, isSource: (value: SourceReference) => value is T): value is ScalarVNode<T>;
export function isScalarVNode<T extends SourceReference = SourceReference>(value: unknown, isSource?: (value: SourceReference) => value is T): value is ScalarVNode<T> {
  function isScalarVNodeLike(value: unknown): value is VNode & { scalar?: unknown } {
    return isVNode(value);
  }
  return (
    isScalarVNodeLike(value) &&
    isSourceReference(value.source) &&
    value.scalar === true &&
    (
      typeof isSource === "function" ? isSource(value.source) : true
    )
  );
}

/**
 * Asserts a value is a {@link ScalarVNode}
 * @param value
 */
export function assertScalarVNode(value: unknown): asserts value is ScalarVNode;
export function assertScalarVNode<T extends SourceReference = SourceReference>(value: unknown, isSource: (value: SourceReference) => value is T): asserts value is ScalarVNode<T>;
export function assertScalarVNode<T extends SourceReference = SourceReference>(value: unknown, isSource?: (value: SourceReference) => value is T): asserts value is ScalarVNode<T> {
  if (!isScalarVNode(value, isSource)) {
    throw new Error("Expected ScalarVNode");
  }
}

/**
 * Indicates if a value is a {@link FragmentVNode}
 * @param value
 */
export function isFragmentVNode(value: unknown): value is FragmentVNode {
  return (
    isVNode(value) &&
    value.reference === Fragment
  );
}

/**
 * Asserts a value is a {@link FragmentVNode}
 * @param value
 */
export function assertFragmentVNode(value: unknown): asserts value is FragmentVNode {
  if (!isFragmentVNode(value)) {
    throw new Error("Expected FragmentVNode");
  }
}

/**
 * Indicates if a value is a {@link MarshalledVNode}
 * @param value
 */
export function isMarshalledVNode(value: unknown): value is MarshalledVNode {
  return (
    isVNodeLike(value) &&
    (
      !value.reference ||
      isSourceReference(value.reference)
    ) &&
    // If we don't have children, then we have a normal VNode
    isIterable(value.children) &&
    (
      !value.options ||
      typeof value.options === "object"
    )
  );
}

/**
 * Asserts a value is a {@link MarshalledVNode}
 * @param value
 */
export function assertMarshalledVNode(value: unknown): asserts value is MarshalledVNode {
  if (!isMarshalledVNode(value)) {
    throw new Error("Expected MarshalledVNode");
  }
}

/**
 * Indicates if a value is a {@link PromiseVNode}
 * @param value
 */
export function isPromiseVNode(value: unknown): value is PromiseVNode {
  return (
    isVNode(value) &&
    typeof value.then === "function"
  );
}

/**
 * Asserts a value is a {@link PromiseVNode}
 * @param value
 */
export function assertPromiseVNode(value: unknown): asserts value is PromiseVNode {
  if (!isPromiseVNode(value)) {
    throw new Error("Expected PromiseVNode");
  }
}
