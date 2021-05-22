import { MarshalledVNode, VNode } from "./vnode";
import { MarshalledSourceReference, SourceReference } from "./source-reference";
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
export declare function marshal(node: VNode, parent?: SourceReference, getReference?: (parent: SourceReference, reference: SourceReference) => MarshalledSourceReference | undefined): Promise<MarshalledVNode>;
//# sourceMappingURL=marshal.d.ts.map