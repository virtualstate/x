import {FragmentVNode, MarshalledVNode, VNode, VNodeRepresentationSource} from "./vnode";
import { createNode } from "./create-node";
import {CreateNodeResult} from "./source";

/**
 * `unique symbol` to represent a {@link FragmentVNode}, this will be used on the {@link VNode.reference} property.
 * The {@link FragmentVNode} should be ignored and the {@link VNode.children} values should be used in its place
 */
export const Fragment = Symbol.for("@virtualstate/fringe/fragment");

export function createFragment<O extends Record<string, unknown> | object, C extends unknown[]>(options: O, ...children: C): CreateNodeResult<typeof Fragment, O, C>;
export function createFragment(options?: Record<string, unknown>, ...children: VNodeRepresentationSource[]): FragmentVNode;
export function createFragment(options?: Record<string, unknown>, ...children: VNodeRepresentationSource[]): FragmentVNode {
  return createNode(Fragment, options, ...children);
}
