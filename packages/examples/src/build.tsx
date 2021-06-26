import * as Examples from "./examples";
import {isVNode, h, VNode} from "@virtualstate/fringe";
import {dirname, join, relative, basename} from "path";
import {promises as fs} from "fs";
import {getExampleNameFromKey} from "./log.util";
import {Static} from "./examples";
import {readAllDrain} from "./examples/transform/read";

// const obs = new PerformanceObserver((items) => {
//   console.log(items.getEntries());
//   performance.clearMarks();
// });
// obs.observe({ entryTypes: ['measure'] });

async function isFile(file: string): Promise<boolean> {
  try {
    return (await fs.stat(file)).isFile();
  } catch {
    return false;
  }
}

async function recreate(node: VNode, known = new WeakMap<object, Promise<string>>()): Promise<string> {
  if (node.scalar) {
    return `{${getSourceValue(node.source)}}`;
  }
  const knownPromise = known.get(node) || (typeof node.source === "function" ? known.get(node.source) : undefined);
  if (knownPromise) {
    return knownPromise;
  }
  const promise = doRecreate(node);
  known.set(node, promise);
  if (typeof node.source === "function") {
    known.set(node.source, promise);
  }
  return promise;

  async function doRecreate(node: VNode) {
    if (!node.children) {
      return `<${getChildrenHeaderStart(node)} />`
    }
    const parts = [];
    for await (const children of node.children) {
      if (parts.length) {
        console.warn("Expected single iteration static input");
        parts.length = 0;
      }
      const almost = await Promise.all(
        children.map(child => {

          if (known.has(child) || (typeof child.source === "function" && known.has(child.source))) {
            return `<${getChildrenHeaderStart(child)} />`
          }

          return recreate(child, known);
        })
      )
      if (!almost.length) {
        continue;
      }
      parts.push(
        ...almost
      );
    }
    if (!parts.length) {
      return `<${getChildrenHeaderStart(node)} />`
    }
    return [
      `<${getChildrenHeaderStart(node)}>`,
      // indent
      ...parts.map(indent),
      `</${getSource(node)}>`
    ].join("\n");
  }

  function getChildrenHeaderStart(node: VNode) {
    const source = getSource(node);
    const options = getOptionLines(node);
    if (options.length > 2) {
      return [
        `${source}`,
        ...options.map(indent),
        ""
      ].join("\n");
    }
    if (options.length) {
      return `${source} ${options.join(" ")} `
    }
    return `${source}`;
  }

  function indent(part: string): string {
    return part.split("\n").map(line => `  ${line}`).join("\n")
  }

  function getOptionLines(node: VNode): string[] {
    if (!node.options) {
      return [];
    }
    return Object.entries(
      node.options
    )
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key}=${JSON.stringify(value)}`;
        }
        return `${key}={${getSourceValue(value)}}`;
      });

  }

  function getSource(node: VNode): string {
    if (typeof node.source === "function") {
      return node.source.name;
    }
    if (typeof node.source === "string") {
      return node.source;
    }
    if (typeof node.source === "undefined") {
      return "";
    }
    if (typeof node.source === "symbol") {
      const key = Symbol.keyFor(node.source);
      if (key) {
        return key;
      } else {
        const string = String(node.source);
        const matched = string.match(/^Symbol\(([^)]+)\)$/);
        if (matched && matched[1]) {
          return matched[1];
        }
        return string;
      }
    }
    if (typeof node.source === "object") {
      return "";
    }
    throw new Error(`Unimplemented non scalar source type ${typeof node.source}`)
  }

  function getSourceValue(value: unknown): string {
    return typeof value === "symbol" ?
      //
      Symbol.keyFor(value) ? `Symbol.for(${JSON.stringify(Symbol.keyFor(value))})` : "Symbol()" :
      typeof value === "bigint" ?
        `${value}n` :
        JSON.stringify(value)
  }
}

async function build(exampleKey: string) {
  const id = exampleKey.split("_").find(Boolean);
  const urlString = Examples[`_${id}_URL`];
  if (typeof urlString !== "string") {
    throw new Error(`${id} has no URL defined`);
  }
  const url = new URL(urlString);
  const output = await fs.readFile(url.pathname, "utf8");

  let sourceFile =
    url.pathname
      .replace(/(packages\/[^\/]+\/)lib/, "$1src")
  const sourceTsxFile = sourceFile.replace(/\.js$/, ".tsx");
  if (await isFile(sourceTsxFile)) {
    sourceFile = sourceTsxFile;
  } else {
    sourceFile = sourceFile.replace(/\.js$/, ".ts");
  }

  const source = (
    await fs.readFile(
      sourceFile,
      "utf8"
    )
  );

  let cleanerSource = source;
  const baseCleanerSource = cleanerSource.split("\n");
  const infoIndex = baseCleanerSource.findIndex(value => /\d+_(Info|URL) =/.test(value));
  if (infoIndex > -1) {
    cleanerSource = baseCleanerSource.slice(0, infoIndex).join("\n");
  }
  cleanerSource = cleanerSource
    // Replace any unknown types, for clarity
    .replace(/: unknown/g, "")
    .replace(/^export const _[A-Z]*\d+_URL.+$/gm, "")
    .replace(/^(export const )_[A-Z]*\d+_[A-Z]+( =.+)$/igm, "$1Example$2");


  const buildUrl = new URL(import.meta.url);
  const buildDirectory = dirname(buildUrl.pathname);
  const sourceImport = relative(buildDirectory, url.pathname);
  const targetImport = `${dirname(sourceImport)}/${basename(sourceImport, ".js")}`

  const module = await import(`./${sourceImport}`);

  const staticNode = (
    <Static>
      {module[exampleKey]}
    </Static>
  )
  const looping = exampleKey.includes("Loop");
  if (!looping) {
    await readAllDrain(staticNode);
  }

  return `export const _${id}_ExampleInformation: ExampleInformation = {
    name: ${JSON.stringify(getExampleNameFromKey(exampleKey))},
    id: ${JSON.stringify(id)},
    exportedAs: ${JSON.stringify(exampleKey)},
    source: ${JSON.stringify(source)},
    output: ${JSON.stringify(output)},
    cleanerSource: ${JSON.stringify(cleanerSource)},
    structure: ${looping ? `""` : JSON.stringify(await recreate(staticNode))},
    import: async (): Promise<VNode> => {
      ${
      process.env.INCLUDE_IMPORT && !/[A-Z]/.test(id) ? `
      const module = await import("./${targetImport}");
      return module.${exampleKey};`.trim() : "throw new Error(`Not available`);"
      }
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
  structure: string;
  import?(): Promise<VNode>
}

${parts.join("\n")}
`;

await fs.writeFile(
  join(dirname(new URL(import.meta.url).pathname), "../src/information.built.ts"),
  information
);

export default 2;
export const isBuild = 1;
