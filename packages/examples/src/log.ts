import * as Examples from "./examples";
import {isVNode, VNode} from "@virtualstate/fringe";

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
  console.log(`Example: ${exampleKey.replace(/^_\d+_/, "").replace(/([A-Z])/g,  " $1").trim()}\n`);
  await log(example, exampleKey.includes("Loop"));
  console.log("");
}
