import {VNode} from "@virtualstate/fringe";
import {IsStaticSymbol} from "./examples";
// import {createHook} from "async_hooks";
// import {performance} from "perf_hooks";

export function getEnv(): Record<string, string | undefined> {
  if (typeof process === "undefined") {
    return getImportEnv();
  }
  return process.env;

  function getImportEnv() {
    const meta = import.meta;
    return isEnv(meta) ? meta.env : {};

    function isEnv(meta: unknown): meta is { env: ReturnType<typeof getEnv> } {
      function isLike(meta: unknown): meta is { env: unknown } {
        return !!meta;
      }
      return isLike(meta) && !!meta.env;
    }
  }
}

export function isWantedExampleKey(exampleKey: string) {
  const {
    EXAMPLES_MATCH: match
  } = getEnv();
  if (!match) return true;
  const regex = new RegExp(match);
  return regex.test(exampleKey);
}

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
  if (node[IsStaticSymbol]) {
    console.log("Static Node");
  }
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
