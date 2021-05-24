import { NativeOptionsVNode } from "./options";
import { DocumentNode, isElement } from "./document-node";
import { setAttributes } from "./attributes";
import { SourceReference, Tree } from "@virtualstate/fringe";
import { position, Position } from "./position";
import { ElementDetails } from "./element-details";

export interface TaskFn {
  (): Promise<void>;
}

export interface MountContext {
  queue(task: TaskFn): Promise<void>;
  mountChildren(documentNode: Element, node: NativeOptionsVNode, tree: Tree): void;
  elementDetails: ElementDetails;
  tree: Tree;
  root: Element;
  documentNode: DocumentNode;
  node: NativeOptionsVNode;
  position(context: MountContext): Position | undefined;
}

export function isDenoDocumentNode(node: unknown): node is Element & { _getChildNodesMutator(): { splice(s: 0, l: number): void }, childNodes: Element["childNodes"] } {
  if (!isElement(node)) {
    return false;
  }
  function isGetChildNodesMutator(node: object): node is { _getChildNodesMutator: unknown } {
    return !!node;
  }
  return isGetChildNodesMutator(node) && typeof node.ELEMENT_NODE !== "number" && typeof node._getChildNodesMutator === "function";
}

export async function mount(context: MountContext) {
  const { root, queue, elementDetails, tree, documentNode, node, mountChildren } = context;
  await queue(task);

  if (isElement(documentNode)) {
    await mountChildren(documentNode, node, tree);
  }

  async function taskLifecycleBefore() {
    if (isDenoDocumentNode(documentNode)) {
      const children = Array.from(documentNode.childNodes, (_, index) => documentNode.childNodes.item(index));
      for (const child of children) {
        const writable: { parentNode: unknown, parentElement: unknown } = child;
        writable.parentNode = writable.parentElement = undefined;
      }
      const mutator = documentNode._getChildNodesMutator();
      mutator.splice(0, documentNode.childNodes.length);
    }

    if (node.options.onBeforeRender) {
      await node.options.onBeforeRender(documentNode);
    }
  }

  async function taskLifecycleAlreadyMounted(currentDocumentNode: DocumentNode) {
    // We have a known node for this reference, lets replace that
    if (documentNode !== currentDocumentNode) {
      root.replaceChild(
        documentNode,
        currentDocumentNode
      );
      // Set rendered after adding to DOM, before setting attributes
      elementDetails.rendered.set(node.reference, documentNode);
    }
    if (isElement(documentNode)) {
      await setAttributes(node, documentNode);
    }
  }

  function taskLifecycleFirstChild() {
    // When appending we can set our attributes beforehand
    root.appendChild(documentNode);
  }

  function taskLifecyclePosition({ left: leftFn, right: rightFn }: Position, parent?: () => Position | undefined): void {
    const right = rightFn();
    if (right) {
      root.insertBefore(documentNode, right);
    } else {
      const left = leftFn();
      if (left) {
        const nextSibling = left.nextSibling;
        if (nextSibling) {
          // The element before has a next sibling, and we don't know about it, so lets
          // insert before this
          root.insertBefore(
            documentNode,
            nextSibling
          );
        } else {
          // The element before is the last child
          root.appendChild(
            documentNode
          );
        }
      } else {
        const parentPosition = parent?.();
        if (parentPosition) {
          return taskLifecyclePosition(parentPosition);
        } else {
          // Nothing before it, lets insert to the front
          root.insertBefore(
            documentNode,
            root.firstChild
          );
        }
      }
    }
  }

  function taskLifecycleExistingChild() {
    taskLifecyclePosition(
      position(elementDetails, tree, node.reference),
      () => context.position?.(context)
    );
  }

  async function taskLifecycleMount() {
    // We aren't included yet, lets see where we start

    // Because the node is not included, we can set our attributes ahead of time
    if (isElement(documentNode)) {
      await setAttributes(node, documentNode);
    }

    // If there is nothing rendered, lets append
    if (elementDetails.rendered.size === 0) {
      taskLifecycleFirstChild();
    } else {
      taskLifecycleExistingChild();
    }
    // Set rendered after added to DOM
    taskLifecycleRendered();
  }

  function taskLifecycleRendered() {
    elementDetails.rendered.set(node.reference, documentNode);
  }

  async function taskLifecycleCleanupRemovableNodes() {
    // This will only run for the first child that was committed, each after will have no
    // removable until we have a different tree
    //
    // This also only disconnects the node from its parent, if the node is returned again
    // from a retained instance, the node can be re-mounted
    for (const [reference, removableDocumentNode] of getRemovableDocumentNodes()) {
      root.removeChild(removableDocumentNode);
      if (isDenoDocumentNode(root)) {
        const writable: { parentNode: unknown, parentElement: unknown } = removableDocumentNode;
        writable.parentNode = writable.parentElement = undefined;
      }
      elementDetails.rendered.delete(reference);
    }

    function getRemovableDocumentNodes() {
      const renderedReferences = [...elementDetails.rendered.keys()];
      return renderedReferences
        .filter(reference => !tree.children.includes(reference))
        .map((reference): [SourceReference, DocumentNode] => [reference, elementDetails.rendered.get(reference)]);
    }
  }

  async function taskLifecycleAfter() {
    await taskLifecycleCleanupRemovableNodes();
    if (node.options.onAfterRender) {
      await node.options.onAfterRender(documentNode);
    }
  }

  async function task() {
    try {
      await taskLifecycleBefore();
      const currentDocumentNode = elementDetails.rendered.get(node.reference);
      if (currentDocumentNode) {
        await taskLifecycleAlreadyMounted(currentDocumentNode);
      } else {
        await taskLifecycleMount();
      }
    } finally {
      await taskLifecycleAfter();
    }
  }




}
