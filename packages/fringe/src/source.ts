import type {FragmentVNode, FragmentVNodeWithChildren, MarshalledVNode, SourceReferenceVNode, VNode} from "./vnode";
import type { SourceReference } from "./source-reference";
import type { Fragment } from "./fragment";

type GetLength<T extends unknown[]> = T extends { length: infer L } ? L : never

/**
 * @experimental This may go away
 */
export const Instance = Symbol("Source Instance");

/**
 * @experimental This may not be available all the time, and this functionality may disappear.
 */
export const ChildrenSource = Symbol.for("@virtualstate/fringe/ChildrenSource");

/**
 * @experimental This may not be available all the time, and this functionality may disappear.
 */
export const ChildrenSourceFunction = Symbol.for("@virtualstate/fringe/ChildrenSourceFunction");

export type CreateNodeChildrenWithSourceType<C extends unknown[], N extends VNode[] = VNode[]> = AsyncIterable<N> & {
  // This is explicitly only available _sometimes_, so only in best case will it be available,
  // you should assume that it is not available most of the time.
  /**
   * @experimental This may not be available all the time, and this functionality may disappear.
   */
  [ChildrenSource]?: C
}

type IfChildren<C extends unknown[], Z, K = never> =
  0 extends GetLength<C> ?
    K :
    C extends never[] ? K : Z;

export type CreateNodeChildren<C extends unknown[], N extends VNode[] = VNode[]> = IfChildren<C, CreateNodeChildrenWithSourceType<C, N>>;

type Options = Record<string, unknown> | object | undefined;

type MaxDepth = 8;
type Countdown = [0,0,1,2,3,4,5,6,7]
type DecrementMaxDepth<MaxDepthT extends number = MaxDepth> = Countdown[MaxDepthT];

type CreateNodeResultCoreOp1<T extends CreateNodeOp1Function, O extends Options = Options, C extends unknown[] = [], Depth extends number = MaxDepth> = Omit<FragmentVNode, "source" | "children"> & {
  source: T;
  children: CreateNodeChildrenWithSourceType<T[], ChildrenResult<ReturnType<T>>[]>;
};
type CreateNodeResultCoreOp2<T extends CreateNodeOp2Promise, O extends Options = Options, C extends unknown[] = [], Depth extends number = MaxDepth> = Omit<FragmentVNode, "source" | "children"> & {
  source: T;
  children: CreateNodeChildrenWithSourceType<T[], ChildrenResult<T>[]>;
};
type CreateNodeResultCoreOp3<T extends CreateNodeOp3Fragment, O extends Options = Options, C extends unknown[] = [], Depth extends number = MaxDepth> = CreateNodeResult<FragmentVNode, O, C>;

type CreateNodeResultCoreOp4<
  T extends CreateNodeOp4VNode,
  O extends Options,
  C extends unknown[],
  Depth extends number = MaxDepth
> =
  | Omit<T, "children"> & {
  options: T["options"] extends O ? O : T["options"] & O,
  children: T["children"] extends AsyncIterable<unknown> ?
    T["children"] :
    CreateNodeChildren<C, ChildrenResult<C>[]>
};

type CreateNodeResultCoreOp5<T extends CreateNodeOp5MarshalledVNode, O extends Options = Options, C extends unknown[] = [], Depth extends number = MaxDepth> = VNode;

type CreateNodeResultCoreOp6<T extends CreateNodeOp6SourceReference, O extends Options, C extends unknown[] = [], Depth extends number = MaxDepth> =
  | Omit<VNode, "source" | "scalar" | "children"> & {
  source: T;
  scalar: IfChildren<C, false, true>;
  options: O;
  children: CreateNodeChildren<C, ChildrenResult<C>[]>;
}

type CreateNodeResultCoreOp7<T extends CreateNodeOp7IterableIterator, O extends Options, C extends unknown[], Depth extends number = MaxDepth> = Omit<FragmentVNodeWithChildren, "options"> & { options: O }
type CreateNodeResultCoreOp8<T extends CreateNodeOp8Iterable, O extends Options, C extends unknown[], Depth extends number = MaxDepth> = Omit<FragmentVNodeWithChildren, "options"> & {
  options: O,
  children:
    T extends AsyncIterable<infer I> ? AsyncIterable<ChildrenResult<I>[]> :
    T extends Iterable<infer I> ? AsyncIterable<ChildrenResult<I>[]> : never;
}
type CreateNodeResultCoreOp9<T extends CreateNodeOp9Falsy, O extends Options, C extends unknown[], Depth extends number = MaxDepth> = Omit<FragmentVNode, "source"> & { source: undefined }

/**
 * @experimental
 */
export type CreateNodeResultCore<T, O extends Options = Options, C extends unknown[] = [], Depth extends number = MaxDepth> =
  T extends CreateNodeOp1Function ? CreateNodeResultCoreOp1<T, O, C, Depth> :
    T extends CreateNodeOp2Promise ? CreateNodeResultCoreOp2<T, O, C, Depth> :
      T extends CreateNodeOp3Fragment ? CreateNodeResultCoreOp3<T, O, C, Depth> :
        T extends CreateNodeOp4VNode ? CreateNodeResultCoreOp4<T, O, C, Depth> :
          T extends CreateNodeOp5MarshalledVNode ? CreateNodeResultCoreOp5<T, O, C, Depth> :
            T extends CreateNodeOp6SourceReference ? CreateNodeResultCoreOp6<T, O, C, Depth> :
              T extends CreateNodeOp7IterableIterator ? CreateNodeResultCoreOp7<T, O, C, Depth> :
                T extends CreateNodeOp8Iterable ? CreateNodeResultCoreOp8<T, O, C, Depth> :
                  T extends CreateNodeOp9Falsy ? CreateNodeResultCoreOp9<T, O, C, Depth> :
                    // If you want to use some other object, then use { source: <objectHere>, reference: Fragment }
                    // This will throw an error
                    T extends CreateNodeOp9000ExplicitExceptionCaseForObject ? never :
                      // All other types we do not know how to resolve, and they will throw an error
                      never;

/**
 * @experimental
 */
export type CreateNodeResult<T, O extends Options = Options, C extends unknown[] = []> = VNode & CreateNodeResultCore<T, O, C>

interface SoccerBallOptions {
  pressure: "pumped" | "flat"
}

export interface CreateNodeOp1Function<T = unknown> {
  (options?: unknown, children?: VNode): T
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

interface VNodeWithChildrenSourceType<C extends unknown[], N extends VNode[]> {
  children: CreateNodeChildrenWithSourceType<C>
}

export type InferChildrenSource<V extends { children: AsyncIterable<unknown> }> = V extends VNodeWithChildrenSourceType<infer C, VNode[]> ? C : [];

type ChildrenResult<CValue> =
  CValue extends ChildrenOp1Undefined ? never :
    CValue extends ChildrenOp2Fragment ?
      undefined extends CValue["children"] ? never :
        CValue["children"] extends AsyncIterable<Iterable<infer R>> ? ChildrenResult<R> : never :
          CValue extends ChildrenOp3VNode ? CValue :
            CValue extends ChildrenOp4SourceReference ? SourceReferenceVNode<CValue> :
              CValue extends ChildrenOp5IterableIterator ?
                CValue extends IterableIterator<infer R> ? ChildrenResult<R> : never :
                  CValue extends ChildrenOp6Promise ?
                    CValue extends Promise<infer R> ? ChildrenResult<R> : never :
                      CValue extends ChildrenOp7Iterable ?
                        CValue extends Iterable<infer R> ? ChildrenResult<R> :
                          CValue extends AsyncIterable<infer R> ? ChildrenResult<R> : never :
                            never;

// type ArrayItems<T extends unknown[]> = T extends Array<infer I> ? I : never;
// type ChildrenResultFromSource<C extends unknown[]> = unknown extends ChildrenResult<ArrayItems<C>> ? VNode : VNode;
// type ChildrenFromResult<V> = V extends CreateNodeChildrenWithSourceType<InferChildrenSource<V>, ChildrenResult<InferChildrenSource<V>>[]>
export type VNodeChildrenFromSource<V extends { children?: AsyncIterable<VNode[]> }> = VNodeWithChildrenFromSource<V>["children"];

/**
 * @experimental This type may be removed
 */
export type VNodeWithChildrenFromSource<V extends { children?: AsyncIterable<VNode[]> }> = Omit<V, "children"> & {
  children: V extends { children: AsyncIterable<infer Z> } ? Z extends VNode ? CreateNodeChildrenWithSourceType<InferChildrenSource<V>, Z[]> : never : never;
}

type ChildrenOp1Undefined = undefined;
type ChildrenOp2Fragment = FragmentVNode;
type ChildrenOp3VNode = { reference: SourceReference };
type ChildrenOp4SourceReference = SourceReference;
type ChildrenOp5IterableIterator = IterableIterator<unknown>;
type ChildrenOp7Iterable = Iterable<unknown> | AsyncIterable<unknown>;
type ChildrenOp6Promise = Promise<unknown>;

// Type tests
{
// const soccerOptions: SoccerBallOptions = {
//   pressure: "pumped"
// }
// const soccer = h("⚽", soccerOptions);
//
// const node = h("🐸", {}, soccer);

  const f: false = (undefined as unknown) as IfChildren<["1"], false, true>

  const soccer = (undefined as unknown) as CreateNodeResultCoreOp6<"⚽", SoccerBallOptions>
  const soccer1: { scalar: true, children: never } = (undefined as unknown) as CreateNodeResultCoreOp6<"⚽", SoccerBallOptions>

  const frog = (undefined as unknown) as CreateNodeResultCoreOp6<"🐸", {}, [CreateNodeResultCoreOp6<"⚽", SoccerBallOptions>]>
  const frog1: { scalar: false, children: AsyncIterable<CreateNodeResultCoreOp6<"⚽", SoccerBallOptions>[]> } = (undefined as unknown) as CreateNodeResultCoreOp6<"🐸", {}, [CreateNodeResultCoreOp6<"⚽", SoccerBallOptions>]>

  const HelloWorld1 = (undefined as unknown) as CreateNodeResultCoreOp1<() => {}, {}, ["Hello world"]>;
  const HelloWorld1V: VNode = (undefined as unknown) as CreateNodeResultCoreOp1<() => {}, {}, ["Hello world"]>;

  const HelloWorld2 = (undefined as unknown) as CreateNodeResultCoreOp2<Promise<"Hello Promise">, {}, ["Hello world"]>;
  const HelloWorld2V: VNode = (undefined as unknown) as CreateNodeResultCoreOp2<Promise<"Hello Promise">, {}, ["Hello world"]>;
  const HelloWorld2PC: { source: "Hello Promise" } = (undefined as unknown) as ChildrenResult<"Hello Promise">;
  const HelloWorld2PS: SourceReferenceVNode<"Hello Promise"> = (undefined as unknown) as ChildrenResult<"Hello Promise">;
  const HelloWorld2PS2: SourceReferenceVNode<"Hello Promise"> = (undefined as unknown) as CreateNodeResult<"Hello Promise">;
  const HelloWorld2P: { reference: typeof Fragment, children: AsyncIterable<SourceReferenceVNode<"Hello Promise">[]> } = (undefined as unknown) as CreateNodeResultCoreOp2<Promise<"Hello Promise">, {}, ["Hello world"]>;

  const HelloWorld3 = (undefined as unknown) as CreateNodeResultCoreOp3<typeof Fragment, {}, ["Hello world"]>;
  const HelloWorld3V: VNode = (undefined as unknown) as CreateNodeResultCoreOp3<typeof Fragment, {}, ["Hello world"]>;

  const HelloWorld4 = (undefined as unknown) as CreateNodeResultCoreOp4<VNode, {}, ["Hello world"]>;
  const HelloWorld4V: VNode = (undefined as unknown) as CreateNodeResultCoreOp4<VNode, {}, ["Hello world"]>;

  const HelloWorld5 = (undefined as unknown) as CreateNodeResultCoreOp5<MarshalledVNode, {}, ["Hello world"]>;
  const HelloWorld5V: VNode = (undefined as unknown) as CreateNodeResultCoreOp5<MarshalledVNode, {}, ["Hello world"]>;

  const HelloWorld6 = (undefined as unknown) as CreateNodeResultCoreOp6<"p", {}, ["Hello world"]>;
  const HelloWorld6V: VNode = (undefined as unknown) as CreateNodeResultCoreOp6<"p", {}, ["Hello world"]>;
  const HelloWorld6VC: { scalar: false, source: "p", children: AsyncIterable<SourceReferenceVNode<"Hello world">[]> } = (undefined as unknown) as CreateNodeResultCoreOp6<"p", {}, ["Hello world"]>;

  const HelloWorld7 = (undefined as unknown) as CreateNodeResultCoreOp7<IterableIterator<"Hello Iterable Iterator">, {}, ["Hello world"]>;
  const HelloWorld7V: VNode = (undefined as unknown) as CreateNodeResultCoreOp7<IterableIterator<"Hello Iterable Iterator">, {}, ["Hello world"]>;

  const HelloWorld8 = (undefined as unknown) as CreateNodeResultCoreOp8<Iterable<"Hello Iterable">, {}, ["Hello world"]>;
  const HelloWorld8V: VNode = (undefined as unknown) as CreateNodeResultCoreOp8<Iterable<"Hello Iterable">, {}, ["Hello world"]>;
  const HelloWorld8VC: { reference: typeof Fragment, children: AsyncIterable<SourceReferenceVNode<"Hello Iterable">[]> } = (undefined as unknown) as CreateNodeResultCoreOp8<Iterable<"Hello Iterable">, {}, ["Hello world"]>;
  const HelloWorld8Async = (undefined as unknown) as CreateNodeResultCoreOp8<AsyncIterable<"Hello Async Iterable">, {}, ["Hello world"]>;
  const HelloWorld8VAsync: VNode = (undefined as unknown) as CreateNodeResultCoreOp8<AsyncIterable<"Hello Async Iterable">, {}, ["Hello world"]>;
  const HelloWorld8VAsyncC: { reference: typeof Fragment, children: AsyncIterable<SourceReferenceVNode<"Hello Async Iterable">[]> } = (undefined as unknown) as CreateNodeResultCoreOp8<AsyncIterable<"Hello Async Iterable">, {}, ["Hello world"]>;

  const HelloWorld9 = (undefined as unknown) as CreateNodeResultCoreOp9<undefined, {}, ["Hello world"]>;
  const HelloWorld9V: VNode = (undefined as unknown) as CreateNodeResultCoreOp9<undefined, {}, ["Hello world"]>;
  const HelloWorld9VS: { source: undefined, children?: AsyncIterable<VNode[]> } = (undefined as unknown) as CreateNodeResultCoreOp9<undefined, {}, ["Hello world"]>;

  const HelloWorld = (undefined as unknown) as ChildrenResult<["Hello World"]>;
  const HelloWorldString = (undefined as unknown) as ChildrenResult<"Hello World">;
// const HelloWorldInferred = (undefined as unknown) as ChildrenResult

  const VNodeTestCoreChildren = (undefined as unknown) as  CreateNodeChildrenWithSourceType<["Hello world"], VNode[]>;
  const VNodeTestCore = (undefined as unknown) as CreateNodeResultCore<"p", {}, ["Hello world"]>
// const VNodeTestCoreChildrenConvert = (undefined as unknown) as ChildrenResultFromSource<["Hello world"]>;
// const VNodeTestCoreChildrenConvert: { source: "Hello World " } = (undefined as unknown) as ChildrenResultFromSource<["Hello world"]>;
  const VNodeTest0: VNode = (undefined as unknown) as VNodeWithChildrenFromSource<CreateNodeResultCore<"p", {}, ["Hello world"]>>;
  const VNodeTest1: VNode = (undefined as unknown) as CreateNodeResult<"p", {}, ["Hello world"]>;
  const VNodeTest2: { children: AsyncIterable<{  source: "Hello world" }[]> } = (undefined as unknown) as CreateNodeResult<"p", {}, ["Hello world"]>;
}
