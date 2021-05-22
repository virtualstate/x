import { VNode, VNodeRepresentationSource } from "./vnode";
import { UnionInput, UnionOptions } from "@virtualstate/union";
import type { CreateNodeFn } from "./create-node";
export interface ChildrenContext extends UnionOptions {
    createNode: CreateNodeFn;
}
export declare function childrenUnion<N extends VNode>(context: UnionOptions, childrenGroups: UnionInput<N[]>): AsyncIterable<N[]>;
export declare function children(context: ChildrenContext, ...source: VNodeRepresentationSource[]): AsyncIterable<VNode[]>;
//# sourceMappingURL=children.d.ts.map