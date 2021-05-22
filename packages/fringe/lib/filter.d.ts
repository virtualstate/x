import { VNode } from "./vnode";
import { UnionOptions } from "@virtualstate/union";
export declare function childrenFiltered<Node extends VNode = VNode>(node: VNode, isNode: (node: VNode) => node is Node, options?: UnionOptions): AsyncIterable<Node[]>;
//# sourceMappingURL=filter.d.ts.map