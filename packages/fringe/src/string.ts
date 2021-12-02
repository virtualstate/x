import {assertVNode, isFragmentVNode, VNode} from "./vnode";
import {isSourceReference} from "./source-reference";
import {union} from "@virtualstate/union";
import {isAsyncIterable, isPromise} from "iterable";
import {deferred} from "./deferred";

export const ToString = Symbol.for("@virtualstate/toString");
/**
 * @experimental
 */
export const ToStringIsScalar = Symbol.for("@virtualstate/toString/isScalar");
/**
 * @experimental
 */
export const ToStringGetHeader = Symbol.for("@virtualstate/toString/getHeader");
/**
 * @experimental
 */
export const ToStringGetBody = Symbol.for("@virtualstate/toString/getBody");
/**
 * @experimental
 */
export const ToStringGetFooter = Symbol.for("@virtualstate/toString/getFooter");
/**
 * @experimental
 */
export const ToStringCache = Symbol.for("@virtualstate/toString/Cache");
/**
 * @experimental
 */
export const ToStringGetCacheKey = Symbol.for("@virtualstate/toString/getCacheKey");
/**
 * @experimental
 */
export const ToStringUseSource = Symbol.for("@virtualstate/toString/useSource");
/**
 * @experimental
 */
export const ToStringDisablePromiseCache = Symbol.for("@virtualstate/toString/disablePromiseCache");

export interface ToStringContext {
  [ToStringCache]: Pick<WeakMap<VNode, unknown>, "get" | "set">;
  [ToStringIsScalar](node: VNode): boolean;
  [ToStringGetBody](node: VNode, body: string): string;
  [ToStringGetHeader](node: VNode, body: string): string;
  [ToStringGetFooter](node: VNode, body: string): string;
  [ToStringGetCacheKey]?(node: VNode): object | undefined;
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
  yield * performCached(
    [node[ToStringCache], this[ToStringCache]],
    !(node[ToStringDisablePromiseCache] || this[ToStringDisablePromiseCache]),
    node[ToStringGetCacheKey]?.(node) ?? this[ToStringGetCacheKey]?.(node) ?? node,
    (async function *cached(this: ToStringContext): AsyncIterable<string> {
      if (node[ToStringUseSource] || this[ToStringUseSource]) {
        if (typeof node.source === "string") {
          return yield node.source;
        } else if (typeof node.source !== "undefined") {
          return yield `${node.source}`;
        }
      }
      const toStringFn: ToStringContext[typeof ToString] = node[ToString]?.bind(node) ?? this[ToString]?.bind(this);
      if (toStringFn) {
        const result = toStringFn(node);
        if (typeof result === "string") {
          return yield result;
        } else if (isPromise(result)) {
          return yield await result;
        } else if (isAsyncIterable(result)) {
          return yield * result;
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
      let value: string;
      let inner: string;
      for await (inner of toStringIterableChildren.call(this, node)) {
        const body: string = (node[ToStringGetBody]?.bind(node) ?? this[ToStringGetBody].bind(this))(node, inner);
        const header: string = (node[ToStringGetHeader]?.bind(node) ?? this[ToStringGetHeader].bind(this))(node, body);
        const footer: string = (node[ToStringGetFooter]?.bind(node) ?? this[ToStringGetFooter].bind(this))(node, body);
        value = `${header}${body}${footer}`;
        yield value;
      }
    }).call(this)
  );


  async function *performCached<T>(
    caches: (Pick<WeakMap<object, unknown>, "get" | "set"> | undefined)[],
    enabled: boolean,
    key: object,
    input: AsyncIterable<T>
  ): AsyncIterable<T> {
    /**
     * Returns an async iterable that moves forward in value
     * Whenever an iterator is added, it will start at the most recent value
     * that was yielded, and continue from there
     */
    function queue<T>() {
      interface QueueResult {
        next: Promise<QueueResult>
        value: T
        done?: boolean
      }
      interface Queue extends AsyncIterable<T>, PromiseLike<T> {
        value<Z extends T>(value: Z): Z;
        end(): void;
        reject(error: unknown): void;
      }
      let done = false;
      let current = deferred<QueueResult>();
      let value: T;
      let error: unknown;
      const q: Queue = {
        value<Z extends T>(nextValue: Z): Z {
          if (enabled) {
            value = nextValue;
            const previous = current;
            current = deferred();
            previous.resolve({
              next: current.promise,
              value: nextValue,
              done: false
            });
          }
          return nextValue;
        },
        end() {
          done = true;
          if (enabled) {
            current.resolve({
              value: undefined,
              done: true,
              next: current.promise
            });
          }
        },
        reject(nextError: unknown) {
          if (done) return;
          done = true;
          if (enabled) {
            error = nextError;
            current.reject(nextError);
          }
        },
        async *[Symbol.asyncIterator](): AsyncIterator<T> {
          if (typeof value !== "undefined") {
            yield value;
          }
          let result: Partial<QueueResult> = {
            next: current.promise
          }
          do {
            result = await result.next;
            if (!result.done && typeof result.value !== "undefined") {
              yield value;
            }
          } while (!result.done)
        },
        async then(resolve, reject) {
          if (error) {
            return reject(error);
          }
          if (done) {
            return resolve(value);
          }
          return wait().then(resolve, reject);
          async function wait<T>() {
            let value;
            for await (value of q) {}
            return value;
          }
        }
      };
      return q;
    }

    const existingValue = caches.reduce((found, cache) => found ?? cache?.get(key), undefined);
    if (enabled && isAsyncIterable<T>(existingValue)) {
      // If we have an async iterable, we can replay it
      return yield * existingValue;
    } else if (enabled && isPromise<T>(existingValue)) {
      const value: T = await existingValue;
      if (isValueNotUndefined(value)) {
        yield value;
      }
      return;
    } else if (isValueNotUndefined(existingValue) && (enabled || !isPromise(existingValue))) {
      return yield existingValue;
    }
    const q = queue<T>();
    if (enabled) {
      for (const cache of caches) {
        cache?.set(key, q);
      }
    }
    let value: T;
    try {
      for await (value of input) {
        yield q.value(value);
      }
    } catch (error) {
      if (enabled) {
        resetCachesIfPromise()
        q.reject(error);
      }
      await Promise.reject(error);
      throw error; // awaiting a rejected promise above should close this stack... but for a programmers eye...
    }
    for (const cache of caches) {
      cache?.set(key, value);
    }
    if (enabled) {
      q.end();
    }

    function resetCachesIfPromise() {
      for (const cache of caches) {
        if (cache?.get(key) === q) {
          cache.set(key, undefined);
        }
      }
    }

    function isValueNotUndefined(value: unknown): value is T {
      return typeof value !== "undefined";
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
    [ToStringCache]: this?.[ToStringCache] ?? new WeakMap()
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
