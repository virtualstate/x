import { h, Fragment, VNode } from "@virtualstate/fringe";
import { isTrue } from "./thing";
import { True } from "./thing";

export interface AndOptions {
  size: number; // def 2
}

export async function *And({ size = 2 }: AndOptions, state: VNode) {
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
    const has = values.length === size && values.every(isTrue);
    if (!has && !everYielded) continue;
    everYielded = true;
    yield <True />
  }
}
