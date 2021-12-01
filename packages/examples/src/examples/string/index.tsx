import {
  toString,
  f,
  createFragment,
  ToStringIsScalar,
  ToStringGetBody,
  VNode,
  ToStringUseSource, ToStringGetFooter, ToString, ToStringCache
} from "@virtualstate/fringe";

const context = {
  [ToStringCache]: new WeakMap(),
  [ToStringIsScalar]: node => node.scalar && !["script"].includes(node.source),
  // If we have a script, we want to force a body to exist
  [ToStringGetBody]: (node, body) => body || (["script"].includes(node.source) ? "\n" : ""),
  toString
} as const;

function h(...args: unknown[]) {
  const node = f(...args);
  assign(node, context);
  return node;
  function assign<T, U>(left: T, right: U): asserts left is T & U {
    Object.assign(left, right);
  }
}

const link = Object.assign(h("<link rel='prefetch' href='index.tsx'>"), {
  [ToStringUseSource]: true
})

const link2 = Object.assign(<link rel="prefetch" href="index.tsx" />, {
  [ToStringGetFooter]: () => ">",
  scalar: false
})

const loading = Object.assign(<p />, {
  async *[ToString]() {
    console.log("Loading content")
    yield "<p>Loading</p>";
    yield "<p>Loaded</p>";
  }
})

// The first call to

async function MyWebsite() {
  // This is our cache
  const cache = new WeakMap();

  const node = { ...h("p", { class: "test" }, "content"), toString, [ToStringCache]: cache };

  // first cache will be empty, value will be undefined
  const cached0 = cache.get(node);
  // invoke will set the cache
  const string1 = await node.toString();
  // then we will have a value cached
  const cached1 = cache.get(node);
  // meaning we will not need to re-compute our toString
  const string2 = await node.toString();
  // We could use a new cache if we wanted to recompute for sure
  const recompute = await ({ ...node, [ToStringCache]: new WeakMap() }).toString()
  const results = { cached0, string1, cached1, string2, recompute };
  return (
    <html>
      <head>
        <title>My Website</title>
        {link}
        {link2}
        <results>{Object.keys(results)
          .map(key => h(key, {}, {...h("p"), [ToString]: () => results[key] }))}</results>
      </head>
      <body>
        <h1>Hello!</h1>
        <main>
          <p key="huh">Content here</p>
          <p attr={false} other={true} value={1} one="two">Content there</p>
          {loading}
          {loading}
        </main>
        <footer>
          <a href="https://example.com" target="_blank">example.com</a>
        </footer>
        <script type="module" src="index.js"></script>
      </body>
    </html>
  )
}

async function Render() {
  const node = <MyWebsite />;
  // for await (const iteration of node.toString()) {
  //   console.log({ iteration });
  // }
  return node.toString();
}

export const _Z0001_StringWebsite = <Render />
export const _Z0001_URL = import.meta.url;
