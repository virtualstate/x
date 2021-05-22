import { Source } from "./source";
import { VNode, VNodeRepresentationSource } from "./vnode";
export declare const Child: unique symbol;
export interface CreateNodeFn<O extends object = object> {
    <O extends object = object>(source: Source<O>, options?: O, ...children: VNodeRepresentationSource[]): VNode;
}
/**
 * Generates instances of {@link FragmentVNode} based on the provided source
 *
 * See {@link Source} for an explanation on each type and how they are represented as a {@link VNode}
 *
 * The provided {@link VContext} may override this functionality, possibly resulting in a {@link NativeVNode}
 *
 * The special case to point out here is if the source is an `IterableIterator` (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Is_a_generator_object_an_iterator_or_an_iterable})
 * then each iteration will result in a new {@link VNode} being created
 */
export declare function createNode(source: unknown, options?: object, ...children: VNodeRepresentationSource[]): VNode;
export declare function createNode<O extends object = object>(source: Source<O>, options?: O, ...children: VNodeRepresentationSource[]): VNode;
//# sourceMappingURL=create-node.d.ts.map