function A(this: { a: 1 }) {
  return this.a;
}

function B(this: { b: 2 }) {
  return this.b;
}

function C(this: { c: 3 }) {
  return this.c;
}

function CK(this: { c: 30 }) {
  return this.c;
}

function D(this: { d: 4 }) {
  return this.d;
}

const domain = [
  A,
  B,
  C,
  CK,
  D
] as const;

type Diff<L, R> = Omit<L, keyof R>;
type Union<L, R> =  Diff<L, R> & { [P in keyof L & keyof R]: L[P] | R[P] } & Diff<R, L>
type BuildFromThisType<ThisType> = 1;
type Skip<A extends ReadonlyArray<unknown>> = A extends (skip: unknown, ...args: infer Z) => unknown ?
  Z
  : never;
type Build<Domain extends ReadonlyArray<unknown>> =
  { [P in keyof ThisParameterType<Domain[number]>]: ThisParameterType<Domain[number]>[P] }
type ThisParameterTypeOrNever<T> = T extends (this: infer U, ...args: unknown[]) => unknown ? U : never;

type SpreadThisTypes<K> = (arg: K) => any extends (...args: infer I) => any ? I : never;
type KeysOfUnion<T> = T extends T ? keyof T: never;

type Intersect<T> = (T extends any ? ((x: T) => 0) : never) extends ((x: infer R) => 0) ? R : never

// type UnionToIntersection<U> = (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never

type TupleKeys<T extends ReadonlyArray<unknown>> = Exclude<keyof T, keyof []>
type Foo<T extends ReadonlyArray<unknown>> = {
  [K in TupleKeys<T>]: {foo: T[K]}
}
type Unfoo<T> = T extends { foo: any } ? T["foo"] : never
type Values<T> = T[keyof T]
type IntersectItems<T extends ReadonlyArray<unknown>> = Unfoo<Intersect<Values<Foo<T>>>>

type UnionToIntersectionHelper<U> = (
  U extends any ? (k: U) => void : never
  ) extends (k: infer I) => void
  ? I
  : never;

type UnionToIntersection<T> =
  (T extends any ? (x: T) => any : never) extends
    (x: infer R) => any ? R : never

//
// type ThisTypes = ThisParameterTypeOrNever<typeof domain[number]>;
// type K1<Z extends ({ a: 1 } | { b : 2 } | { c: 3 } | { c: 30 } | { d: 4 })> = Z;
// type Test1 = K1<ThisTypes>
// type Keys1 = keyof UnionToIntersection<Test1>;
// type Keys2 = keyof UnionToIntersection<({ a: 1 } | { b : 2 } | { c: 3 } | { c: 30 } | { d: 4 })>;
// type Keys3 = keyof UnionToIntersection<ThisTypes>;
// type Keys4 = keyof Intersect<ThisParameterTypeOrNever<typeof domain[number]>>;
// type Keys5 = keyof IntersectItems<typeof domain>;
// type K<Z extends ({ a: 1, b : 2, c: 3 | 30, d: 4 })> = Z;
// type This = { [P in keyof ThisParameterType<typeof domain[number]>]: ThisParameterType<typeof domain[number]>[P] };
//
// const base: ThisTypes = {
//   c: 3
// };
//
// const that: This = {
//   c: 3,
//   d: 4
// } as const
//
//
// const that2: This = {
//   ...that,
//   c: 30
// }
