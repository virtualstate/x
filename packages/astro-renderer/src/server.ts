import {createNode, VNodeRepresentationSource} from "@virtualstate/fringe";
import { isElement, isText, NativeOptionsVNode, render } from "@virtualstate/dom";
import { document } from "dom-lite";
import { h } from "./h";

/**
 * @experimental
 */
async function renderToStaticMarkup(...args: Parameters<typeof createNode>): Promise<string> {
  const [source, options, innerHTML, ...ignoredChildren] = args;
  if (ignoredChildren.length) throw new Error("Expected only one innerHTML to be provided");
  const root = document.createElement("astro-root");
  const children: NativeOptionsVNode[] = [];
  if (typeof innerHTML === "string" && innerHTML) {
    const substitute = document.createElement("astro-substitute");
    substitute.innerHTML = innerHTML;
    if (isElement(substitute) && substitute.hasChildNodes()) {
      for (let index = 0; index < substitute.childNodes.length; index += 1) {
        const child = getItem(substitute.childNodes, index);
        if (!child) continue;
        const node = getNode(child);
        children.push(node);
      }
    }
  }

  function getItem(input: NodeListOf<ChildNode> | ChildNode[], index: number): ChildNode | undefined {
    if (Array.isArray(input)) {
      return input[index];
    } else {
      return input.item(index);
    }
  }

  function getNode(input: ChildNode): NativeOptionsVNode {
    return {
      reference: Symbol("Astro Child"),
      source: "",
      options: {
        type: "Node",
        getDocumentNode() {
          return input;
        }
      }
    }
  }
  const node = h(
    source,
    options,
    ...children
  );
  root.id = "root-detached";
  await render(node, root);
  return root.innerHTML;
}

/**
 * @experimental
 */
export default {
  /**
   * @experimental
   */
  check() {
    return true;
  },
  renderToStaticMarkup
}
