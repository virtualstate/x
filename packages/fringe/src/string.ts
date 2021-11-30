import {assertVNode, isFragmentVNode, VNode} from "./vnode";
import {isSourceReference} from "./source-reference";
import {union} from "@virtualstate/union";

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

export interface ToStringContext {
  [ToStringCache]: Pick<WeakMap<VNode, string>, "get" | "set">;
  [ToStringIsScalar](node: VNode): boolean;
  [ToStringGetBody](node: VNode, body: string): string;
  [ToStringGetHeader](node: VNode, body: string): string;
  [ToStringGetFooter](node: VNode, body: string): string;
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

async function *toStringIterable(this: ToStringContext, node: VNode): AsyncIterable<string> {
  if (!isSourceReference(node.source) || isFragmentVNode(node)) {
    return yield * toStringIterableChildren.call(this, node);
  }
  if (this[ToStringIsScalar](node)) {
    return yield String(node.source);
  }
  const existingValue = this[ToStringCache].get(node);
  if (existingValue) {
    return yield existingValue;
  }
  let value;
  for await (const inner of toStringIterableChildren.call(this, node)) {
    const body = this[ToStringGetBody](node, inner);
    const header = this[ToStringGetHeader](node, body);
    const footer = this[ToStringGetFooter](node, body);
    value = `${header}${body}${footer}`;
    yield value;
  }
  this[ToStringCache].set(node, value);
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
    [ToStringCache]: new WeakMap(),
    ...this
  };
  const node = input ?? context;
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
