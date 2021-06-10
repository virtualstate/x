import * as Examples from "./examples";
import {isVNode, VNode} from "@virtualstate/fringe";
import { h } from "./jsx";

async function log(node: VNode, looping = false) {
  console.log(node);
  const children = node.children;
  if (!children) return;
  console.group("Starting Logging children:");
  console.log("===========================");

  let loops = 0;
  for await (const updates of children) {
    loops += 1;
    console.log(`${updates.length} Child${updates.length === 1 ? "" : "ren"}:`);
    for (const child of updates) {
      await log(child);
    }
    console.log("===========================");

    if (looping && loops >= 2) {
      break;
    }
  }
  console.groupEnd();
}


for (const exampleKey in Examples) {
  const example = Examples[exampleKey];
  if (!isVNode(example)) continue;
  const name = exampleKey
    .replace(/^_[A-Z]+\d+_/, "")
    .replace(/_/g, " ")
    .replace(/([A-Z])/g,  " $1")
    .trim()
  console.log(`Example: ${name}\n`);
  await log(example, exampleKey.includes("Loop"));
  console.log("");
}


export default 1;
export const isLog = 1;
