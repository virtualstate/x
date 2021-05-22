import { union } from "./union";
import { asAsync, Input } from "./async";

export interface ComposeFn<T, R> {
  (input: AsyncIterable<T>): AsyncIterable<R>;
}

export async function *compose<T, I extends Input<T>, R>(fn: ComposeFn<T, R>, ...streams: I[]): AsyncIterable<R[]> {
  yield *union(input());

  async function *input(): AsyncIterable<AsyncIterable<R>> {
    for (const stream of streams) {
      yield fn(asAsync(stream));
    }
  }
}
