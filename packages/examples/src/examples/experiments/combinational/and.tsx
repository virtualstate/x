import { h, Fragment, VNode } from "@virtualstate/fringe";
import { isTrue } from "./truth";
import { True, False } from "./truth";

export async function *And(o: unknown, state: VNode) {
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
    const has = values.every(isTrue);
    if (!has && !everYielded) continue;
    yield has ? <True /> : <False />
    everYielded = true;
  }
}
