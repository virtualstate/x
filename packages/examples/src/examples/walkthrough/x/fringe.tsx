/*
This is an in progress guide to fringe
 */

/*
The core function exported by fringe is `h`,
we use it as a catch all reference to wrap userland context in a transportable object.

This allows us to further process the captured context elsewhere, and identify it as such.

By default we will use an object, but there is no reason why we can't use a function or class
as a "container" object, however to assign unique properties to the returned value, we would want to
use a new function (or class) reference each time.
 */
export let h = (...args) => ({});

/*
We want to be able to know if the object is actually a wrapping container,
so we will create a unique symbol that we can assign as a property
 */
export const NodeSymbol = Symbol.for("h/node");
h = extend(h, (...args) => ({
  [NodeSymbol]: true
}));

/*
We will treat the first argument that is passed as our "source", this could be interpreted later
as anything, maybe a type, flag, key, or value
 */
export const SourceSymbol = Symbol.for("h/node/source");
h = extend(h, (source, ...args) => ({
  [SourceSymbol]: source
}));

/*
The second argument will be an object that is typically runtime options,
these may be later changed, so we could keep track of the initial options,
and then also have a "working" set of options that can be mutated at will.
 */
export const InitialOptionsSymbol = Symbol.for("h/node/options/initial");
export const OptionsSymbol = Symbol.for("h/node/options");
h = extend(h, (source, options: object) => ({
  [InitialOptionsSymbol]: options,
  [OptionsSymbol]: {
    ...options
  }
}))

/*
The rest of the arguments are children relative to this new defined
 */
export const ChildrenSourceSymbol = Symbol.for("h/node/children/source");
h = extend(h, (source, options, ...children) => ({
  [ChildrenSourceSymbol]: children
}))

/*
Once we have all of our parameters organised, we can freely reference them
and create a public interface

For example, if the source is a primitive, we can directly access the source
without worrying about access issues to the value, or resolution of a return value
 */
export const IsPrimitiveSymbol = Symbol.for("h/node/isPrimitive");
export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol;
h = extend(h, function (this: Node) {
  const source = this[SourceSymbol];
  const isPrimitive = (
    typeof source === "string" ||
    typeof source === "number" ||
    typeof source === "boolean" ||
    typeof source === "bigint" ||
    typeof source === "symbol"
  );
  if (!isPrimitive) return {};
  return {
    [IsPrimitiveSymbol]: true,
    source
  };
});

/*
We may want to have a stable primitive reference for our node
that we can use for things like cache maps or to check if we have seen
any copy of a node.

By default we can use a symbol for all nodes, this can be freely replaced
 */
h = extend(h, () => ({
  reference: Symbol()
}))

/*
If the original source was a node itself, we want to swap the options out for a merge of the both,
with the passed options overwriting the old
 */
export function isNode(value: unknown): value is Node {
  return !!value && value[NodeSymbol];
}
h = extend(h, function (this: Node) {
  const source = this[SourceSymbol];
  if (!isNode(source)) return {};
  return {
    [OptionsSymbol]: {
      ...source[OptionsSymbol],
      ...this[OptionsSymbol]
    }
  };
})

/*
We're going to want to access our children in uniform way. Whether that be as an iterable for a static
snapshot of children, an async iterable for multiple state children, or a promise, for single state children
 */
export const ResolveChildrenSource = Symbol("h/node/children/resolve");
export const RejectChildrenSource = Symbol("h/node/children/reject");
export const IterableChildrenSource = Symbol("h/node/children/iterable");
export const AsyncIterableChildrenSource = Symbol("h/node/children/iterable/async");
export const PromiseChildrenSource = Symbol("h/node/children/iterable/async");
h = extend(h, function (this: Node) {
  let resolve,
    reject;
  let resolved = false,
    rejected = false,
    settled = false;
  const childrenPromise: Promise<Node[]> & Partial<AsyncIterable<Node[]>> & Partial<Iterable<Node>> & {
    [IterableChildrenSource]?: Node[];
    [AsyncIterableChildrenSource]?: AsyncIterable<Node[]>;
  } = new Promise(
    (resolveFn, rejectFn) => {
      resolve = (arg) => {
        resolved = true;
        settled = true;
        return resolveFn(arg);
      };
      reject = (reason) => {
        rejected = true;
        settled = true;
        return rejectFn(reason);
      };
    }
  );
  const asyncIterable = childrenPromise[Symbol.asyncIterator] = async function *() {
    if (childrenPromise[IterableChildrenSource]) {
      const result = [...childrenPromise[IterableChildrenSource]]
      resolve(result)
      yield result
    } else if (childrenPromise[AsyncIterableChildrenSource]) {
      let result;
      for await (result of childrenPromise[AsyncIterableChildrenSource]) {
        yield result;
      }
      resolve(result);
    }
  }
  childrenPromise[Symbol.iterator] = function *() {
    if (childrenPromise[IterableChildrenSource]) {
      const result = [...childrenPromise[IterableChildrenSource]]
      resolve(result)
      yield * result;
    }
  }
  const { then: promiseThen } = childrenPromise;
  childrenPromise.then = (onFulfilled, onRejected) => {
    return Promise.resolve()
      .then(async () => {
        if (settled) return;
        for await (const away of asyncIterable()) {}
      })
      .then(() => promiseThen.call(childrenPromise, onFulfilled, onRejected));
  }
  childrenPromise.catch = (onRejected) => {
    return childrenPromise.then(undefined, onRejected);
  }
  return {
    [ResolveChildrenSource]: resolve,
    [RejectChildrenSource]: reject,
    // children can be freely replaced here using this internally as reference
    //
    // However you should instead use IterableChildrenSource or AsyncIterableChildrenSource
    children: childrenPromise
  }
})

/*
If we have no children, and we have a primitive source value,
we can freely label this node as "scalar"

We may still resolve with no children however if scalar is not true, it's just a "shortcut" for us
to know early without checking further.
 */
h = extend(h, function (this: Node) {
  if (!(this[IsPrimitiveSymbol] && !this[ChildrenSourceSymbol].length)) {
    return {};
  }
  return {
    scalar: true
  }
})

interface Node extends Record<string, unknown> {
  reference: Primitive;
  source?: Primitive;
  children?: Promise<Node[]> & AsyncIterable<Node[]> & Iterable<Node> & {
    [IterableChildrenSource]?: Node[];
    [AsyncIterableChildrenSource]?: AsyncIterable<Node[]>;
  }
  scalar?: boolean;
  [IsPrimitiveSymbol]?: boolean;
  [SourceSymbol]: unknown;
  [InitialOptionsSymbol]: object;
  [OptionsSymbol]: object;
  [ChildrenSourceSymbol]: unknown[];

}
type PartialNode = Partial<Omit<Node, "children"> & { children?: Partial<Node["children"]> }>
interface NodeFn {
  (...args: unknown[]): PartialNode;
  (this: Node, ...args: unknown[]): PartialNode;
}
function extend(h: NodeFn, fn: NodeFn): NodeFn {
  return (...args: unknown[]) => {
    const node = h(...args);
    const assign = fn.call(node, ...args);
    if (typeof node === "function") {
      Object.assign(node, assign);
      return node;
    }
    if (typeof assign === "function") {
      Object.assign(assign, node);
      return assign;
    }
    return {
      ...node,
      ...assign
    };
  }
}

export function Render() {

}

export default <Render />
