# union

[CodeSandbox Demo 1](https://codesandbox.io/s/interesting-yalow-hh5ow?file=/src/index.ts:809-880)
[CodeSandbox Demo 2](https://codesandbox.io/s/cool-snow-z6ese?file=/src/index.ts)

Take a set of async iterations and turn them into an array of the latest values for that iterator.

This is the general function signature to achieve this:

```typescript
export type Input<T> = AsyncIterable<T> | Iterable<T>;
export type UnionInput<T> = Input<Input<T>>;
export async function *union<T>(input: UnionInput<T>): AsyncIterable<(T | undefined)[]> {
```

This allows us to take multiple functions producing values and group an update set together.

```typescript
import { union } from "@virtualstate/union";

for await (const set of union([[1, 2, 3, 4], [5, 6, 7, 8, 9]])) {
    console.log(set);
}
```

The above logs:

```
[ 1, 5 ]
[ 2, 6 ]
[ 3, 7 ]
[ 4, 8 ]
[ 4, 9 ]
```


