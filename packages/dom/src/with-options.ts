export function withOptions<T, N, O>(options: T, input: (options: T, node: N) => O): (node: N) => O {
  return (node) => input(options, node);
}
