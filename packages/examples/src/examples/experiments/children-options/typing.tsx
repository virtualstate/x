import { h } from "@virtualstate/fringe";

function A(this: { a: 1 }) {
  return <a>{this.a}</a>
}

function B(this: { b: 2 }) {
  return <b>{this.b}</b>
}

function C(this: { c: 3 }) {
  return <c>{this.c}</c>
}

function CK(this: { c: 30 }) {
  return <c>{this.c}</c>
}

function D(this: { d: 4 }) {
  return <d>{this.d}</d>
}

export const domain = [
  A,
  B,
  C,
  // CK,
  D
] as const;

type ContainerThisTupleType<T extends (ReadonlyArray<Function> | Function[])> = {
  [P in keyof T]: T[P] extends (this: infer R, ...args: unknown[]) => unknown ? R : never
}
type ContainerReturnTupleType<T extends (ReadonlyArray<Function> | Function[])> = {
  [P in keyof T]: T[P] extends (...args: unknown[]) => unknown ?
    ReturnType<T[P]> extends Promise<infer R> ? R :
      ReturnType<T[P]>
    : never
}

type Mapped<T> = {
  [P in keyof T]-?: T[P]
};

type UnionToIntersection<U> =
  (U extends unknown ? (arg: U) => unknown : never) extends ((arg: infer I) => unknown) ? I : never

type ContainerThisType<T extends (ReadonlyArray<Function> | Function[])> = UnionToIntersection<Mapped<ContainerThisTupleType<T>[number]>>
type ContainerReturnType<T extends (ReadonlyArray<Function> | Function[])> = UnionToIntersection<Mapped<ContainerReturnTupleType<T>[number]>>

interface Container<This, R = unknown> {
  (this: This, ...args: unknown[]): R | Promise<R> | AsyncIterator<R>
}

type ContainerTupleTypeMap<T extends (ReadonlyArray<Function> | Function[])> = {
  [P in keyof T]: T[P] extends ((this: infer I, ...args: unknown[]) => unknown) ? I : never
}

type JoinReturnType<T extends (ReadonlyArray<Function> | Function[])> = Container<
  ContainerThisTupleType<T>[number],
  ContainerReturnType<T>
>


function join<T extends Function[]>(...containers: T): JoinReturnType<T>;
function join(...containers: Container<unknown>[]): Container<unknown> {
  return async function (this: unknown) {
    const that = this;
    const results = await Promise.all(
      containers.map(container => container.call(that))
    );
    return results.reduce(
      (map, result) => Object.assign(map, result),
      {}
    );
  }
}

type ThisTypesMapped = ContainerThisTupleType<typeof domain>[number]
const z: ThisTypesMapped = {
  a: 1
}
const z1: UnionToIntersection<ThisTypesMapped> = {
  d: 4,
  a: 1,
  b: 2,
  c: 3
}
type ThisTypes = ContainerThisType<typeof domain>;

export const input: ThisTypes = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
} as const;
