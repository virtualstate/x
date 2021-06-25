import { createNode } from "@virtualstate/fringe";
import { isElement, isText, NativeOptionsVNode, render } from "@virtualstate/dom";
import { JSDOM } from "jsdom";
import { h } from "./h";

/**
 * @experimental
 */
async function renderToStaticMarkup(...args: Parameters<typeof createNode>): Promise<string> {
  const [source, options, innerHTML, ...ignoredChildren] = args;
  if (ignoredChildren.length) throw new Error("Expected only one innerHTML to be provided");
  const dom = new JSDOM();
  const { window: { document } } = dom;
  const root = document.createElement("astro-root");
  document.body.append(root);
  const template = document.createElement("template");
  const children: NativeOptionsVNode[] = [];
  if (typeof innerHTML === "string" && innerHTML.length) {
    template.innerHTML = innerHTML;
    for (let index = 0; index < template.content.childNodes.length; index += 1) {
      const child = template.content.childNodes.item(index);
      const node = getNode(child);
      if (node) {
        children.push(node);
      }
    }
  }
  function getNode(input: ChildNode): NativeOptionsVNode | undefined {
    if (isText(input)) {
      return {
        reference: Symbol("Text"),
        source: "",
        options: {
          type: "Node",
          getDocumentNode() {
            return input.cloneNode();
          }
        }
      };
    }
    if (isElement(input)) {
      return {
        reference: Symbol("Element"),
        source: "",
        options: {
          type: "Node",
          getDocumentNode() {
            return input.cloneNode(true);
          }
        }
      }
    }
    return undefined
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
