import {VNode} from "@virtualstate/fringe";

export function proxyProperties(node: VNode, record: Record<string | symbol, (target: VNode) => unknown>): VNode {
  return new Proxy(node, {
    get
  })

  function get(target: VNode, p: string | symbol) {
    const getter = record[p];
    if (typeof getter === "function") {
      return getter(target);
    }
    return target[p];
  }
}
