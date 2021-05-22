import { compose } from "../compose";

for await (const result of compose(process, [1, 2, 3, 4, 5], [6, 7, 7, 9])) {
  console.log({ result });
}

async function *process(input: AsyncIterable<number>): AsyncIterable<IteratorResult<void>> {
  yield { done: false, value: undefined };

  // ???
  for await (const value of input) {
    console.log({ value });
  }

  yield { done: true, value: undefined };
}
