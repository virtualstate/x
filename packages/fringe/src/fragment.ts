import { VNode, VNodeRepresentationSource } from "./vnode";
import { createNode } from "./create-node";

/**
 * `unique symbol` to represent a {@link FragmentVNode}, this will be used on the {@link VNode.reference} property.
 * The {@link FragmentVNode} should be ignored and the {@link VNode.children} values should be used in its place
 */
export const Fragment = Symbol.for("@virtualstate/fringe/fragment");

export function createFragment(options?: Record<string, unknown>, ...children: VNodeRepresentationSource[]): VNode {
  return createNode(Fragment, options, ...children);
}
