import * as Examples from "./examples";
import {isVNode, VNode} from "@virtualstate/fringe";
import { h } from "./jsx";
import { PerformanceObserver, performance } from "perf_hooks";
import {createHook} from "async_hooks";

// const obs = new PerformanceObserver((items) => {
//   console.log(items.getEntries());
//   performance.clearMarks();
// });
// obs.observe({ entryTypes: ['measure'] });

async function build(node: VNode, looping = false, main = false) {
  const types = new Map();
  let count = 0n;
  let resolved = 0n;
  const hook = createHook({
    init(asyncId, type) {
      count += 1n;
      types.set(type, (types.get(type) || 0n) + 1n);
    },
    promiseResolve(asyncId) {
      resolved += 1n;
    }
  });

  if (main) {
    hook.enable();
    performance.mark('A');
  }

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
      await build(child);
    }
    console.log("===========================");

    if (looping && loops >= 2) {
      break;
    }
  }
  console.groupEnd();

  if (main) {
    hook.disable();
    performance.mark('B');
    performance.measure(`A to B`, 'A', 'B');
    console.log({ count, resolved, types });
  }
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
  await build(example, exampleKey.includes("Loop"), true);
  console.log("");
}

export default 2;
export const isBuild = 1;
