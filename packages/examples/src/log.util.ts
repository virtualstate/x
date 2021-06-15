import {VNode} from "@virtualstate/fringe";
// import {createHook} from "async_hooks";
// import {performance} from "perf_hooks";

export function getExampleNameFromKey(exampleKey: string) {
  return exampleKey
    .split("_")
    .filter(Boolean)
    .slice(1)
    .join(" ")
    .trim();
}

export async function log(node: VNode, looping = false, main = false) {
  const types = new Map();
  let count = 0n;
  let resolved = 0n;
  // const hook = createHook({
  //   init(asyncId, type) {
  //     count += 1n;
  //     types.set(type, (types.get(type) || 0n) + 1n);
  //   },
  //   promiseResolve(asyncId) {
  //     resolved += 1n;
  //   }
  // });

  // if (main) {
  //   hook.enable();
  //   performance.mark('A');
  // }

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


  // if (main) {
  //   hook.disable();
  //   performance.mark('B');
  //   performance.measure(`A to B`, 'A', 'B');
  //   console.log({ count, resolved, types });
  // }
}
