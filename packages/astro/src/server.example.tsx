import { VNode } from "@virtualstate/fringe";
import Server from "./server";
import { h } from "./h";

export const { renderToStaticMarkup } = Server;

export function Inner(options?: unknown, child?: VNode) {
  console.log("Inner", options, child);
  const node = (
    <div
      class="inner"
    >
      <button
        type="button"
      >
        Hello!
      </button>
      <p
        class="content"
      >
        {child || "Content"}
      </p>
    </div>
  );
  console.log({ inner: node });
  return node;
}

export const innerStatic = await renderToStaticMarkup(Inner, {}, "");

export function Layout(options?: unknown, child?: VNode) {
  console.log("Layout", options, child);
  return (
    <div
      class="layout"
    >
      {child}
    </div>
  )
}

export const layoutStatic = await renderToStaticMarkup(Layout, {}, innerStatic);

console.log({
  innerStatic,
  layoutStatic
});

