import {FragmentVNode, VNode, VNodeRepresentationSource} from "./vnode";
import {CreateNodeResult} from "./source";

/**
 * `unique symbol` to represent a {@link FragmentVNode}, this will be used on the {@link VNode.reference} property.
 * The {@link FragmentVNode} should be ignored and the {@link VNode.children} values should be used in its place
 */
const Fragment = Symbol.for("@virtualstate/fringe/fragment");
export type FragmentSymbol = typeof Fragment;

export interface CreateFragmentFn {
  <O extends Record<string, unknown> | object, C extends unknown[]>(options: O, ...children: C): CreateNodeResult<typeof Fragment, O, C>;
  (options?: Record<string, unknown>, ...children: VNodeRepresentationSource[]): FragmentVNode;
}
