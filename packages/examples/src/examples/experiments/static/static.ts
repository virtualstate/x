import { ChildrenSource, isVNode, VNode } from "@virtualstate/fringe";

export function Sync(o: unknown, node?: VNode) {
  if (!node) return undefined;
  return createStaticSyncNode(node);
}

export function createStaticSyncNode(node: VNode) {
  const children = node.children?.[ChildrenSource]
  const staticChildren = {
    [Symbol.asyncIterator]() {
      let yielded = false;
      return {
        next() {
          return {
            then(resolve) {
              if (yielded) {
                return resolve({ done: true });
              }
              if (!Array.isArray(children)) {
                return resolve({ done: true });
              }
              const nodes = children.filter(isVNode);
              if (!nodes.length) {
                return resolve({ done: true });
              }
              yielded = true;
              return resolve({ done: false, value: nodes });
            }
          }
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
