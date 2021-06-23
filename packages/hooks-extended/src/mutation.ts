import {
  SourceReference,
  TokenVNodeBase,
  TokenVNodeFn,
  VNode,
  createToken
} from "@virtualstate/fringe";
import { IsFunction } from "./is";

export type MutationIs<ReferencedVNode extends VNode = VNode> = IsFunction<VNode, ReferencedVNode> | SourceReference;
export interface MutationOn<ReferencedVNode extends VNode = VNode, MutatedVNode extends VNode = VNode> {
  (node: ReferencedVNode): MutatedVNode | Promise<MutatedVNode>;
}

export const MutationSymbol = Symbol("Mutation");
export interface MutationOptions<ReferencedVNode extends VNode = VNode, MutatedVNode extends VNode = VNode> {
  is?: MutationIs<ReferencedVNode>;
  mutate: MutationOn<ReferencedVNode, MutatedVNode>;
}
export type MutationToken<ReferencedVNode extends VNode = VNode, MutatedVNode extends VNode = VNode> = TokenVNodeBase<typeof MutationSymbol, MutationOptions<ReferencedVNode, MutatedVNode>>;
export type MutationTokenFn<ReferencedVNode extends VNode = VNode, MutatedVNode extends VNode = VNode> = TokenVNodeFn<typeof MutationSymbol, MutationOptions<ReferencedVNode, MutatedVNode>>;
export const Mutation: MutationTokenFn = createToken(MutationSymbol);
