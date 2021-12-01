import {assertVNode, isFragmentVNode, VNode} from "./vnode";
import {isSourceReference} from "./source-reference";
import {union} from "@virtualstate/union";
import {isAsyncIterable, isPromise} from "iterable";
import {deferred} from "./deferred";

export const ToString = Symbol("toString");
/**
 * @experimental
 */
export const ToStringIsScalar = Symbol("isScalar");
/**
 * @experimental
 */
export const ToStringGetHeader = Symbol("getHeader");
/**
 * @experimental
 */
export const ToStringGetBody = Symbol("getBody");
/**
 * @experimental
 */
export const ToStringGetFooter = Symbol("getFooter");
/**
 * @experimental
 */
export const ToStringCache = Symbol("Cache");
/**
 * @experimental
 */
export const ToStringUseSource = Symbol("useSource");
/**
 * @experimental
 */
export const ToStringDisablePromiseCache = Symbol("disablePromiseCache");

export interface ToStringContext {
  [ToStringCache]: Pick<WeakMap<VNode, unknown>, "get" | "set">;
  [ToStringIsScalar](node: VNode): boolean;
  [ToStringGetBody](node: VNode, body: string): string;
  [ToStringGetHeader](node: VNode, body: string): string;
  [ToStringGetFooter](node: VNode, body: string): string;
  [ToStringUseSource]?: boolean
  [ToStringDisablePromiseCache]?: boolean
  // Allows for full override of functionality
  [ToString]?(node: VNode): undefined | string | Promise<string | undefined> | AsyncIterable<string>;
}

function getBody(node: VNode, body: string) {
  return body;
}

function getHeader(node: VNode, body: string) {
  const attributes = getOptionsAsAttributes(node.options);
  const trailer = body ? ">" : "";
  return `${`<${String(node.source)} ${attributes}`.trim()}${trailer}`;
}

function getFooter(node: VNode, body: string) {
  if (!body) return " />";
  return `</${String(node.source)}>`
}

function isScalar(node: VNode): node is VNode & { scalar: true } {
  return node.scalar;
}

const defaultContext: ToStringContext = {
  [ToStringCache]: new WeakMap(),
  [ToStringIsScalar]: isScalar,
  [ToStringGetBody]: getBody,
  [ToStringGetHeader]: getHeader,
  [ToStringGetFooter]: getFooter
}

function getOptionsAsAttributes(options?: object): string {
  if (!options) return "";
  const parts = Object.keys(options)
    .map(key => {
      const value = options[key];
      if (!isSourceReference(value)) return undefined;
      if (typeof value === "boolean") {
        return value ? key : undefined;
      }
      return `${key}="${String(value)}"`;
    })
    .filter(Boolean);
  if (!parts.length) return "";
  return parts.join(" ");
}

async function *toStringIterableChildren(this: ToStringContext, node: VNode): AsyncIterable<string> {
  if (!node.children) return yield "";
  let yielded = false;
  for await (const children of node.children) {
    for await (const strings of union(children.map(toStringIterable.bind(this)))) {
      yield strings.filter(value => typeof value !== "undefined").join("\n");
      yielded = true;
    }
  }
  if (!yielded) return yield "";
}

async function *toStringIterable(this: ToStringContext, node: VNode & Partial<ToStringContext>): AsyncIterable<string> {
  if (node[ToStringUseSource] || this[ToStringUseSource]) {
    if (typeof node.source === "string") {
      return yield node.source;
    } else if (typeof node.source !== "undefined") {
      return yield `${node.source}`;
    }
  }
  const promiseCache = !(node[ToStringDisablePromiseCache] || this[ToStringDisablePromiseCache]);
  const toStringFn: ToStringContext[typeof ToString] = node[ToString]?.bind(node) ?? this[ToString]?.bind(this);
  if (toStringFn) {
    const existingValue = (node[ToStringCache]?.get(node) ?? this[ToStringCache].get(node));
    if (typeof existingValue === "string") {
      return yield existingValue;
    } else if (promiseCache && isPromise(existingValue)) {
      const value = await existingValue;
      if (typeof value === "string") {
        yield value;
      }
      return;
    }
    const result = toStringFn(node);
    if (typeof result === "string") {
      node[ToStringCache]?.set(node, result);
      this[ToStringCache].set(node, result);
      return yield result;
    } else if (isPromise(result)) {
      if (promiseCache) {
        node[ToStringCache]?.set(node, result);
        this[ToStringCache].set(node, result);
      }
      try {
        const value = await result;
        node[ToStringCache]?.set(node, value);
        this[ToStringCache].set(node, value);
        return yield value;
      } finally {
        if (promiseCache) {
          if (node[ToStringCache]?.get(node) === result) {
            node[ToStringCache]?.set(node, undefined);
          }
          if (this[ToStringCache]?.get(node) === result) {
            this[ToStringCache].set(node, undefined);
          }
        }
      }
    } else if (isAsyncIterable(result)) {
      const { resolve, reject, promise } = deferred<string>();
      if (promiseCache) {
        node[ToStringCache]?.set(node, promise);
        this[ToStringCache].set(node, promise);
      }
      let value: string;
      try {
        for await (value of result) {
          yield value;
        }
        node[ToStringCache]?.set(node, value);
        this[ToStringCache].set(node, value);
      } catch (error) {
        if (promiseCache) {
          reject(error);
        }
        await Promise.reject(error);
      } finally {
        if (promiseCache) {
          if (node[ToStringCache]?.get(node) === promise) {
            node[ToStringCache]?.set(node, undefined);
          }
          if (this[ToStringCache].get(node) === promise) {
            this[ToStringCache].set(node, undefined);
          }
          resolve(value);
        }
      }
      return;
    } else if (typeof result === "undefined") {
      return;
    }
    throw new Error("Unknown string return type");
  }
  if (!isSourceReference(node.source) || isFragmentVNode(node)) {
    return yield * toStringIterableChildren.call(this, node);
  }
  if ((node[ToStringIsScalar]?.bind(node) ?? this[ToStringIsScalar]?.bind(this))(node)) {
    return yield String(node.source);
  }
  const existingValue = (node[ToStringCache]?.get(node) ?? this[ToStringCache].get(node));
  if (typeof existingValue === "string") {
    return yield existingValue;
  }
  if (promiseCache && isPromise(existingValue)) {
    const value = await existingValue;
    if (typeof value === "string") {
      yield value;
    }
    return;
  }
  const { resolve, reject, promise } = deferred<string>();
  if (promiseCache) {
    node[ToStringCache]?.set(node, promise);
    this[ToStringCache].set(node, promise);
  }
  let value: string = "";
  try {
    let inner: string;
    for await (inner of toStringIterableChildren.call(this, node)) {
      const body: string = (node[ToStringGetBody]?.bind(node) ?? this[ToStringGetBody].bind(this))(node, inner);
      const header: string = (node[ToStringGetHeader]?.bind(node) ?? this[ToStringGetHeader].bind(this))(node, body);
      const footer: string = (node[ToStringGetFooter]?.bind(node) ?? this[ToStringGetFooter].bind(this))(node, body);
      value = `${header}${body}${footer}`;
      yield value;
    }
    node[ToStringCache]?.set(node, value);
    this[ToStringCache].set(node, value);
  } catch (error) {
    if (promiseCache) {
      reject(error);
    }
    await Promise.reject(error);
  } finally {
    if (promiseCache) {
      if (node[ToStringCache]?.get(node) === promise) {
        node[ToStringCache]?.set(node, undefined);
      }
      if (this[ToStringCache].get(node) === promise) {
        this[ToStringCache].set(node, undefined);
      }
      resolve(value);
    }
  }
}

interface IterablePromise<V> extends AsyncIterable<V> {
  then(resolve: (value: V) => void, reject: (error: unknown) => void): void
}

/**
 * @experimental
 */
export function toString(node: VNode): IterablePromise<string>
export function toString(this: Partial<ToStringContext> & VNode): IterablePromise<string>
export function toString(this: Partial<ToStringContext>, node: VNode): IterablePromise<string>
export function toString(this: Partial<ToStringContext> | undefined, input?: VNode): IterablePromise<string> {
  const context: ToStringContext = {
    ...defaultContext,
    ...this,
    [ToStringCache]: this[ToStringCache] ?? new WeakMap()
  };
  // Use the original this for access as a node
  const node = input ?? this;
  assertVNode(node);
  const toStringInstance: IterablePromise<string> = {
    then(resolve, reject) {
      toStringInvoked().then(resolve, reject);
      async function toStringInvoked(): Promise<string> {
        let iteration = "";
        for await (iteration of toStringInstance) {}
        return iteration;
      }
    },
    async *[Symbol.asyncIterator]() {
      yield* toStringIterable.call(context, node);
    }
  }
  return toStringInstance;
}
