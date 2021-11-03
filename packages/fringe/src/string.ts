import {VNode} from "./vnode";
import {isSourceReference} from "./source-reference";
import {union} from "@virtualstate/union";

async function *toStringIterableChildren(node: VNode): AsyncIterable<string> {
  if (!node.children) return yield "";
  let yielded = false;
  for await (const children of node.children) {
    for await (const strings of union(children.map(toStringIterable))) {
      yield strings.join("\n");
      yielded = true;
    }
  }
  if (!yielded) return yield "";
}

async function *toStringIterable(node: VNode): AsyncIterable<string> {
  if (!isSourceReference(node.source)) {
    return yield * toStringIterableChildren(node);
  }
  if (node.scalar) {
    return yield String(node.source);
  }
  for await (const inner of toStringIterableChildren(node)) {
    if (inner) {
      yield `<${String(node.source)}${getOptionsAsAttributes(node.options)}>${inner}</${String(node.source)}>`
    } else {
      yield `<${String(node.source)} ${getOptionsAsAttributes(node.options).trimStart()}/>`
    }
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
    return ` ${parts.join(" ")}`
  }
}

/**
 * @experimental
 */
export function toString(node: VNode): { then(resolve: (value: string) => void, reject: (error: unknown) => void): void } & AsyncIterable<string> {
  const toStringInstance = {
    then(resolve: (value: string) => void, reject: (error: unknown) => void) {
      toStringInvoked().then(resolve, reject);
      async function toStringInvoked(): Promise<string> {
        const iterator = toStringInstance[Symbol.asyncIterator]();
        let result: IteratorResult<string>,
          value = "";
        do {
          result = await iterator.next();
          if (!result.done) {
            value = result.value;
          }
        } while (!result.done);
        return value;
      }
    },
    [Symbol.asyncIterator]() {
      return toStringIterable(node)[Symbol.asyncIterator]();
    }
  }
  return toStringInstance;
}
