// @ts-ignore
import { Document } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { render } from "./dom";
import { h } from "./x/fringe";

const document = new Document();

async function *App() {
  yield h("p", {}, "Loading");
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
  yield h("p", {}, "Hello Async World!", h("pre", {}, JSON.stringify(user, undefined, "  ")));
}
const app = h(App);
await render(app, document.body);
