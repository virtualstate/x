import type {VNode} from "./vnode";

// Access to re-assign promise functionality
/**
 * @experimental
 */
export const Then = Symbol.for("@virtualstate/fringe/then");
/**
 * @experimental
 */
export const EnableThen = Symbol.for("@virtualstate/fringe/then/enable");

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

// Assume a node will complete and provide state as its final
// This functionality can be replaced by end user by re-assigning this function
// If no state found, an empty array will be returned
/**
 * @experimental for direct usage
 */
export async function then(this: VNode, resolve?: (children: VNode[]) => unknown, reject?: (error: unknown) => unknown): Promise<unknown> {
  let resolved
  try {
    resolved = await getResolved.call(this)
  } catch (error) {
    return await reject(error);
  }
  return await resolve(resolved);

  async function getResolved(this: VNode) {
    const iterator = this.children?.[Symbol.asyncIterator]?.()
    let children: VNode[] = [];
    if (!iterator?.next) {
      if (isVNodeWithThenOptions(this)) {
        return await this[Then]([], {value: undefined, done: true});
      } else {
        return [];
      }
    }
    let result: IteratorResult<VNode[]>;
    do {
      result = await iterator.next();
      if (isVNodeWithThenOptions(this)) {
        children = await this[Then](children, result);
      } else {
        children = result.value ?? children;
      }
    } while(!result.done);
    return children;
  }
}

/**
 * Naming this then breaks await import("@virtualstate/fringe");
 * @experimental for direct usage
 */
export const thenish = then;
