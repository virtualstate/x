import { h, createFragment } from "@virtualstate/fringe";
import { extendedIterable as i } from "iterable";

function *source(): Iterable<number> {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

function Iterable() {
  return (
    <>
      {
        i(source())
          .skip(1)
          .take(3)
          .map(value => value * 5)
      }
    </>
  );
}

export const _802_IterableFunction = <Iterable />
export const _802_URL = import.meta.url;
