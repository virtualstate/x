# [@virtualstate/x](http://npmjs.com/package/@virtualstate/x)

## [`union`](http://npmjs.com/package/@virtualstate/union)

[CodeSandbox Demo](https://codesandbox.io/s/interesting-yalow-hh5ow?file=/src/index.ts:809-880)

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
  return "Function";
}
async function AsyncFn() {
  await new Promise(queueMicrotask);
  return "Async Function";
}
function *GeneratorFn() {
  yield "GeneratorFn Loading";
  yield "GeneratorFn";
}
async function *AsyncGeneratorFn() {
  yield "AsyncGeneratorFn Loading";
  yield "AsyncGeneratorFn";
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



