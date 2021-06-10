import { Fragment, VNode, h } from "@virtualstate/fringe";
import { isTrue } from "./thing";
import { True, False } from "./thing";

export async function *Or(o: unknown, state: VNode) {
  // We have no child state, no input is true
  if (!state) return
  // We have a non fragment child, all input is true
  if (state.reference !== Fragment) {
    if (isTrue(state)) {
      yield <True />;
    }
    return;
  }
  const children = state.children;
  // We have no fragment children, no input is true
  if (!children) return;
  let everYielded = false;
  for await (const values of children) {
    const found = values.find(isTrue);
    if (!found && !everYielded) continue;
    everYielded = true;
    yield found ?? <False />;
  }
}
