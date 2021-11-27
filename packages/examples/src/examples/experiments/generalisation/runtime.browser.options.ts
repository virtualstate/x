import {RuntimeOptions} from "./runtime.options";

export interface BrowserRuntimeOptions extends RuntimeOptions {
  window?: Window;
  document?: Document;
}

export function isBrowserRuntimeOptions(options: RuntimeOptions): options is BrowserRuntimeOptions {
  return !!(options.window && options.document);
}
