import { ChildrenSource, isVNode, VNode } from "@virtualstate/fringe";

export function createStaticNode(node: VNode) {
  const children = node.children?.[ChildrenSource]
  const staticChildren = {
    [Symbol.asyncIterator]() {
      if (!Array.isArray(children)) {
        return;
      }
      const nodes = children.filter(isVNode);
      if (!nodes.length) {
        return;
      }
      let yielded = false;
      return {
        async next() {
          if (yielded) {
            return { done: true };
          }
          yielded = true;
          return { done: false, value: nodes };
        }
      }
    }
  };
  return new Proxy(node, {
    get(target: VNode, p: string | symbol) {
      if (p !== "children") {
        return target[p];
      }
      return staticChildren;
    }
  })
}
