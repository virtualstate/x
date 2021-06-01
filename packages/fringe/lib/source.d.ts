import { FragmentVNode, FragmentVNodeWithChildren, MarshalledVNode, VNode } from "./vnode";
import { SourceReference } from "./source-reference";
declare type GetLength<T extends unknown[]> = T extends {
    length: infer L;
} ? L : never;
declare type CreateNodeResultChildrenExistence<C extends unknown[]> = 0 extends GetLength<C> ? undefined : AsyncIterable<VNode[]>;
declare type Options = Record<string, unknown> | undefined;
export declare type CreateNodeResultOp3Or4<T extends CreateNodeOp3Fragment | CreateNodeOp4VNode, O extends Options, C extends unknown[]> = Omit<T, "options" | "children"> & {
    options: T["options"] extends O ? O : T["options"] & O;
    children: T["children"] extends AsyncIterable<unknown> ? T["children"] : CreateNodeResultChildrenExistence<C>;
};
export declare type CreateNodeResultOp6<T extends CreateNodeOp6SourceReference, O extends Options, C extends unknown[]> = Omit<VNode, "source" | "scalar" | "options" | "children"> & {
    source: T;
    scalar: CreateNodeResultChildrenExistence<C> extends AsyncIterable<unknown> ? false : true;
    options: O;
    children: CreateNodeResultChildrenExistence<C>;
};
export declare type CreateNodeResult<T extends Source, O extends Options = Options, C extends unknown[] = []> = T extends CreateNodeOp1Function ? Omit<FragmentVNode, "source"> & {
    source: T;
} : T extends CreateNodeOp2Promise ? Omit<FragmentVNode, "source"> & {
    source: T;
} : T extends CreateNodeOp3Fragment ? CreateNodeResultOp3Or4<T, O, C> : T extends CreateNodeOp4VNode ? CreateNodeResultOp3Or4<T, O, C> : T extends CreateNodeOp5MarshalledVNode ? VNode : T extends CreateNodeOp6SourceReference ? CreateNodeResultOp6<T, O, C> : T extends CreateNodeOp7IterableIterator ? Omit<FragmentVNodeWithChildren, "options"> & {
    options: O;
} : T extends CreateNodeOp8Iterable ? Omit<FragmentVNodeWithChildren, "options"> & {
    options: O;
} : T extends CreateNodeOp9Falsy ? Omit<FragmentVNode, "source"> & {
    source: undefined;
} : T extends CreateNodeOp9000ExplicitExceptionCaseForObject ? never : never;
export declare type CreateNodeOp1Function = (options?: unknown, children?: VNode) => unknown;
export declare type CreateNodeOp2Promise = Promise<unknown>;
export declare type CreateNodeOp3Fragment = FragmentVNode;
export declare type CreateNodeOp4VNode = VNode;
export declare type CreateNodeOp5MarshalledVNode = MarshalledVNode;
export declare type CreateNodeOp6SourceReference = SourceReference;
export declare type CreateNodeOp7IterableIterator = IterableIterator<unknown> | AsyncIterableIterator<unknown>;
export declare type CreateNodeOp8Iterable = Iterable<unknown> | AsyncIterable<unknown>;
export declare type CreateNodeOp9Falsy = undefined | null;
export declare type CreateNodeOp9000ExplicitExceptionCaseForObject = object;
export declare type Source = CreateNodeOp1Function | CreateNodeOp2Promise | CreateNodeOp3Fragment | CreateNodeOp4VNode | CreateNodeOp5MarshalledVNode | CreateNodeOp6SourceReference | CreateNodeOp7IterableIterator | CreateNodeOp8Iterable | CreateNodeOp9Falsy | CreateNodeOp9000ExplicitExceptionCaseForObject;
export {};
//# sourceMappingURL=source.d.ts.map