# [@virtualstate/x](http://npmjs.com/package/@virtualstate/x) 

> _Bring your own_ JavaScript tooling

### Test Coverage

[//]: # (badges)

![nycrc config on GitHub](https://img.shields.io/nycrc/virtualstate/x) ![87.85%25 lines covered](https://img.shields.io/badge/lines-87.85%25-brightgreen) ![87.85%25 statements covered](https://img.shields.io/badge/statements-87.85%25-brightgreen) ![67.51%25 functions covered](https://img.shields.io/badge/functions-67.51%25-yellow) ![83.11%25 branches covered](https://img.shields.io/badge/branches-83.11%25-brightgreen) ![100%25 branchesTrue covered](https://img.shields.io/badge/branchesTrue-100%25-brightgreen)

[//]: # (badges)

## About

`@virtualstate/x` (or vsx) provides baseline functionality to enable a wide range of 
solutions for JavaScript based services, user interfaces, or scripts. 

The core module [`@virtualstate/fringe`](https://github.com/virtualstate/x/tree/main/packages/fringe) provides a `jsx` interface to enable developer
driven definitions, workflows, transitions, and logic, while providing consistent
a inline async resolution interface. 

By default, all JavaScript patterns can be utilised within the base tooling, and 
it is up to individual implementations to decide on finer details, for example 
if your project needs copy node trees into a [web page's DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
or if your individual component (or entire site?) could be rendered as a static string, 
these code paths will need to be decided on, as there is no one size fits all.

> If you want to get started, fork or clone the 
> [virtualstate.dev](https://github.com/virtualstate/virtualstate.dev)
> repository for an already set up project. 
> 
> It utilises [@virtualstate/dom's render function](https://github.com/virtualstate/virtualstate.dev/blob/main/src/index.tsx#L22) to 
> render a tree into the documents body in page, while also [doing the same in a prerender step](https://github.com/virtualstate/virtualstate.dev/blob/38bde3c370ebaf72b1a5ed1548f0f3a58ceb26c2/scripts/prerender.js#L47) to
> allow for static loading of pages where JavaScript is not available.

## Running Examples

There is a bunch of different examples available in [packages/examples](https://github.com/virtualstate/x/tree/main/packages/examples) see:

> If you have a code example you would like to share and it utilises one of the packages provided by this repository, you're very welcome to [fork this repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo) and raise a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) with your example!

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

The `h` function provides [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) functionality to your code. 

If you are utilising TypeScript, in your `tsconfig.config.json` you will need to add to `compilerOptions` the
keys `jsx`, `jsxFactory`, and `jsxFragmentFactory`:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h",
    "jsxFragmentFactory": "createFragment"
  }
}
```

If you are using a JavaScript build tool like [Snowpack](https://www.snowpack.dev/)
you may also need to add JSX related configuration, e.g. [`"jsxFactory": "h"`](https://www.snowpack.dev/reference/configuration#buildoptionsjsxfactory) and
[`"jsxFactory": "createFragment"`](https://www.snowpack.dev/reference/configuration#buildoptionsjsxfragment)

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

> Psst, the VNode type can be found at [packages/frings/src/vnode.ts](https://github.com/virtualstate/x/blob/main/packages/fringe/src/vnode.ts)

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

> Psst, new documentation is expected here [completely static nodes can be read in a completely static way]()
> however this is a bit more specific to use
> 
> An example of this can be found at [packages/examples/static](https://github.com/virtualstate/x/blob/a450413207532f8202279bd6a032a2a89df68940/packages/examples/src/examples/static/static.tsx#L16)
> where `children` is accessed like `const [thread, spikeyCactus, cactus, scroll] = node.children;` 

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

Union provides direct async resolution of multiple async iterators, for example
the returned type of `h(...).children` has an async iterator that produces
values that represents groups of output state, these groups need to be chopped up
into workable sync units. 

`union` does this by resolving in the best case all known iterators in under a single microtask,
or at the works case, at least one iterator resolution, after the microtask cut off point. 

Using `union` a developer can treat a group of values with async iterators
as single unit with all async resolution abstracted away to within.

Below are some demos/examples that display patterns accessible through `union`.
Feel free to add your own!

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
