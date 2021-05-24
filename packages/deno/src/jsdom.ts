import * as JSDOM from "jsdom";
import { render } from "./dom";
import { h } from "./x/fringe";
import {isElement} from "@virtualstate/dom";

const dom = new JSDOM.JSDOM();
const document = dom.window.document;

async function *Message() {
  yield h("p", {}, "Loading");
  await new Promise(resolve => setTimeout(resolve, 1000));
  yield h("p", {}, "Hello Deno!");
}

function App() {
  return h("main", {}, h(Message));
}
const app = h(App);

const root = document.createElement("div");
document.body.appendChild(root);

console.log(isElement(root));

await render(app, root);

console.log(document.body.innerHTML);
