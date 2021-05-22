import { Fragment, FragmentVNode, isFragmentVNode, isNativeVNode, NativeVNode, VNode } from "@virtualstate/fringe";
import { DOMNativeVNode } from "./node";
import { NativeOptions } from "./options";
import { children } from "./children";

const FragmentDOMNativeVNodeSymbol = Symbol("Fragment DOM Native VNode");

export interface FragmentDOMNativeVNode extends NativeVNode {
  reference: typeof Fragment;
  children: AsyncIterable<DOMNativeVNode[]>;
  [FragmentDOMNativeVNodeSymbol]: true;
}

export function createFragment(node: VNode): FragmentDOMNativeVNode {
  const fragment: FragmentDOMNativeVNode = {
    ...node,
    children: children(node),
    reference: Fragment,
    options: node.options,
    native: true,
    [FragmentDOMNativeVNodeSymbol]: true
  };
  assertFragmentDOMNativeVNode(fragment);
  return fragment;
}

export function isFragmentDOMNativeVNode(node: VNode): node is FragmentDOMNativeVNode {
  function isFragmentDOMNativeVNodeLike(node: VNode): node is FragmentVNode & { [FragmentDOMNativeVNodeSymbol]?: unknown, hydrated?: unknown } {
    return isFragmentVNode(node);
  }
  return (
    isFragmentDOMNativeVNodeLike(node) &&
    node[FragmentDOMNativeVNodeSymbol] === true &&
    isNativeVNode(node)
  );
}

export function assertFragmentDOMNativeVNode(node: VNode): asserts node is FragmentDOMNativeVNode {
  if (!isFragmentDOMNativeVNode(node)) {
    throw new Error("Expected FragmentDOMNativeVNode");
  }
}
