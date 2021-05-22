import { isFragmentVNode, isScalarVNode, VNode } from "@virtualstate/fringe";
import { DocumentNode, isElement, isText } from "./document-node";

export type DOMNativeVNodeType = "Element" | "Text" | "Node";

export type NativeAttributes = Record<string, string | boolean | number | undefined>;

export interface NativeOptions extends Record<string, unknown> {
  type: DOMNativeVNodeType;
  is?: string;
  instance?: DocumentNode;
  whenDefined?: boolean;
  onBeforeRender?: (documentNode: DocumentNode) => void | Promise<void>;
  onAfterRender?: (documentNode: DocumentNode) => void | Promise<void>;
  getDocumentNode?: (root: Element, node: NativeOptionsVNode) => DocumentNode | Promise<DocumentNode>;
  attributes?: NativeAttributes;
}

export interface NativeOptionsVNode extends VNode {
  source: string;
  options: NativeOptions;
}

export function isNativeAttributeValue(value: unknown): value is (string | boolean | number | undefined) {
  return (
    value === undefined ||
    typeof value === "string" ||
    typeof value === "boolean" ||
    typeof value === "number"
  );
}

export function isNativeAttributesObject(attributes: Record<string, unknown>): attributes is NativeAttributes {
  if (!attributes) {
    return false;
  }
  const invalidIndex = Object.keys(attributes).findIndex(key => !isNativeAttributeValue(attributes[key]));
  return invalidIndex === -1;
}

export function isAttributesOptions(options: object): options is { attributes: NativeOptions["attributes"] } {
  function isAttributesLike(options: object): options is { attributes?: Record<string, unknown> } {
    return !!options;
  }
  return (
    isAttributesLike(options) &&
    typeof options.attributes === "object" &&
    isNativeAttributesObject(options.attributes)
  );
}

export function isOnBeforeRenderOptions(options: object): options is { onBeforeRender: NativeOptions["onBeforeRender"] } {
  function isOnBeforeRenderLike(options: object): options is { onBeforeRender?: unknown } {
    return !!options;
  }
  return (
    isOnBeforeRenderLike(options) &&
    typeof options.onBeforeRender === "function"
  );
}

export function isGetDocumentNodeOptions(options: object): options is { getDocumentNode: NativeOptions["getDocumentNode"] } {
  function isGetDocumentNodeLike(options: object): options is { getDocumentNode?: unknown } {
    return !!options;
  }
  return (
    isGetDocumentNodeLike(options) &&
    typeof options.getDocumentNode === "function"
  );
}

export function isNativeOptions(options: object): options is NativeOptions {
  function isNativeOptionsLike(options: object): options is Partial<NativeOptions> {
    return !!options;
  }
  function isAttributesOptionsLike(options: Partial<NativeOptions>): options is Partial<NativeOptions> & { attributes: unknown } {
    return !!(
      !options.attributes ||
      isAttributesOptions(options)
    );
  }
  function isOnBeforeRenderOptionsLike(options: Partial<NativeOptions>): options is Partial<NativeOptions> & { onBeforeRender: unknown } {
    return !!(
      !options.onBeforeRender ||
      isOnBeforeRenderOptions(options)
    );
  }
  function isGetDocumentNodeOptionsLike(options: Partial<NativeOptions>): options is Partial<NativeOptions> & { getDocumentNode: unknown } {
    return !!(
      !options.getDocumentNode ||
      isGetDocumentNodeOptions(options)
    );
  }
  function isIsOptionsLike(options: Partial<NativeOptions>): options is Partial<NativeOptions> & { is: unknown } {
    return !!(
      options.is === undefined ||
      isIsOptions(options)
    );
  }
  function isInstanceOptionsLike(options: Partial<NativeOptions>): options is Partial<NativeOptions> & { instance: unknown } {
    return !!(
      options.instance === undefined ||
      isElement(options.instance) ||
      isText(options.instance)
    );
  }
  function isWhenDefinedOptionsLike(options: Partial<NativeOptions>): options is Partial<NativeOptions> & { whenDefined: unknown } {
    return !!(
      typeof options.whenDefined === "boolean" ||
      options.whenDefined === undefined
    );
  }
  return !!(
    isNativeOptionsLike(options) &&
    (
      options.type === "Element" ||
      options.type === "Text" ||
      options.type === "Node"
    ) &&
    isAttributesOptionsLike(options) &&
    isOnBeforeRenderOptionsLike(options) &&
    isGetDocumentNodeOptionsLike(options) &&
    isIsOptionsLike(options) &&
    isInstanceOptionsLike(options) &&
    isWhenDefinedOptionsLike(options)
  );
}

export function getNativeOptions(vnode: VNode): NativeOptions | undefined {
  if (isFragmentVNode(vnode)) {
    return undefined;
  }

  if (isTypeOptions(vnode.options, "Node")) {
    return vnode.options;
  }

  if (isTypeOptions(vnode.options, "Text")) {
    return vnode.options;
  }

  // If we have no given options, then we have a text node
  if (isScalarVNode(vnode) && !vnode.options && typeof vnode.source !== "symbol") {
    return {
      ...vnode.options,
      type: "Text"
    };
  }

  // We can only create elements from string sources
  if (typeof vnode.source !== "string") {
    return undefined;
  }

  if (isTypeOptions(vnode.options, "Element") && isIsOptions(vnode.options)) {
    return vnode.options;
  } else {
    return {
      ...vnode.options,
      type: "Element",
      is: undefined
    };
  }
}


function isIsOptions(options: unknown): options is { is: string | undefined } {
  function isIsOptionsLike(options: unknown): options is { is?: unknown } {
    return !!options;
  }
  return (
    isIsOptionsLike(options) &&
    (
      typeof options.is === "string" ||
      typeof options.is === "undefined"
    )
  );
}

function isTypeOptions<T extends string>(options: unknown, type: T): options is { type: T } {
  function isTypeOptionsLike(options: unknown): options is { type?: unknown } {
    return !!options;
  }
  return (
    isTypeOptionsLike(options) &&
    options.type === type
  );
}
