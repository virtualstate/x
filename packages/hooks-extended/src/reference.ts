import {
  SourceReference,
  VNode,
  createToken,
  TokenVNodeBase
} from "@virtualstate/fringe";
import { IsFunction } from "./is";

export type ReferenceIs<ReferencedVNode extends VNode = VNode> = IsFunction<VNode, ReferencedVNode> | SourceReference;
export interface ReferenceOn<ReferencedVNode extends VNode = VNode> {
  (node: ReferencedVNode): void | Promise<void>;
}

export const ReferenceSymbol = Symbol("Reference");
export interface ReferenceOptions<ReferencedVNode extends VNode = VNode> {
  is?: ReferenceIs<ReferencedVNode>;
  on: ReferenceOn<ReferencedVNode>;
}
export type ReferenceToken<ReferencedVNode extends VNode = VNode> = TokenVNodeBase<typeof ReferenceSymbol, ReferenceOptions<ReferencedVNode>>;
export const Reference: ReferenceToken = createToken(ReferenceSymbol);
