import * as JSDOM from "jsdom";
import { render } from "./dom";
import {ChildrenSource, h} from "./x/fringe";
import {isElement} from "@virtualstate/dom";

const dom = new JSDOM.JSDOM();
const document = dom.window.document;

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

console.log(isElement(root));

await render(app, root);

console.log(document.body.innerHTML);

export default true;
export const example = true;
