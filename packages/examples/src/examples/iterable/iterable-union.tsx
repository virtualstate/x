import {h, a, createFragment, VNode, createToken} from "@virtualstate/x";
import { read } from "./read";
import {union} from "@virtualstate/union";

async function *Horse() {
  yield "🐴";
  yield "💪";
}

async function *Bird() {
  yield "🐦";
  yield "❤️";
}

async function *Robot() {
  yield "🤖";
  yield "🤳";
}

async function *Component() {
  for await (const [horse, bird, robot] of union([
    Horse(),
    Bird(),
    Robot()
  ])) {
    console.log({ horse, bird, robot })
    yield [horse, bird, robot];
  }
}

export const _804_IterableUnion = (
  <Component />
)
export const _804_URL = import.meta.url;
export const _804_Info = {
  producesOutput: true
}
