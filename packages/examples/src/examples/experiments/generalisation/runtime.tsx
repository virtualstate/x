import {RuntimeOptions} from "./runtime.options";
import {h, isTokenVNodeFn, isVNode, TokenConstructor, TokenVNodeFn, VNode} from "@virtualstate/fringe";
import {Call, DefaultValue, Identity, isOptions} from "./domain";

async function Input(options: RuntimeOptions, input?: VNode) {
  if ((await import("./runtime.browser.options.js")).isBrowserRuntimeOptions(options)) {
    const { Runtime } = await import("./runtime.browser.js");
    return <Runtime {...options}>{input}</Runtime>;
  } else if ((await import("./runtime.native.options.js")).isNativeRuntimeOptions(options)) {
    const { Runtime } = await import("./runtime.native.js");
    return <Runtime {...options}>{input}</Runtime>;
  }
  return input;
}

export async function *Runtime(options: RuntimeOptions, input?: VNode) {
  const space = new WeakMap();
  for await (const children of (<Input {...options}>{input}</Input>).children) {
    const tokens = children.filter(isTokenVNodeFn);
    if (!tokens.length) {
      yield children;
      continue;
    }
    yield children.concat(await run(tokens));
  }

  async function run(tokens: TokenVNodeFn[]): Promise<VNode[]> {
    const commit = await tokens.reduce(async (promise, token) => {
      return promise.then(async (commit) => {
        if (!isOptions(token.options)) return promise;
        const identity: object = token[Identity] ? token[Identity]() : token[TokenConstructor];
        const currentValue =
          space.get(identity) ??
          token.options[DefaultValue];
        const nextValue = await token.options[Call](currentValue);
        return commit.concat(() => {
          space.set(identity, nextValue);
          if (isVNode(nextValue)) {
            return nextValue
          }
        });
      });
    }, Promise.resolve<(() => VNode | undefined)[]>([]));
    return commit
      .map(fn => fn())
      .filter(Boolean);
  }
}
