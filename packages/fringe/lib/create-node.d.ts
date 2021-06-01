import { CreateNodeResult, Source } from "./source";
import { VNode } from "./vnode";
export declare const Child: unique symbol;
export interface CreateNodeFn {
    <T extends Source>(source: T): CreateNodeResult<T>;
    <T extends Source, O extends Record<string, unknown>>(source: T, options: O): CreateNodeResult<T, O>;
    <T extends Source, O extends Record<string, unknown>, C extends unknown[]>(source: T, options: O, ...children: C): CreateNodeResult<T, O, C>;
    (source: Source, options?: Record<string, unknown>, ...children: unknown[]): VNode;
    (source: unknown, options?: Record<string, unknown>, ...children: unknown[]): VNode;
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
export declare function createNode<T extends Source>(source: T): CreateNodeResult<T>;
export declare function createNode<T extends Source, O extends Record<string, unknown>>(source: T, options: O): CreateNodeResult<T, O>;
export declare function createNode<T extends Source, O extends Record<string, unknown>, C extends unknown[]>(source: T, options: O, ...children: C): CreateNodeResult<T, O, C>;
export declare function createNode(source: Source, options?: Record<string, unknown>, ...children: unknown[]): VNode;
export declare function createNode(source: unknown, options?: Record<string, unknown>, ...children: unknown[]): VNode;
//# sourceMappingURL=create-node.d.ts.map