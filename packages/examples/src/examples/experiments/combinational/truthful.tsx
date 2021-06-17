import { createFragment, h, VNode } from "@virtualstate/fringe";
import { isTrue } from "./truth";

// This is like an AND, but only cares about if we _finish_ with an AND
// If it does not finish in an AND, it will throw an error.
export async function *Truthful(o: unknown, state?: VNode) {
  const children = state?.children;
  if (!children) {
    throw new Error("Expected state to be provided");
  }
  let isPreviousTrue = false;
  for await (const result of children) {
    isPreviousTrue = result.every(isTrue);
    if (isPreviousTrue) {
      yield createFragment({}, ...result);
    }
  }
  if (!isPreviousTrue) {
    throw new Error("Expected state to be truthy");
  }
}
