import { Fragment, VNode, h } from "@virtualstate/fringe";
import { isTrue } from "./truth";
import { True, False } from "./truth";

export async function *Not(o: unknown, state: VNode) {
  // We have no child state, input is not true
  if (!state) return yield <True />;
  // We have a non fragment child, input is true
  if (state.reference !== Fragment) {
    if (isTrue(state)) {
      return;
    } else {
      return <True />;
    }
  }
  const children = state.children;
  // We have no fragment children, input is not true
  if (!children) return;
  let everYielded = false;
  for await (const result of children) {
    const not = !result.some(isTrue);
    if (not && !everYielded) continue;
    yield not ? <True /> : <False />
    everYielded = true;
  }
  // If we yielded earlier, the final result is the matching result
  if (!everYielded) {
    yield <True />;
  }
}
