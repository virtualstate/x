import type {VNode} from "./vnode";

/**
 * @experimental
 */
export interface PromiseVNodeThenFn {
  (resolve?: (children: VNode[]) => unknown, reject?: (error: unknown) => unknown): Promise<unknown>
}
