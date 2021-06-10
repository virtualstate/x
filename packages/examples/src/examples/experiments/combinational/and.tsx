import {h, Fragment, VNode, createFragment} from "@virtualstate/fringe";
import { isTrue } from "./truth";
import { True, False } from "./truth";

export interface AndOptions {
  size?: number;
  // Wraps in Truthful And node & provides children result.
  // To be used with size
  //
  // This is to bind a specific sized children group into a parent
  self?: boolean;
}

export async function *And({ size, self }: AndOptions, state: VNode) {
  // We have no child state, no input is true
  if (!state) return
  // We have a non fragment child, all input is true
  if (state.reference !== Fragment) return yield true;
  const children = state.children;
  // We have no fragment children, no input is true
  if (!children) return;
  let everYielded = false;
  for await (const values of children) {
    // We have exactly the size we are after
    const has = values.every(isTrue) && (!size || values.length === size);
    if (!has && !everYielded) continue;
    yield has ? ((self && size) ? result(values) : <True />) : <False />
    everYielded = true;
  }

  function result(values: VNode[]) {
    return {
      reference: Symbol("Truthful AND"),
      children: {
        async *[Symbol.asyncIterator]() {
          yield values;
        }
      }
    }
  }
}
