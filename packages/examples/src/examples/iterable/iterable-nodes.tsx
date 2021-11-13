import {h, createFragment, VNode, createToken} from "@virtualstate/fringe";
import { read } from "./read";
import { asyncExtendedIterable as a } from "iterable";

async function *Source() {
  yield "🐦";
  yield "❤️";
  yield "💪";
  yield "🦿";
}

const Box = createToken(Symbol("📦"));

function Iterable(o: unknown, state: VNode) {
  return (
    <>
      {
        a(read(state))
          .map(child => (
            <Box>
              {child}
            </Box>
          ))
      }
    </>
  );
}

export const _803_IterableVNode = (
  <Iterable>
    <Source />
  </Iterable>
)
export const _803_URL = import.meta.url;
