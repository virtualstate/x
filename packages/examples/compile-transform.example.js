import { _CT0001_ExampleInformation } from "./lib/information.built.js";
import { AbortSignalSymbol } from "./lib/examples/compile-transform/source.engine.js";

const started = Date.now();

const abortController = new AbortController();

setTimeout(() => {
  abortController.abort();
}, 1000);

const container = await _CT0001_ExampleInformation.import({
  [AbortSignalSymbol]: abortController.signal
});

for await (const [{ source: state }] of container.children) {
  console.log({ state });
}

const completed = Date.now();

console.log(`Completed script in ${completed - started}ms`, { aborted: abortController.signal.aborted });

process.exit(1);
