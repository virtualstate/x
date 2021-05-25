import {
  createVContextEvents,
  Tree,
  VContext,
  VContextEventsPair,
  VNode,
  WeakVContext,
  hydrateChildren, VContextHydrateEvent
} from "@virtualstate/fringe";
import { assertNativeVNode } from "./native";
import { isFragmentDOMNativeVNode } from "./fragment";
import { DOMNativeVNode, isDOMNativeVNode } from "./node";
import { DocumentNode, isElement, isExpectedNode, isText } from "./document-node";
import { NativeOptionsVNode } from "./options";
import { getDocumentNode } from "./document-node";
import { mount, MountContext, TaskFn } from "./mount";
import { assertElementDetails, createElementDetails, ElementDetails } from "./element-details";
import { Position } from "./position";
import type { VContextChildrenEvent, VContextCreateVNodeEvent } from "@virtualstate/fringe";

const CHILD_POSITION = Symbol("DOM Child Position");

export interface RenderOptions<C = unknown> {
  root: Element;
  parent?: C;
}

export type DOMHydrateEvent = VContextHydrateEvent<DOMNativeVNode>;

export class DOMVContext<O extends RenderOptions = RenderOptions,
  CreateEvent extends VContextCreateVNodeEvent = VContextCreateVNodeEvent,
  ChildrenEvent extends VContextChildrenEvent = VContextChildrenEvent> extends WeakVContext<CreateEvent, ChildrenEvent, DOMHydrateEvent> {

  private committing: Promise<void> = Promise.resolve();

  constructor(public options: O, weak?: WeakMap<object, unknown>, eventsPair: VContextEventsPair<CreateEvent, ChildrenEvent, DOMHydrateEvent> = createVContextEvents()) {
    super(weak, eventsPair);
  }

  async hydrate(node: VNode, tree?: Tree) {
    assertNativeVNode(node);
    if (isFragmentDOMNativeVNode(node)) {
      return this.commitChildren(this.options.root, node, tree);
    } else if (isDOMNativeVNode(node)) {
      if (!tree) {
        throw new Error("Expected a tree with DOMNativeVNode, entry point should be a FragmentDOMNativeVNode");
      }
      this.eventsTarget.hydrate.add({
        node,
        tree
      });
      const options = node.options;
      if (node.native && node.source && isHydrateOptions(options)) {
        return options.hydrate(node, tree);
      }
      const documentNode = await this.getDocumentNode(node);
      await this.commit(node, documentNode, tree);
    }
  }

  protected async getDocumentNode(node: NativeOptionsVNode) {
    const map = this.getWeakMap(node);
    const existingDocumentNode = map.get(this.options.root);
    if ((isElement(existingDocumentNode) || isText(existingDocumentNode)) && isExpectedNode(node, existingDocumentNode)) {
      return existingDocumentNode;
    }
    const documentNode = await getDocumentNode(this.options.root, node);
    map.set(this.options.root, documentNode);
    return documentNode;
  }

  protected getWeakMap(key: object): WeakMap<object, unknown> {
    const existing = this.weak.get(key);
    if (existing instanceof WeakMap) {
      return existing;
    }
    const map = new WeakMap();
    this.weak.set(key, map);
    return map;
  }

  protected childContext(documentNode: Element): DOMVContext {
    const existingChildContext = this.weak.get(documentNode);
    if (existingChildContext instanceof DOMVContext) {
      return existingChildContext;
    }
    const childContext = new DOMVContext(
      {
        root: documentNode,
        parent: this
      },
      this.weak,
      {
        events: this.events,
        target: this.eventsTarget
      }
    );
    this.weak.set(documentNode, childContext);
    return childContext;
  }

  protected getElementDetails(documentNode: Element): ElementDetails {
    const map = this.getWeakMap(this);
    let elementDetails = map.get(documentNode);
    if (!elementDetails) {
      // If we have no tree, we can make them on the fly
      elementDetails = createElementDetails();
      map.set(documentNode, elementDetails);
    }
    // If we are getting details from within a tree, we expect them!
    assertElementDetails(elementDetails);
    return elementDetails;
  }

  #queue = async (task: TaskFn) => {
    const promise = this.committing.then(task);
    this.committing = promise;
    await promise;
    if (this.committing === promise) {
      // Does this help?
      this.committing = Promise.resolve();
    }
    await (this.committing = this.committing.then(task));
  }

  #position = (context: MountContext): Position | undefined => {
    const parent = this.options.parent;
    if (!(parent instanceof DOMVContext)) {
      return undefined;
    }
    return parent[CHILD_POSITION]?.(context);
  };

  [CHILD_POSITION]({ tree }: MountContext): Position | undefined  {
    return undefined;
    // const { parent, reference } = tree;
    // if (!parent) {
    //   return undefined; // No siblings, default behaviour for new root node
    // }
    // if (parent.children.length <= 1) {
    //   return undefined; // No siblings
    // }
    // const { root } = this.options;
    // const referenceIndex = parent.children.indexOf(reference);
    // const elementDetails = this.getElementDetails(root);
    // const parentPosition = position(elementDetails, tree, parent.reference);
  }

  async commit(node: NativeOptionsVNode, documentNode: DocumentNode, tree: Tree) {
    const { root } = this.options;

    await mount({
      documentNode,
      elementDetails: this.getElementDetails(root),
      node,
      root,
      tree,
      mountChildren: this.commitChildren.bind(this),
      position: this.#position.bind(this),
      queue: this.#queue.bind(this)
    });
  }


  async commitChildren(documentNode: Element, node: VNode, tree?: Tree) {
    const childContext = this.childContext(documentNode);

    await hydrateChildren(childContext, node, tree);
  }

}


function isHydrateOptions(options?: object): options is { hydrate: VContext["hydrate"] } {
  function isHydrateOptionsLike(options: unknown): options is { hydrate: unknown } {
    return !!options;
  }
  return isHydrateOptionsLike(options) && typeof options.hydrate === "function";
}
