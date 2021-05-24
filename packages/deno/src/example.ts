// @ts-ignore
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { render } from "./dom";
import { h } from "./x/fringe";
import {isElement} from "@virtualstate/dom";

const document = new DOMParser().parseFromString("<body />", "text/html");

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
