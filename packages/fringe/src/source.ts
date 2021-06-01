import { FragmentVNode, FragmentVNodeWithChildren, MarshalledVNode, VNode } from "./vnode";
import { SourceReference } from "./source-reference";

type GetLength<T extends unknown[]> = T extends { length: infer L } ? L : never

type CreateNodeResultChildrenExistence<C extends unknown[]> =
  // If we have no arguments, we never resolve any children
  0 extends GetLength<C> ?
    undefined :
    AsyncIterable<VNode[]>;

type Options = Record<string, unknown> | undefined;

export type CreateNodeResultOp3Or4<
  T extends CreateNodeOp3Fragment | CreateNodeOp4VNode,
  O extends Options,
  C extends unknown[]
  > =
  | Omit<T, "options" | "children"> & {
  options: T["options"] extends O ? O : T["options"] & O,
  children: T["children"] extends AsyncIterable<unknown> ?
    T["children"] :
    CreateNodeResultChildrenExistence<C>
};

export type CreateNodeResultOp6<T extends CreateNodeOp6SourceReference, O extends Options, C extends unknown[]> =
  | Omit<VNode, "source" | "scalar" | "options" | "children"> & {
  source: T;
  scalar: CreateNodeResultChildrenExistence<C> extends AsyncIterable<unknown> ? false : true;
  options: O;
  children: CreateNodeResultChildrenExistence<C>;
}

export type CreateNodeResult<T extends Source, O extends Options = Options, C extends unknown[] = []> =
  T extends CreateNodeOp1Function ? Omit<FragmentVNode, "source"> & { source: T } :
    T extends CreateNodeOp2Promise ? Omit<FragmentVNode, "source"> & { source: T } :
      T extends CreateNodeOp3Fragment ? CreateNodeResultOp3Or4<T, O, C> :
        T extends CreateNodeOp4VNode ? CreateNodeResultOp3Or4<T, O, C> :
          T extends CreateNodeOp5MarshalledVNode ? VNode :
            T extends CreateNodeOp6SourceReference ? CreateNodeResultOp6<T, O, C> :
              T extends CreateNodeOp7IterableIterator ? Omit<FragmentVNodeWithChildren, "options"> & { options: O } :
                T extends CreateNodeOp8Iterable ? Omit<FragmentVNodeWithChildren, "options"> & { options: O } :
                  T extends CreateNodeOp9Falsy ? Omit<FragmentVNode, "source"> & { source: undefined } :
                    // If you want to use some other object, then use { source: <objectHere>, reference: Fragment }
                    // This will throw an error
                    T extends CreateNodeOp9000ExplicitExceptionCaseForObject ? never :
                      // All other types we do not know how to resolve, and they will throw an error
                      never;

export type CreateNodeOp1Function = (options?: unknown, children?: VNode) => unknown;
export type CreateNodeOp2Promise = Promise<unknown>;
export type CreateNodeOp3Fragment = FragmentVNode;
export type CreateNodeOp4VNode = VNode;
export type CreateNodeOp5MarshalledVNode = MarshalledVNode;
export type CreateNodeOp6SourceReference = SourceReference;
export type CreateNodeOp7IterableIterator = IterableIterator<unknown> | AsyncIterableIterator<unknown>;
export type CreateNodeOp8Iterable = Iterable<unknown> | AsyncIterable<unknown>;
export type CreateNodeOp9Falsy = undefined | null;
export type CreateNodeOp9000ExplicitExceptionCaseForObject = object;

export type Source =
  | CreateNodeOp1Function
  | CreateNodeOp2Promise
  | CreateNodeOp3Fragment
  | CreateNodeOp4VNode
  | CreateNodeOp5MarshalledVNode
  | CreateNodeOp6SourceReference
  | CreateNodeOp7IterableIterator
  | CreateNodeOp8Iterable
  | CreateNodeOp9Falsy
  | CreateNodeOp9000ExplicitExceptionCaseForObject;
