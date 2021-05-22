import { VNode } from "@virtualstate/fringe";
import { DOMNativeVNode, isDOMNativeVNode } from "./node";
import { UnionInput, union } from "@virtualstate/union";
import { FragmentDOMNativeVNode, isFragmentDOMNativeVNode } from "./fragment";
import { Native } from "./native";
import { withOptions } from "./with-options";
import type { Input } from "@virtualstate/union";

export function children(node: VNode): AsyncIterable<DOMNativeVNode[]> {
  return {
    async *[Symbol.asyncIterator]() {
      yield *childrenGenerator();
    }
  };
  async function *childrenGenerator(): AsyncIterable<DOMNativeVNode[]> {
    if (!node.children) return;
    for await (const children of node.children) {
      if (!children.length) {
        continue;
      }
      if (children.every(isDOMNativeVNode)) {
        yield [...children];
        continue;
      }
      // We have a bunch of iterables, async or not, that will provide an array of
      // ElementDOMNativeVNode for each iteration
      const lanes: UnionInput<DOMNativeVNode[]> = children
        .map(withOptions({}, Native))
        .map(elementChildren);
      const merged: AsyncIterable<ReadonlyArray<DOMNativeVNode[] | undefined>> = union(lanes);
      for await (const parts of merged) {
        yield parts.reduce<DOMNativeVNode[]>(
          (updates , part) => updates.concat(part ?? []),
          []
        );
      }
    }
  }

  function elementChildren(node: FragmentDOMNativeVNode | DOMNativeVNode): Input<DOMNativeVNode[]> {
    return isFragmentDOMNativeVNode(node) ? node.children : [[node]];
  }
}
