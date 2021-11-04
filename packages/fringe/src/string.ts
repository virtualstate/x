import {isFragmentVNode, VNode} from "./vnode";
import {isSourceReference} from "./source-reference";
import {union} from "@virtualstate/union";

export interface ToStringContext {
  values: WeakMap<VNode, string>;
  isScalar(node: VNode): boolean;
  getBody(node: VNode, body: string): string;
  getHeader(node: VNode, body: string): string;
  getFooter(node: VNode, body: string): string;
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

const defaultContext: ToStringContext = {
  values: new WeakMap(),
  isScalar(node) {
    return node.scalar;
  },
  getBody,
  getHeader,
  getFooter
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
      yield strings.join("\n");
      yielded = true;
    }
  }
  if (!yielded) return yield "";
}

async function *toStringIterable(this: ToStringContext, node: VNode): AsyncIterable<string> {
  if (!isSourceReference(node.source) || isFragmentVNode(node)) {
    return yield * toStringIterableChildren.call(this, node);
  }
  if (this.isScalar(node)) {
    return yield String(node.source);
  }
  const existingValue = this.values.get(node);
  if (existingValue) {
    return yield existingValue;
  }
  let value;
  for await (const inner of toStringIterableChildren.call(this, node)) {
    const body = this.getBody(node, inner);
    const header = this.getHeader(node, body);
    const footer = this.getFooter(node, body);
    value = `${header}${body}${footer}`;
    yield value;
  }
  this.values.set(node, value);
}

interface IterablePromise<V> extends AsyncIterable<V> {
  then(resolve: (value: V) => void, reject: (error: unknown) => void): void
}

/**
 * @experimental
 */
export function toString(node: VNode): IterablePromise<string>
export function toString(this: Partial<ToStringContext>, node: VNode): IterablePromise<string>
export function toString(this: Partial<ToStringContext> | undefined, node: VNode): IterablePromise<string> {
  const context = {
    ...defaultContext,
    values: new WeakMap(),
    ...this
  };
  const toStringInstance: IterablePromise<string> = {
    then(resolve, reject) {
      toStringInvoked().then(resolve, reject);
      async function toStringInvoked(): Promise<string> {
        let value = "";
        for await (const iteration of toStringInstance) {
          value = iteration;
        }
        return value;
      }
    },
    [Symbol.asyncIterator]() {
      return toStringIterable.call(context, node)[Symbol.asyncIterator]();
    }
  }
  return toStringInstance;
}
