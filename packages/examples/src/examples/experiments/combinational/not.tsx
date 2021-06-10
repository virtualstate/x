import { Fragment, VNode, h } from "@virtualstate/fringe";
import { isTrue } from "./thing";
import { True } from "./thing";

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
  const iterator = children[Symbol.asyncIterator]();
  const next = await iterator.next();
  await iterator.return?.();
  // We have at least one iteration, input is maybe true
  if (isYieldIteratorResult(next)) {
    if (next.value.some(isTrue)) {
      return;
    }
  }
  // We have no iterations, input is false
  yield <True />;

  function isYieldIteratorResult<T>(result: IteratorResult<T>): result is IteratorYieldResult<T> {
    return !result.done && !!result.value
  }
}
