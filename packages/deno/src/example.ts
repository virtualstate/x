// @ts-ignore
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { render } from "./dom";
import { h, ChildrenSource } from "./x/fringe";

const document = new DOMParser().parseFromString("<body />", "text/html");

const Page = h("main", { class: "main" },
  h("h1", {}, "This is my title"),
  h("section", { id: "intro" }, "This is my introduction"),
  h("main", { }, "Main body"),
  h("footer", { }, "Footer")
)

const children = Page.children[ChildrenSource];
console.log(children.map(node => node.source));

async function *App() {
  yield h("p", {}, "Loading");
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
  yield h("p", {}, "Hello Async World!", h("pre", {}, JSON.stringify(user, undefined, "  ")));
}
const app = h(App);

const root = document.createElement("div");
document.body.appendChild(root);

await render(app, root);

console.log(document.body.innerHTML);

export default true;
export const example = true;
