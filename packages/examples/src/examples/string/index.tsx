import {toString, f, createFragment, ToStringIsScalar, ToStringGetBody, VNode} from "@virtualstate/fringe";

const context = {
  [ToStringIsScalar]: node => node.scalar && !["script"].includes(node.source),
  // If we have a script, we want to force a body to exist
  [ToStringGetBody]: (node, body) => body || (["script"].includes(node.source) ? "\n" : ""),
  toString
} as const;

function h(...args: unknown[]) {
  const node = f(...args);
  assign(node);
  return node;
  function assign(node: VNode): asserts node is typeof context & VNode {
    Object.assign(node, context);
  }
}

function MyWebsite() {
  return (
    <html>
      <head>
        <title>My Website</title>
      </head>
      <body>
        <h1>Hello!</h1>
        <main>
          <p key="huh">Content here</p>
          <p attr={false} other={true} value={1} one="two">Content there</p>
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
  const node: ReturnType<typeof h> = <MyWebsite />;
  // for await (const iteration of node.toString()) {
  //   console.log({ iteration });
  // }
  return node.toString();
}

export const _Z0001_StringWebsite = <Render />
export const _Z0001_URL = import.meta.url;
