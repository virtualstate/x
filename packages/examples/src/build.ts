import * as Examples from "./examples";
import {isVNode, VNode} from "@virtualstate/fringe";
import {dirname, join} from "path";
import {promises as fs} from "fs";

// const obs = new PerformanceObserver((items) => {
//   console.log(items.getEntries());
//   performance.clearMarks();
// });
// obs.observe({ entryTypes: ['measure'] });

async function build(node: VNode, key: string, looping = false, main = false) {
  const id = key.split("_").find(Boolean);
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
    .replace(/^export const _[A-Z]*\d+_URL.+$/gm, "")
    .replace(/^(export const )_[A-Z]*\d+_(.+)$/gm, "$1$2")

  return `export const _${id}_ExampleInformation = ${JSON.stringify({
    key,
    source,
    output,
    cleanerSource
  }, undefined, "  ")}`;
}

const parts: string[] = [];
for (const exampleKey in Examples) {
  const example = Examples[exampleKey];
  if (!isVNode(example)) continue;
  const name = exampleKey
    .replace(/^_[A-Z]+\d+_/, "")
    .replace(/_/g, " ")
    .replace(/([A-Z])/g,  " $1")
    .trim()
  console.log(`Building: ${name}`);
  const part = await build(example, exampleKey, exampleKey.includes("Loop"), true);
  parts.push(part);
}

const information = `// @ts-ignore
${parts.join("\n")}
`;

await fs.writeFile(
  join(dirname(new URL(import.meta.url).pathname), "../src/information.built.ts"),
  information
);

export default 2;
export const isBuild = 1;
