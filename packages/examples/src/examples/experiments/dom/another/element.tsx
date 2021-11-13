import {ChildrenOptions, ChildrenTransformOptions, EnableThen, h, VNode} from "@virtualstate/fringe";
import {thenish} from "@virtualstate/fringe";

export interface ElementOptions {
  tag: string;
  attributes: Record<string, unknown>;
  node: VNode; // tied options -> node, implemented in h
}

export interface ElementContext {
  parent?: HTMLElement;
  document: Document;
}

export class Element implements VNode {

  static [EnableThen] = true;

  #reference = Symbol("Element");
  #options: ElementOptions;
  #parent?: HTMLElement;
  #children?: VNode;

  #instance?: HTMLElement;
  #document?: Document;

  constructor(options: ElementOptions, children?: VNode) {
    this.#options = options;
    this.#children = children;
  }

  get reference() {
    return this.#reference;
  }

  get source() {
    return this.#options.tag;
  }

  get options() {
    return {
      ...this.#options.attributes
    }
  }

  get element() {
    return this.#instance = this.#instance ?? this.document.createElement(this.source);
  }

  set document(document: Document) {
    this.#document = document;
  }

  get document() {
    return this.#document ?? typeof document === "undefined" ? undefined : document;
  }

  async *[Symbol.asyncIterator]() {
    // await new Promise(thenish.bind(<>{this.#children}</>));
    // Yield this once mounted all children
    yield this;
  }
}

