import {FringeError} from "../errors";
import {isNode, Node} from "./node";

export const DescendentAsyncIterableSymbol = Symbol.for("@virtualstate/fringe/Descendent/AsyncIterable");
export type DescendentValue = AsyncIterable<Node[]> & {
  [DescendentAsyncIterableSymbol]: true
};

export const DescendentSymbol = Symbol.for("@virtualstate/fringe/Descendent");

export interface DescendentNode {
  [DescendentSymbol]: DescendentValue;
}

export function isDescendentValue(value: unknown): value is DescendentValue {
  return (
    (
      typeof value === "object" ||
      typeof value === "function"
    ) &&
    Symbol.asyncIterator in value &&
    DescendentAsyncIterableSymbol in value &&
    value[DescendentAsyncIterableSymbol] === true
  );
}

export function isDescendentNode(value: unknown): value is DescendentNode {
  return (
    isNode(value) &&
    DescendentSymbol in value &&
    isDescendentValue(value[DescendentSymbol])
  )
}

export function isDescendent(value: unknown, ignored: unknown, ...descendents: unknown[]): value is DescendentValue | DescendentNode {
  return (
    isDescendentValue(value) ||
    isDescendentNode(value)
  );
}

export class DescendentError extends FringeError {
  constructor() {
    super("Expected Descendent");
  }
}

export function assertDescendent(value: unknown, ignored: unknown, ...descendents: unknown[]): asserts value is DescendentValue {
  if (!isDescendent(value, ignored, ...descendents)) {
    throw new DescendentError();
  }
}

function createDescendentNodeFromValue(value: DescendentValue): DescendentNode {
  return {
    [DescendentSymbol]: value
  };
}

export function createDescendentNode(value: unknown, ignored: unknown, ...descendents: unknown[]): DescendentNode {
  if (isDescendentNode(value)) {
    return value;
  }
  if (isDescendentValue(value)) {
    return createDescendentNodeFromValue(value);
  }
  const asyncIterable = {
    async *[Symbol.asyncIterator]() {
      // TODO descendents resolution here
    }
  };
  defineDescendentNode(asyncIterable);
  return createDescendentNodeFromValue(asyncIterable);
}

export function defineDescendentNode(value: AsyncIterable<Node[]>): asserts value is DescendentValue {
  Object.defineProperty(value, DescendentAsyncIterableSymbol, {
    value: true
  });
}
