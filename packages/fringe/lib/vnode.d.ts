import { SourceReference, MarshalledSourceReference } from "./source-reference";
import { AsyncIterableLike } from "iterable";
import { Fragment } from "./fragment";
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
}
/**
 * A {@link VNode} that has been marshalled, allowing for transmission or storage of the VNode state
 *
 * Children can be represented as a synchronous iterable such as an array, which then utilises synchronous iterables
 * for each update list of children
 */
export declare type MarshalledVNode = Omit<VNode, "children" | "reference"> & {
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
/**
 * A {@link VNode} that requires asynchronous resolution
 */
export declare type AsyncVNodeRepresentation = Promise<VNode> | AsyncIterable<VNode>;
/**
 * A {@link VNode} that can be resolved synchronously
 */
export declare type SyncVNodeRepresentation = MarshalledVNode | SourceReference | VNode | Iterable<VNode>;
/**
 * A {@link VNode} with requiring _either_ synchronous or asynchronous resolution
 */
export declare type VNodeRepresentation = AsyncVNodeRepresentation | SyncVNodeRepresentation;
/**
 * A value that represents a {@link VNode}
 */
export declare type BasicVNodeRepresentation = VNodeRepresentation | AsyncIterableLike<VNodeRepresentation>;
/**
 * A value that represents a {@link VNode}
 */
export declare type VNodeRepresentationSource = BasicVNodeRepresentation | AsyncIterableLike<BasicVNodeRepresentation>;
/**
 * Indicates if a value is a {@link VNode}
 * @param value
 */
export declare function isVNode(value: unknown): value is VNode;
/**
 * Indicates if a value is a {@link NativeVNode}
 * @param value
 */
export declare function isNativeVNode(value: unknown): value is NativeVNode;
/**
 * Indicates if a value is a {@link ScalarVNode}
 * @param value
 */
export declare function isScalarVNode(value: unknown): value is ScalarVNode;
export declare function isScalarVNode<T extends SourceReference = SourceReference>(value: unknown, isSource: (value: SourceReference) => value is T): value is ScalarVNode<T>;
/**
 * Indicates if a value is a {@link FragmentVNode}
 * @param value
 */
export declare function isFragmentVNode(value: unknown): value is FragmentVNode;
/**
 * Indicates if a valid is a {@link MarshalledVNode}
 * @param value
 */
export declare function isMarshalledVNode(value: unknown): value is MarshalledVNode;
//# sourceMappingURL=vnode.d.ts.map