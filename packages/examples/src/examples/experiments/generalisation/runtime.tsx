import {RuntimeOptions} from "./runtime.options";
import {h, VNode} from "@virtualstate/fringe";

export async function Runtime(options: RuntimeOptions, input?: VNode) {
  if ((await import("./runtime.browser.options")).isBrowserRuntimeOptions(options)) {
    const { Runtime } = await import("./runtime.browser");
    return <Runtime {...options}>{input}</Runtime>;
  } else if ((await import("./runtime.native.options")).isNativeRuntimeOptions(options)) {
    const { Runtime } = await import("./runtime.native");
    return <Runtime {...options}>{input}</Runtime>;
  }
  return input;
}
