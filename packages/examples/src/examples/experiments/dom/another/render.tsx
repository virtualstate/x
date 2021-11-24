import {
  assertFragmentVNode,
  ChildrenSource,
  h,
  Instance,
  TokenConstructor,
  VNode,
  createFragment,
  Fragment, thenish, EnableThen, assertVNode
} from "@virtualstate/fringe";
import {assertElement, isNode, setAttributes} from "@virtualstate/dom";

const ParentInstance = Symbol("Parent Instance");

interface Context {
  space: WeakMap<object, unknown>
  document: Document
}

interface ElementVNode extends VNode {
  source: string;
  [Instance]: Element
}

const space = new WeakMap();

async function *RenderElement({ document }: Context, input?: VNode): AsyncIterable<ElementVNode> {
  assertFragmentVNode(input);
  for await (const children of input.children) {
    const [node, ...rest] = children;
    if (rest.length) throw new Error("Expected one child");
    const element = getElement(node);
    if (!element.children) {
      await setElementAttributes(element, node.options);
      yield element;
      continue;
    }

    for await (const children of element.children) {
      await setElementAttributes(element, element.options);
      const nodeChildren = children
        .filter((child: VNode): child is VNode & { source: string, [Instance]: Node } => (
          typeof child.source === "string" &&
          isNode(child[Instance])
        ));

      // This is the "mvp" mount for a set of nodes
      // It could maybe be better and check if things are mounted and shift them around
      // ... or we could just remove everything and add it back
      for (const child of Array.from(element[Instance].childNodes)) {
        element[Instance].removeChild(child);
      }
      for (const child of nodeChildren) {
        element[Instance].appendChild(child[Instance]);
      }
      // console.log({ element, nodeChildren, children });
      yield {
        ...element,
        // Resolution has been shifted to the instance, but it can still be provided
        children: {
          async *[Symbol.asyncIterator](): AsyncIterator<VNode[]> {
            yield children;
          }
        }
      };
    }
  }

  async function setElementAttributes(element: ElementVNode, options?: object) {
    const attributes = Object.entries(options ?? element.options ?? {})
      .filter((entry): entry is [string, string | number | boolean] => (
        typeof entry[1] === "string" ||
        typeof entry[1] === "boolean" ||
        typeof entry[1] === "number"
      ));
    if (!attributes.length) {
      if (element[Instance].attributes.length === 0) {
        return;
      }
    }
    await setAttributes({
      ...element,
      options: {
        type: "Element",
        attributes: Object.fromEntries(attributes)
      }
    }, element[Instance]);
  }

  function getElement(node: VNode) {
    let thing = space.get(node[TokenConstructor]);
    if (!thing) {
      return create(node);
    }
    assertVNode(thing);
    assertElementVNode(thing);
    const element: ElementVNode = {
      ...thing,
    };
    if (node.children) {
      element.children = {
        [Symbol.asyncIterator]() {
          return cycleChildren(element, node.children)[Symbol.asyncIterator]();
        }
      };
    }
    element.options = node.options ?? element.options;
    return element;
  }

  function assertElementVNode(node: VNode): asserts node is ElementVNode {
    assertElement(node[Instance]);
  }

  function create(node: VNode) {
    if (typeof node.source !== "string") {
      throw new Error("Expected string source");
    }
    if (typeof node[TokenConstructor] !== "function") {
      throw new Error("Expected TokenConstructor");
    }
    const source = node.source;
    const element: ElementVNode = {
      [Instance]: document.createElement(source),
      source: node.source,
      reference: Symbol("Element"),
      options: node.options
    };
    if (node.scalar) {
      element.scalar = node.scalar;
    }
    if (node.children) {
      element.children = {
        [Symbol.asyncIterator]() {
          return cycleChildren(element, node.children)[Symbol.asyncIterator]();
        }
      };
    }
    space.set(node[TokenConstructor], element);
    return element;
  }

  function cycleChildrenSource(parent: ElementVNode, source: unknown[]): VNode[] {
    return source
      .filter(value => typeof value !== "undefined")
      .map(value => {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
          let node: Text;
          return {
            get [Instance]() {
              if (node) return node;
              return node = document.createTextNode(`${value}`);
            },
            source: value,
            scalar: true,
            reference: Symbol("Text")
          }
        }
        return <Render space={space} document={document} {...{ [ParentInstance]: parent }}>{value}</Render>
      })
  }

  function isChildrenSource<T>(children: T): children is T & { [ChildrenSource]: unknown[] } {
    function isChildrenSourceLike(value: unknown): value is { [ChildrenSource]: unknown } {
      return !!value;
    }
    return isChildrenSourceLike(children) && Array.isArray(children[ChildrenSource]);
  }

  async function *cycleChildren(parent: ElementVNode, nodeChildren: AsyncIterable<VNode[]>): AsyncIterable<VNode[]> {
    if (isChildrenSource(nodeChildren)) {
      return yield * createFragment({}, ...cycleChildrenSource(parent, nodeChildren[ChildrenSource])).children;
    }

    for await (const children of nodeChildren) {
      yield * createFragment({}, ...children.map(
        (child) => {
          if (child[Instance]) return child;
          return <RenderElement space={space} document={document} {...{ [ParentInstance]: parent }}>{child}</RenderElement>
        }
      )).children;
    }
  }
}

export async function *Render({ document, space = new WeakMap() }: Pick<Context, "document"> & Partial<Context>, input?: VNode): AsyncIterable<VNode[]> {
  if (!input?.children) return;
  for await (const children of input.children) {
    yield children.map((child) => {
      return <RenderElement document={document} space={space}>{child}</RenderElement>
    })
  }
}
Render[EnableThen] = true;

export async function render(document: Document, site: VNode, space?: WeakMap<object, unknown>): Promise<VNode[]> {
  return (
    <Render document={document} space={space}>
      {site}
    </Render>
  )
}
