// @ts-ignore
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { render } from "./dom";
import { h, ChildrenSource } from "./x/fringe";

const document = new DOMParser().parseFromString("<body />", "text/html");

async function AsyncFn() {
  return new Promise(resolve => setTimeout(resolve, 200, h("p", {}, "Async Result! 🐸")));
}

const Page = h("main", { attributes: { class: "main" } },
  h("main", { }, h("h1", {}, "Hello Deno!"), h(AsyncFn)),
)

const app = h(Page);

const root = document.createElement("div");
document.body.appendChild(root);

await render(app, root);

console.log(document.body.innerHTML.split("><").join(">\n<"));

export default true;
export const example = true;
