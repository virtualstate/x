import {RuntimeOptions} from "./runtime.options";

export interface NativeRuntimeOptions extends RuntimeOptions {

}

export function isNativeRuntimeOptions(options: RuntimeOptions): options is NativeRuntimeOptions {
  return !!(options.window && options.document);
}
