import { VNode } from "@virtualstate/fringe";

export async function Void(o: unknown, state?: VNode) {
  if (!state) return;
  const children = state.children;
  if (!children) return;
  const iterator = children[Symbol.asyncIterator]();
  let result;
  do {
    result = await iterator.next();
  } while (!result.done);
  await iterator.return?.();
}
