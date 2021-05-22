import { VNode } from "../vnode";
interface MapMatchProps<M extends VNode = VNode> {
    map?(input: VNode): AsyncIterable<M[]>;
    match?(node: M): boolean;
}
export declare function Every<M extends VNode = VNode>({ map, match }: MapMatchProps<M>, input: VNode): any;
export {};
//# sourceMappingURL=logic.spec.d.ts.map