import {h, a, createFragment, VNode, createToken} from "@virtualstate/x";
import { read } from "./read";
import {union} from "@virtualstate/union";

async function *ThingA() {
  yield "🐴";
  yield "💪";
}

async function *ThingB() {
  yield "🐦";
  yield "❤️";
}

async function *ThingC() {
  yield "🤖";
  yield "🤳";
}

async function *Union() {
  for await (const [a, b, c] of union([
    ThingA(),
    ThingB(),
    ThingC()
  ])) {
    console.log({ a, b, c })
    yield [a, b, c];
  }
}

export const _804_IterableUnion = (
  <Union />
)
export const _804_URL = import.meta.url;
export const _804_Info = {
  producesOutput: true
}
