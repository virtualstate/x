import { h, i, createFragment } from "@virtualstate/x";

const source: Iterable<number> = [
  1,
  2,
  3,
  4,
  5
];

function Iterable() {
  return (
    <>
      {
        i(source)
          .skip(1)
          .take(3)
          .map(value => value * 5)
      }
    </>
  );
}

export const _801_Iterable = <Iterable />
export const _801_URL = import.meta.url;
