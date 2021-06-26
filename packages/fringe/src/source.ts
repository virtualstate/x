import { FragmentVNode, FragmentVNodeWithChildren, MarshalledVNode, VNode } from "./vnode";
import { SourceReference } from "./source-reference";
import {Fragment} from "./fragment";

type GetLength<T extends unknown[]> = T extends { length: infer L } ? L : never

/**
 * @experimental This may go away
 */
export const Instance = Symbol("Source Instance");

/**
 * @experimental This may not be available all the time, and this functionality may disappear.
 */
export const ChildrenSource = Symbol.for("@virtualstate/fringe/ChildrenSource");

export type CreateNodeChildrenWithSourceType<C extends unknown[], N extends VNode[] = VNode[]> = AsyncIterable<N> & {
  // This is explicitly only available _sometimes_, so only in best case will it be available,
  // you should assume that it is not available most of the time.
  /**
   * @experimental This may not be available all the time, and this functionality may disappear.
   */
  [ChildrenSource]?: C
}

export type CreateNodeChildren<C extends unknown[]> =
  // If we have no arguments, we never resolve any children
  0 extends GetLength<C> ?
    undefined :
    CreateNodeChildrenWithSourceType<C>;

type Options = Record<string, unknown> | object | undefined;

export type CreateNodeResultOp3<
  T extends VNode,
  O extends Options,
  C extends unknown[]
  > =
  | Omit<T, "options" | "children"> & {
  options: T["options"] extends O ? O : T["options"] & O,
  children: T["children"] extends AsyncIterable<unknown> ?
    T["children"] :
    CreateNodeChildren<C>
};

export type CreateNodeResultOp6<T extends CreateNodeOp6SourceReference, O extends Options, C extends unknown[]> =
  | Omit<VNode, "source" | "scalar" | "options" | "children"> & {
  source: T;
  scalar: undefined extends CreateNodeChildren<C> ? true : false;
  options: O;
  children: CreateNodeChildren<C>;
}

/**
 * @experimental Use this type directly at your own risk.
 */
export type CreateNodeResultCore<T, O extends Options = Options, C extends unknown[] = []> =
  T extends CreateNodeOp1Function ? Omit<FragmentVNode, "source"> & { source: T } :
    T extends CreateNodeOp2Promise ? Omit<FragmentVNode, "source"> & { source: T extends Promise<infer I> ? CreateNodeResult<I> : unknown } :
      T extends CreateNodeOp3Fragment ? CreateNodeResult<FragmentVNode, O, C> :
        T extends CreateNodeOp4VNode ? CreateNodeResultOp3<T, O, C> :
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

/**
 * @experimental Use this type directly at your own risk.
 */
export type CreateNodeResult<T, O extends Options = Options, C extends unknown[] = []> =
  Omit<CreateNodeResultCore<T, O, C>, "children"> & Pick<VNodeWithChildrenFromSource<CreateNodeResultCore<T, O, C>>, "children">


export interface CreateNodeOp1Function {
  (options?: unknown, children?: VNode): unknown
}
export type CreateNodeOp2Promise = Promise<unknown>;
export type CreateNodeOp3Fragment = typeof Fragment;
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

interface VNodeWithChildrenSourceType<C extends unknown[]> extends VNode {
  children: CreateNodeChildrenWithSourceType<C>
}

export type InferChildrenSource<V extends VNode> = V extends VNodeWithChildrenSourceType<infer C> ? C : [];

type ChildrenResult<CValue> =
  CValue extends ChildrenOp1Undefined ? unknown :
    CValue extends ChildrenOp2Promise ? CValue extends Promise<infer R> ? ChildrenResult<R> : unknown :
      CValue extends ChildrenOp3Fragment ?
        undefined extends CValue["children"] ? unknown :
          CValue extends AsyncIterable<Array<infer R>> ? ChildrenResult<R> : unknown :
        CValue extends ChildrenOp4VNode ? CValue :
          CreateNodeResult<CValue>;

type ArrayItems<T extends unknown[]> = T extends Array<infer I> ? I : never;

type ChildrenResultFromSource<C extends VNode[]> = unknown extends ChildrenResult<ArrayItems<C>> ? VNode : VNode;

/**
 * @experimental This type may be removed if found to be not performant
 */
export type VNodeWithChildrenFromSource<V> = V extends VNode ? Omit<V, "children"> & {
  children:
    unknown[] extends InferChildrenSource<V> ?
      never :
      CreateNodeChildrenWithSourceType<ChildrenResultFromSource<InferChildrenSource<V>>[], InferChildrenSource<V>>
} : V;

type ChildrenOp1Undefined = undefined;
type ChildrenOp2Promise = Promise<unknown>;
type ChildrenOp3Fragment = FragmentVNode;
type ChildrenOp4VNode = FragmentVNode;

