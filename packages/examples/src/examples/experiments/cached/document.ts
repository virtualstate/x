import {Instance, VNode} from "@virtualstate/fringe";
import {proxyProperties} from "./proxy";

export function proxyDocumentInstance(node: VNode): VNode {
  const source = node.source;
  if (typeof source !== "string") {
    return node;
  }
  let element;
  return proxyProperties(node, {
    [Instance]: get
  });
  function get() {
    if (typeof source !== "string") {
      throw new Error("Unexpected source");
    }
    if (element) {
      return element;
    }
    const options: ElementCreationOptions = {
      ...node.options
    };
    element = document.createElement(source, options);
    return element;
  }
}
