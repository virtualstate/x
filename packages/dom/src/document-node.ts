import { isPromise } from "iterable";
import { NativeOptionsVNode } from "./options";

export type DocumentNode = Element | Text | Node;

export function isNode(value: unknown): value is Node {
  function isNodeLike(value: unknown): value is { nodeType?: unknown, TEXT_NODE?: unknown, ELEMENT_NODE?: unknown } {
    return !!value;
  }
  return (
    isNodeLike(value) &&
    typeof value.nodeType === "number" &&
    typeof value.TEXT_NODE === "number" &&
    typeof value.ELEMENT_NODE === "number"
  );
}

export function isText(node?: unknown): node is Text {
  return isNode(node) && typeof node.nodeType === "number" && node.nodeType === node.TEXT_NODE;
}

export function isElement(node?: unknown): node is Element {
  return isNode(node) && typeof node.nodeType === "number" && node.nodeType === node.ELEMENT_NODE;
}

export function assertNode(node?: unknown): asserts node is Node {
  if (!isNode(node)) {
    throw new Error("Expected Node");
  }
}

export function assertText(node?: unknown): asserts node is Text {
  if (!isText(node)) {
    throw new Error("Expected Text");
  }
}

export function assertElement(node?: unknown): asserts node is Element {
  if (!isElement(node)) {
    throw new Error("Expected Element");
  }
}

function assertType(value: NativeOptionsVNode): asserts value is NativeOptionsVNode & { options: { type: "Text" | "Element" | "Node" } } {
  const type: string = value.options.type;
  if (!(type === "Element" || type === "Text" || type === "Node")) {
    throw new Error(`Expected Element, Node, or Text, received ${type}`);
  }
}

export function isExpectedNode(expected: NativeOptionsVNode, given: Node): given is DocumentNode {
  if (!given) {
    return false;
  }
  assertType(expected);
  if (expected.options.type === "Text") {
    return isText(given);
  }
  if (expected.options.type === "Node") {
    return isNode(given);
  }
  if (expected.options.type === "Element") {
    return isElement(given) && expected.source === given.localName;
  }
  return false;
}

export async function getDocumentNode(root: Element, node: NativeOptionsVNode): Promise<DocumentNode> {
  assertType(node);
  if (typeof node.options.getDocumentNode === "function") {
    let result = node.options.getDocumentNode(root, node);
    if (isPromise(result)) {
      result = await result;
    }
    if (result) {
      if (!isExpectedNode(node, result)) {
        if (node.options.type === "Text") {
          throw new Error(`Expected getDocumentNode to return a Text node`);
        } else {
          throw new Error(`Expected getDocumentNode to return an Element node with the localName ${node.source}, but didn't receive this`);
        }
      }
      return result;
    }
  }
  if (node.options.type === "Text") {
    if (isText(node.options.instance)) {
      return node.options.instance;
    }
    return root.ownerDocument.createTextNode(node.source);
  }
  if (isNode(node.options.instance)) {
    return node.options.instance;
  }
  if (node.options.whenDefined && root.ownerDocument.defaultView.customElements && root.ownerDocument.defaultView.customElements.whenDefined) {
    await root.ownerDocument.defaultView.customElements.whenDefined(node.source);
  }
  return root.ownerDocument.createElement(node.source, { is: node.options.is });
}
