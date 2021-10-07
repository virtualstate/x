import * as Examples from "./examples";
import {isVNode, h, VNode, Fragment} from "@virtualstate/fringe";
import {dirname, join, relative} from "path";
import {promises as fs} from "fs";
import {getExampleNameFromKey} from "./log.util";
import {Static} from "./examples";
import {readAllDrain} from "./examples/transform/read";
import {EngineURLSymbol} from "./examples/compile-transform/source.engine";
import {SourceInterfaceURLSymbol} from "./examples/compile-transform/source.transform";

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

async function recreate(node: VNode, root: boolean, known = new WeakMap<object, Promise<string>>(), injectStrings = true): Promise<string> {
  if (!node.options && !node.children) {
    if (typeof node.source === "string" && !injectStrings) {
      return node.source;
    }
    const value = getSourceValue(node);
    if (root) {
      return value;
    }
    return `{${value}}`;
  }
  const knownPromise = known.get(node);
  if (knownPromise) {
    return knownPromise;
  }
  const promise = doRecreate(node, root);
  known.set(node, promise);
  return promise;

  async function doRecreate(node: VNode, root: boolean) {
    if (!node.children) {
      if (root) {
        return `"No output"`;
      }
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
          return recreate(child, false, known, injectStrings);
        })
      )
      parts.push(
        ...almost.filter(Boolean)
      );
    }
    if (root) {
      if (!parts.length) {
        return `"No output"`;
      }
      if (parts.length === 1) {
        return parts[0].replace(/^{(.+)}$/, "$1");
      }
      return [
        "<>",
        ...parts.map(indent),
        "</>"
      ].join("\n");
    }
    if (!parts.length) {
      return `<${getChildrenHeaderStart(node)} />`
    }
    if (node.reference === Fragment) {
      return parts.join("\n");
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
      return `${source} ${options.join(" ")}`
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
        return `${key}={${getSourceValue({ source: value, reference: 1 })}}`;
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
      return typeof node.reference === "symbol" ? symbol(node.reference) : node.reference.toString();
    }
    if (typeof node.source === "symbol") {
      return symbol(node.source);
    }
    if (typeof node.source === "object") {
      return "";
    }
    throw new Error(`Unimplemented non scalar source type ${typeof node.source}`)

    function symbol(value: symbol): string {
      const key = Symbol.keyFor(value);
      if (key) {
        if (!key.includes(" ")) {
          return key;
        }
        return `Symbol.for(${JSON.stringify(key)})`
      } else {
        const string = String(value);
        const stringKey = getSymbolKey(value);
        if (stringKey && !stringKey.includes(" ")) {
          return stringKey;
        }
        return string;
      }
    }
  }

  function getSymbolKey(symbol: symbol): string {
    const string = String(symbol);
    const matched = string.match(/^Symbol\(([^)]+)\)$/);
    if (matched && matched[1]) {
      return matched[1];
    }
    return undefined;
  }

  function getSourceValue(node: VNode): string {
    if (typeof node.source === "undefined") {
      return getString(node.reference);
    }
    return getString(node.source);

    function getString(value: unknown) {
      if (typeof value === "string" && !injectStrings) {
        return value;
      }
      if (value instanceof Set) {
        return `new Set()`
      }
      if (value instanceof Map) {
        return `new Map()`
      }
      return typeof value === "symbol" ?
        Symbol.keyFor(value) ? `Symbol.for(${JSON.stringify(Symbol.keyFor(value))})` : `Symbol(${JSON.stringify(getSymbolKey(value))})` :
        typeof value === "undefined" ?
          "undefined" :
        typeof value === "bigint" ?
          `${value}n` :
          JSON.stringify(value)
    }
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
  const targetImport = relative(buildDirectory, url.pathname);

  const module = await import(`./${targetImport}`);

  const staticNode = (
    <Static>
      {module[exampleKey]}
    </Static>
  )
  const looping = exampleKey.includes("Loop");
  if (!looping) {
    await readAllDrain(staticNode);
  }

  const info: Record<string | symbol, unknown> | undefined = module[`_${id}_Info`];
  const engineURL = hasEngine(info) ? info[EngineURLSymbol] : undefined;
  const sourceInterfaceURL = hasInterface(info) ? info[SourceInterfaceURLSymbol] : undefined;
  const engineImport = engineURL ? relative(buildDirectory, new URL(engineURL).pathname) : undefined;
  const sourceInterface = sourceInterfaceURL && (
    await fs.readFile(
      new URL(sourceInterfaceURL).pathname,
      "utf8"
    )
  );

  const nonLoopingStructure = !looping ? await recreate(staticNode, true, new WeakMap(), !exampleKey.includes("HTML")) : undefined;

  if (nonLoopingStructure) {
    console.log(nonLoopingStructure);
  }

  return `export const _${id}_ExampleInformation: ExampleInformation = {
    name: ${JSON.stringify(getExampleNameFromKey(exampleKey))},
    id: ${JSON.stringify(id)},
    exportedAs: ${JSON.stringify(exampleKey)},
    source: ${JSON.stringify(source)},
    sourceURL: ${JSON.stringify(url.toString().replace(process.cwd(), "/workspaces/x"))},
    output: ${JSON.stringify(output)},
    cleanerSource: ${JSON.stringify(cleanerSource)},
    structure: ${looping ? '""' : JSON.stringify(nonLoopingStructure)},
    info: ${module[`_${id}_Info`] ? JSON.stringify(module[`_${id}_Info`]) : "undefined"},
    engineURL: ${engineURL ? JSON.stringify(engineURL.toString().replace(process.cwd(), "/workspaces/x")) : "undefined"},
    sourceInterfaceURL: ${sourceInterfaceURL ? JSON.stringify(sourceInterfaceURL) : "undefined"},
    sourceInterface: ${sourceInterface ? JSON.stringify(sourceInterface) : "undefined"},
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      ${
      engineImport ? (`
      const { Engine, SourceURLSymbol, EngineURLSymbol, SourceSymbol, SourceInterfaceURLSymbol, SourceInterfaceSymbol } = await import("./${engineImport}");
      return h(
        Engine,
        {
          ..._${id}_ExampleInformation.info,
          ...context,
          [SourceURLSymbol]: _${id}_ExampleInformation.sourceURL,
          [EngineURLSymbol]: _${id}_ExampleInformation.engineURL,
          [SourceInterfaceURLSymbol]: _${id}_ExampleInformation.sourceInterfaceURL,
          [SourceInterfaceSymbol]: _${id}_ExampleInformation.sourceInterface,
          [SourceSymbol]: _${id}_ExampleInformation.source,
        },
        state
      );`.trim()
        ) : (
        process.env.INCLUDE_IMPORT && !/[A-Z]/.test(id) ? `
      const module = await import("./${targetImport}");
      return module.${exampleKey};`.trim() : `throw new Error("Not available");`
      )
    }
    }
}`;

  function hasEngine(value?: Record<typeof EngineURLSymbol, unknown>): value is { [EngineURLSymbol]: string } {
    return !!value && typeof value[EngineURLSymbol] === "string";
  }

  function hasInterface(value?: Record<typeof SourceInterfaceURLSymbol, unknown>): value is { [SourceInterfaceURLSymbol]: string } {
    return !!value && typeof value[SourceInterfaceURLSymbol] === "string";
  }
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
import { VNode, h, createFragment } from "@virtualstate/fringe";

export interface ExampleInformation {
  name: string;
  id: string;
  exportedAs: string;
  source: string;
  sourceURL: string;
  engineURL?: string;
  sourceInterfaceURL?: string;
  sourceInterface?: string;
  output: string;
  cleanerSource: string;
  structure: string;
  info?: Record<string, unknown>;
  import?(context?: Record<string, unknown>, state?: VNode): Promise<VNode>
}

${parts.join("\n")}
`;

await fs.writeFile(
  join(dirname(new URL(import.meta.url).pathname), "../src/information.built.ts"),
  information
);

export default 2;
export const isBuild = 1;
