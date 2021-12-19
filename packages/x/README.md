# [@virtualstate/x](http://npmjs.com/package/@virtualstate/x) 

[//]: # (badges)

![nycrc config on GitHub](https://img.shields.io/nycrc/virtualstate/x) ![87.84%25 lines covered](https://img.shields.io/badge/lines-87.84%25-brightgreen) ![87.84%25 statements covered](https://img.shields.io/badge/statements-87.84%25-brightgreen) ![67.32%25 functions covered](https://img.shields.io/badge/functions-67.32%25-yellow) ![83.15%25 branches covered](https://img.shields.io/badge/branches-83.15%25-brightgreen)

[//]: # (badges)

> If you want to get started, fork or clone the 
> [virtualstate.dev](https://github.com/virtualstate/virtualstate.dev)
> repository for an already set up project. 

## Running Examples

To run the examples located at [packages/examples](https://github.com/virtualstate/x/tree/main/packages/examples) see:

- [Deno](#running-examples-with-deno)
- [Node](#running-examples-with-node)
- [npx](#running-examples-with-npx)

### Running examples with Deno 

```bash 
deno run \                                                                                                                                                                                             *[main] 
  --import-map=https://cdn.skypack.dev/@virtualstate/deno/import-map.json \
  --allow-net \
  https://cdn.skypack.dev/@virtualstate/examples/lib/log.js
```

### Running examples with Node

```bash 
git clone https://github.com/virtualstate/x.git 
cd x 
yarn
yarn build
yarn examples:log
```

### Running examples with npx

```bash
npx @virtualstate/examples@^2.14.10 
```

## [`h`](http://npmjs.com/package/@virtualstate/fringe)

[Demo Usage](https://github.com/fabiancook/fabiancook.dev)

```typescript
import { h, createFragment } from "@virtualstate/x";

async function AsyncExample() {
  return await new Promise(
    resolve => setTimeout(resolve, 1500, `Async result: ${Math.random()}`)
  );
}

async function *Loading(options: unknown, child: VNode) {
  yield <>Loading!</>;
  yield child;
}

export async function InitialExample() {
  return (
    <div class="output">
      <h3>
        This is an example of various
        capabilities of this pattern
      </h3>
      <pre>
        <Loading>
          <AsyncExample />
        </Loading>
      </pre>
    </div>
  )
}
```

### Working with a virtual node

[Related Blog Post](https://fabiancook.dev/2021/05/23/rendering)

The returned of `h` is a `VNode`:

```typescript
export interface VNode {
  source: unknown;
  options?: object;
  children?: AsyncIterable<VNode[]>;
}
```

Scalar nodes created with `h` will be returned directly

```typescript
import { h } from "@virtualstate/x";

const node = h(1);
const { source: one } = node;
console.log({ one }); // Logs { one: 1 }
```

Any scalar nodes with `h` that have children can be read using `for await`

```typescript

const first = h("first");
const second = h("second");
const third = h("third");
const node = h("result", {}, first, second, third);

const { source: result, children } = node;
console.log({ result }); // Logs { result: "result" }

if (!children) throw new Error("Expected children");

for await (const results of children) {
  // Eventually Logs { results: ["first", "second", "third" ] }
  console.log({ results: results.map(node => node.source) });
}
```

Any function type can be used as a virtual node

```typescript
import { h } from "@virtualstate/x";

function Fn() {
  return "Function ✨";
}
async function AsyncFn() {
  await new Promise<void>(queueMicrotask);
  return "Async Function 💡";
}
function *GeneratorFn() {
  yield "GeneratorFn Loading";
  yield "GeneratorFn 💥";
}
async function *AsyncGeneratorFn() {
  yield "AsyncGeneratorFn Loading";
  yield "AsyncGeneratorFn 🔥";
}
function Fns() {
  return [
    h(Fn),
    h(AsyncFn),
    h(GeneratorFn),
    h(AsyncGeneratorFn)
  ]
    .map(node => f("fn", { name: node.source.name }, node.source.name, node));
}

const { children } = f(Fns);

if (!children) throw new Error("Expected children");

for await (const results of children) {
  // Eventually Logs { results: ["Fn", "AsyncFn", "GeneratorFn", "AsyncGeneratorFn" ] }
  console.log({ results: results.map(node => node.options.name) });
}
```

## [`union`](http://npmjs.com/package/@virtualstate/union)

- [CodeSandbox Demo 1](https://codesandbox.io/s/interesting-yalow-hh5ow?file=/src/index.ts:809-880)
- [CodeSandbox Demo 2](https://codesandbox.io/s/cool-snow-z6ese?file=/src/index.ts)

```typescript
import { union } from "@virtualstate/x";

async function wait(ms = 10) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function* left() {
  yield "Left 1";
  await wait(19);
  yield "Left 2";
  await wait(401);
  yield "Left 3";
}

function* middle() {
  yield "Middle 1";
  yield "Middle 2";
  yield "Middle 3";
}

async function* right() {
  yield "Right 1";
  await wait(401);
  yield "Right 2";
  yield "Right 3";
  await wait(19);
  yield "Right 4";
}

for await (const [leftResult, middleResult, rightResult] of union([
  left(),
  middle(),
  right()
])) {
  const result = { leftResult, middleResult, rightResult };
  console.log(result);
  document.body.innerHTML = JSON.stringify(result, undefined, "  ");
}
```

## Discord

Interested in talking more about the project? Find us on [Discord](https://discord.gg/E2K6Q9QH6A)

## Contributing

Please see [Contributing](./CONTRIBUTING.md)

## Code of Conduct 

This project and everyone participating in it is governed by the [Code of Conduct listed here](./CODE-OF-CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@fabiancook.dev](mailto:conduct@fabiancook.dev).

## Licence

This repository is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.
