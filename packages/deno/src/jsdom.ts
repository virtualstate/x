import * as JSDOM from "jsdom";
import { render } from "./dom";
import { h } from "./x/fringe";
import {isElement} from "@virtualstate/dom";

const dom = new JSDOM.JSDOM();
const document = dom.window.document;

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
