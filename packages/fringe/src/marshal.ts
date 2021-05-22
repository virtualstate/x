import { MarshalledVNode, VNode } from "./vnode";
import { isMarshalledSourceReference, MarshalledSourceReference, SourceReference } from "./source-reference";
import { asyncExtendedIterable } from "iterable";

/**
 * Marshals a VNode into a synchronous state allowing for transmission or storage
 *
 * This involves two parts:
 *
 * - All references will be turned into a `number`, or if a `getReference` `function` is passed, a `number`, `string`, or `boolean`
 * - All children will be represented as an array of arrays, where the values have also passed through the marshal process
 *
 * This process only changes the representation of {@link VNode.reference} and {@link VNode.children}, this means that if
 * something like a `Symbol` is used then it will be lost when the value is finally serialised, these cases must be handled
 * by the consumer of this function
 *
 * @param node
 * @param parent
 * @param getReference
 */
export async function marshal(node: VNode, parent?: SourceReference, getReference?: (parent: SourceReference, reference: SourceReference) => MarshalledSourceReference | undefined): Promise<MarshalledVNode> {
  /**
   * If no parent is passed this will be a process unique reference, meaning we can use it to start off our reference generation
   */
  const rootParent = Symbol("Root");

  const { reference: currentReference, ...nodeBase } = node;

  /**
   * This will be our marshalled reference for the current node, this will be passed down to children to have a context
   * reference for further reference generation
   */
  const reference = getReferenceInternal(parent, currentReference);

  const children = await asyncExtendedIterable(node.children || []).map(
    children => asyncExtendedIterable(children || []).map(
      child => marshal(child, reference, getReferenceInternal)
    ).toArray()
  ).toArray();

  const marshalled: MarshalledVNode = {
    ...nodeBase,
    children
  };

  if (reference) {
    marshalled.reference = reference;
  }

  return marshalled;

  /**
   * This is a template for `getReference`, something similar would be expected of an implementor of said function,
   * we want a unique reference across each child, children across {@link VNode} values can have the same reference
   *
   * @param parent
   * @param sourceReference
   */
  function getReferenceInternal(parent: SourceReference | undefined, sourceReference: SourceReference): MarshalledSourceReference | undefined {
    if (getReference) {
      const value = getReference(parent || rootParent, sourceReference);
      if (value && !isMarshalledSourceReference(value)) {
        throw new Error(`getReference returned a value that wasn't string, number, or boolean, which is not expected`);
      }
      return value;
    }
    if (typeof sourceReference === "symbol") {
      return undefined;
    }
    return sourceReference;
  }
}
