import {h, a, createFragment, VNode, createToken} from "@virtualstate/x";
import { read } from "./read";

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
