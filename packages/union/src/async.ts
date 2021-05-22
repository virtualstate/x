export type Input<T> = AsyncIterable<T> | Iterable<T>;

export async function *asAsync<T>(iterable: Input<T>): AsyncIterable<T> {
  yield* iterable;
}
