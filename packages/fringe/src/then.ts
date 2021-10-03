import type {VNode} from "./vnode";
import {createToken} from "./token";

// Access to re-assign promise functionality
/**
 * @experimental
 */
export const Then = Symbol("Function VNode Then");
/**
 * @experimental
 */
export const EnableThen = Symbol("VNode Enable Then");

/**
 * @experimental
 */
export function isEnableThen(node: unknown): node is { [EnableThen]: true } {
  function isEnableThenLike(node: unknown): node is { [EnableThen]: unknown } {
    return !!node;
  }
  return isEnableThenLike(node) && node[EnableThen] === true;
}

/**
 * @experimental
 */
export interface VNodeWithThenOptions extends VNode {
  [Then](this: VNode, previous: VNode[], result: IteratorResult<VNode[]>): Promise<VNode[]>
}

/**
 * @experimental
 */
export interface PromiseVNodeThenFn {
  (resolve?: (children: VNode[]) => unknown, reject?: (error: unknown) => unknown): Promise<unknown>
}

/**
 * @experimental
 */
function isVNodeWithThenOptions(node: VNode): node is VNodeWithThenOptions {
  return typeof node[Then] === "function";
}

export async function then(this: VNode, resolve?: (children: VNode[]) => unknown, reject?: (error: unknown) => unknown): Promise<unknown> {
  let children: VNode[] = [];
  try {
    // Assume a node will complete and provide state as its final
    // This functionality can be replaced by end user by re-assigning this function
    const iterator = this.children?.[Symbol.asyncIterator]?.();
    let result: IteratorResult<VNode[]>;
    do {
      result = await iterator.next();
      if (isVNodeWithThenOptions(this)) {
        children = await this[Then](children, result);
      } else {
        children = result.value ?? children;
      }
    } while(!result.done);
  } catch (error) {
    return await reject(error);
  }
  return await resolve(children);
}
