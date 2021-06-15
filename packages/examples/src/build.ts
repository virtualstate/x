import * as Examples from "./examples";
import {isVNode} from "@virtualstate/fringe";
import {dirname, join} from "path";
import {promises as fs} from "fs";
import {getExampleNameFromKey} from "./log.util";

// const obs = new PerformanceObserver((items) => {
//   console.log(items.getEntries());
//   performance.clearMarks();
// });
// obs.observe({ entryTypes: ['measure'] });

async function build(exampleKey: string) {
  const id = exampleKey.split("_").find(Boolean);
  const urlString = Examples[`_${id}_URL`];
  if (typeof urlString !== "string") {
    throw new Error(`${id} has no URL defined`);
  }
  const url = new URL(urlString);
  const output = await fs.readFile(url.pathname, "utf8");
  const source = (
    await fs.readFile(
      url.pathname
        .replace(/(packages\/[^\/]+\/)lib/, "$1src")
        .replace(/\.js$/, ".tsx"),
      "utf8")
  );
  const cleanerSource = source
    // Replace any unknown types, for clarity
    .replace(/: unknown/g, "")
    .replace(/^export const _[A-Z]*\d+_URL.+$/gm, "")
    .replace(/^(export const )_[A-Z]*\d+_[A-Z]+( =.+)$/igm, "$1Example$2")

  /*
  ${JSON.stringify({
    exportedAs: exampleKey,
    id,
    name: getExampleNameFromKey(exampleKey),
    source,
    output,
    cleanerSource
  }, undefined, "  ")}
   */

  return `export const _${id}_ExampleInformation: ExampleInformation = {
    name: ${JSON.stringify(getExampleNameFromKey(exampleKey))},
    id: ${JSON.stringify(id)},
    exportedAs: ${JSON.stringify(exampleKey)},
    source: ${JSON.stringify(source)},
    output: ${JSON.stringify(output)},
    cleanerSource: ${JSON.stringify(cleanerSource)},
    import: async (): Promise<VNode> => {
      const module = await import("./examples");
      return module.${exampleKey};
    }
  }`;
}

const parts: string[] = [];
for (const exampleKey in Examples) {
  const example = Examples[exampleKey];
  if (!isVNode(example)) continue;
  const name = getExampleNameFromKey(exampleKey);
  console.log(`Building: ${name}`);
  const part = await build(exampleKey);
  parts.push(part);
}

const information = `
import { VNode } from "@virtualstate/fringe";

export interface ExampleInformation {
  name: string;
  id: string;
  exportedAs: string;
  source: string;
  output: string;
  cleanerSource: string;
  import(): Promise<VNode>
}

${parts.join("\n")}
`;

await fs.writeFile(
  join(dirname(new URL(import.meta.url).pathname), "../src/information.built.ts"),
  information
);

export default 2;
export const isBuild = 1;
