import {
  toString,
  f,
  createFragment,
  ToStringIsScalar,
  ToStringGetBody,
  VNode,
  ToStringUseSource, ToStringGetFooter, ToString
} from "@virtualstate/fringe";

const context = {
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
    yield "<p>Loading</p>";
    yield "<p>Loaded</p>";
  }
})

function MyWebsite() {
  return (
    <html>
      <head>
        <title>My Website</title>
        {link}
        {link2}
      </head>
      <body>
        <h1>Hello!</h1>
        <main>
          <p key="huh">Content here</p>
          <p attr={false} other={true} value={1} one="two">Content there</p>
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
