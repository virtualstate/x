
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

export const _101_ExampleInformation: ExampleInformation = {
    name: "Scalar",
    id: "101",
    exportedAs: "_101_Scalar",
    source: "import { h } from \"@virtualstate/fringe\";\n\nexport const _101_Scalar = <example meta=\"🏉\" />\nexport const _101_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/scalar/scalar.js",
    output: "import { h } from \"@virtualstate/fringe\";\nexport const _101_Scalar = h(\"example\", { meta: \"\\uD83C\\uDFC9\" });\nexport const _101_URL = import.meta.url;\n//# sourceMappingURL=scalar.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nexport const Example = <example meta=\"🏉\" />",
    structure: "<example meta=\"🏉\" />",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _102_ExampleInformation: ExampleInformation = {
    name: "NumberScalar",
    id: "102",
    exportedAs: "_102_NumberScalar",
    source: "import { h } from \"@virtualstate/fringe\";\n\nexport const _102_NumberScalar = h(1);\nexport const _102_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/scalar/number-scalar.js",
    output: "import { h } from \"@virtualstate/fringe\";\nexport const _102_NumberScalar = h(1);\nexport const _102_URL = import.meta.url;\n//# sourceMappingURL=number-scalar.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nexport const Example = h(1);",
    structure: "1",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _103_ExampleInformation: ExampleInformation = {
    name: "BooleanScalar",
    id: "103",
    exportedAs: "_103_BooleanScalar",
    source: "import { h } from \"@virtualstate/fringe\";\n\nexport const _103_BooleanScalar = h(true);\nexport const _103_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/scalar/boolean-scalar.js",
    output: "import { h } from \"@virtualstate/fringe\";\nexport const _103_BooleanScalar = h(true);\nexport const _103_URL = import.meta.url;\n//# sourceMappingURL=boolean-scalar.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nexport const Example = h(true);",
    structure: "true",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _104_ExampleInformation: ExampleInformation = {
    name: "SymbolScalar",
    id: "104",
    exportedAs: "_104_SymbolScalar",
    source: "import { h } from \"@virtualstate/fringe\";\n\nexport const _104_SymbolScalar = h(Symbol(\"⚽\"));\nexport const _104_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/scalar/symbol-scalar.js",
    output: "import { h } from \"@virtualstate/fringe\";\nexport const _104_SymbolScalar = h(Symbol(\"⚽\"));\nexport const _104_URL = import.meta.url;\n//# sourceMappingURL=symbol-scalar.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nexport const Example = h(Symbol(\"⚽\"));",
    structure: "Symbol(\"⚽\")",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _105_ExampleInformation: ExampleInformation = {
    name: "ChildrenScalar",
    id: "105",
    exportedAs: "_105_ChildrenScalar",
    source: "import { h } from \"@virtualstate/fringe\";\n\nexport const _105_ChildrenScalar = (\n  <example meta=\"value\">\n    {h(\"🎲\")}\n  </example>\n)\nexport const _105_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/scalar/children-scalar.js",
    output: "import { h } from \"@virtualstate/fringe\";\nexport const _105_ChildrenScalar = (h(\"example\", { meta: \"value\" }, h(\"🎲\")));\nexport const _105_URL = import.meta.url;\n//# sourceMappingURL=children-scalar.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nexport const Example = (\n  <example meta=\"value\">\n    {h(\"🎲\")}\n  </example>\n)",
    structure: "<example meta=\"value\">\n  {\"🎲\"}\n</example>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _201_ExampleInformation: ExampleInformation = {
    name: "Function",
    id: "201",
    exportedAs: "_201_Function",
    source: "import { h } from \"@virtualstate/fringe\";\n\nconst moduleScoped = \"🐦\";\n\nfunction Component() {\n  const functionScoped = \"💡\";\n  return `${moduleScoped} ${functionScoped} 🔑`;\n}\n\nexport const _201_Function = <Component />\nexport const _201_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/function/function.js",
    output: "import { h } from \"@virtualstate/fringe\";\nconst moduleScoped = \"🐦\";\nfunction Component() {\n    const functionScoped = \"💡\";\n    return `${moduleScoped} ${functionScoped} 🔑`;\n}\nexport const _201_Function = h(Component, null);\nexport const _201_URL = import.meta.url;\n//# sourceMappingURL=function.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nconst moduleScoped = \"🐦\";\n\nfunction Component() {\n  const functionScoped = \"💡\";\n  return `${moduleScoped} ${functionScoped} 🔑`;\n}\n\nexport const Example = <Component />",
    structure: "\"🐦 💡 🔑\"",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _202_ExampleInformation: ExampleInformation = {
    name: "AsyncFunction",
    id: "202",
    exportedAs: "_202_AsyncFunction",
    source: "import { h } from \"@virtualstate/fringe\";\n\nasync function Component() {\n  return \"🎃\";\n}\n\nexport const _202_AsyncFunction = <Component />;\nexport const _202_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/function/async-function.js",
    output: "import { h } from \"@virtualstate/fringe\";\nasync function Component() {\n    return \"🎃\";\n}\nexport const _202_AsyncFunction = h(Component, null);\nexport const _202_URL = import.meta.url;\n//# sourceMappingURL=async-function.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nasync function Component() {\n  return \"🎃\";\n}\n\nexport const Example = <Component />;",
    structure: "\"🎃\"",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _203_ExampleInformation: ExampleInformation = {
    name: "GeneratorFunction",
    id: "203",
    exportedAs: "_203_GeneratorFunction",
    source: "import { h } from \"@virtualstate/fringe\";\n\nfunction *Component() {\n  yield \"🔑\";\n  yield \"🐸\";\n}\n\nexport const _203_GeneratorFunction = <Component />\nexport const _203_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/function/generator-function.js",
    output: "import { h } from \"@virtualstate/fringe\";\nfunction* Component() {\n    yield \"🔑\";\n    yield \"🐸\";\n}\nexport const _203_GeneratorFunction = h(Component, null);\nexport const _203_URL = import.meta.url;\n//# sourceMappingURL=generator-function.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nfunction *Component() {\n  yield \"🔑\";\n  yield \"🐸\";\n}\n\nexport const Example = <Component />",
    structure: "\"🐸\"",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _204_ExampleInformation: ExampleInformation = {
    name: "AsyncGeneratorFunction",
    id: "204",
    exportedAs: "_204_AsyncGeneratorFunction",
    source: "import { h } from \"@virtualstate/fringe\";\n\nasync function *Component() {\n  yield \"🐕\";\n  yield \"🐦\";\n}\n\nexport const _204_AsyncGeneratorFunction = <Component />;\nexport const _204_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/function/async-generator-function.js",
    output: "import { h } from \"@virtualstate/fringe\";\nasync function* Component() {\n    yield \"🐕\";\n    yield \"🐦\";\n}\nexport const _204_AsyncGeneratorFunction = h(Component, null);\nexport const _204_URL = import.meta.url;\n//# sourceMappingURL=async-generator-function.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nasync function *Component() {\n  yield \"🐕\";\n  yield \"🐦\";\n}\n\nexport const Example = <Component />;",
    structure: "\"🐦\"",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _205_ExampleInformation: ExampleInformation = {
    name: "LoopGeneratorFunction",
    id: "205",
    exportedAs: "_205_LoopGeneratorFunction",
    source: "import { h } from \"@virtualstate/fringe\";\n\nfunction *Component() {\n  yield \"💥\"\n  yield <Component />\n}\n\nexport const _205_LoopGeneratorFunction = <Component />\nexport const _205_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/function/loop-generator-function.js",
    output: "import { h } from \"@virtualstate/fringe\";\nfunction* Component() {\n    yield \"💥\";\n    yield h(Component, null);\n}\nexport const _205_LoopGeneratorFunction = h(Component, null);\nexport const _205_URL = import.meta.url;\n//# sourceMappingURL=loop-generator-function.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nfunction *Component() {\n  yield \"💥\"\n  yield <Component />\n}\n\nexport const Example = <Component />",
    structure: "",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _206_ExampleInformation: ExampleInformation = {
    name: "FunctionWithOptions",
    id: "206",
    exportedAs: "_206_FunctionWithOptions",
    source: "import { h } from \"@virtualstate/fringe\";\n\ninterface ComponentOptions {\n  meta: string\n}\n\nfunction Component({ meta }: ComponentOptions) {\n  return <example meta={`${meta} 🎾`} />\n}\n\nexport const _206_FunctionWithOptions = <Component meta=\"🏓\" />\nexport const _206_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/function/options-function.js",
    output: "import { h } from \"@virtualstate/fringe\";\nfunction Component({ meta }) {\n    return h(\"example\", { meta: `${meta} 🎾` });\n}\nexport const _206_FunctionWithOptions = h(Component, { meta: \"\\uD83C\\uDFD3\" });\nexport const _206_URL = import.meta.url;\n//# sourceMappingURL=options-function.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\ninterface ComponentOptions {\n  meta: string\n}\n\nfunction Component({ meta }: ComponentOptions) {\n  return <example meta={`${meta} 🎾`} />\n}\n\nexport const Example = <Component meta=\"🏓\" />",
    structure: "<example meta=\"🏓 🎾\" />",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _207_ExampleInformation: ExampleInformation = {
    name: "FunctionWithChildren",
    id: "207",
    exportedAs: "_207_FunctionWithChildren",
    source: "import { h, VNode } from \"@virtualstate/fringe\";\n\n\nfunction Component(o: unknown, child: VNode) {\n  return (\n    <container>\n      {child}\n    </container>\n  )\n}\n\nexport const _207_FunctionWithChildren = (\n  <Component>\n    {\"🐸\"}\n  </Component>\n)\nexport const _207_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/function/children-function.js",
    output: "import { h } from \"@virtualstate/fringe\";\nfunction Component(o, child) {\n    return (h(\"container\", null, child));\n}\nexport const _207_FunctionWithChildren = (h(Component, null, \"🐸\"));\nexport const _207_URL = import.meta.url;\n//# sourceMappingURL=children-function.js.map",
    cleanerSource: "import { h, VNode } from \"@virtualstate/fringe\";\n\n\nfunction Component(o, child: VNode) {\n  return (\n    <container>\n      {child}\n    </container>\n  )\n}\n\nexport const Example = (\n  <Component>\n    {\"🐸\"}\n  </Component>\n)",
    structure: "<container>\n  {\"🐸\"}\n</container>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _208_ExampleInformation: ExampleInformation = {
    name: "LogOrder",
    id: "208",
    exportedAs: "_208_LogOrder",
    source: "import { h } from \"@virtualstate/fringe\";\nimport { read } from \"./read\";\n\nfunction *Component() {\n  console.log(\"🐸\");\n  yield \"💿\";\n  console.log(\"💎\");\n  yield \"🔑\";\n  console.log(\"💡\");\n}\n\nasync function Log() {\n  console.log(\"🎾️\\n\");\n  for await (const node of read(<Component />)) {\n    console.log(node.source);\n    console.log(\"\\n⏭️\\n\");\n  }\n  console.log(\"\\n🛑\");\n}\n\nexport const _208_LogOrder = (\n  <Log />\n)\nexport const _208_URL = import.meta.url;\nexport const _208_Info = {\n  producesOutput: true\n}\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/function/generator-order.js",
    output: "import { h } from \"@virtualstate/fringe\";\nimport { read } from \"./read.js\";\nfunction* Component() {\n    console.log(\"🐸\");\n    yield \"💿\";\n    console.log(\"💎\");\n    yield \"🔑\";\n    console.log(\"💡\");\n}\nasync function Log() {\n    console.log(\"🎾️\\n\");\n    for await (const node of read(h(Component, null))) {\n        console.log(node.source);\n        console.log(\"\\n⏭️\\n\");\n    }\n    console.log(\"\\n🛑\");\n}\nexport const _208_LogOrder = (h(Log, null));\nexport const _208_URL = import.meta.url;\nexport const _208_Info = {\n    producesOutput: true\n};\n//# sourceMappingURL=generator-order.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\nimport { read } from \"./read\";\n\nfunction *Component() {\n  console.log(\"🐸\");\n  yield \"💿\";\n  console.log(\"💎\");\n  yield \"🔑\";\n  console.log(\"💡\");\n}\n\nasync function Log() {\n  console.log(\"🎾️\\n\");\n  for await (const node of read(<Component />)) {\n    console.log(node.source);\n    console.log(\"\\n⏭️\\n\");\n  }\n  console.log(\"\\n🛑\");\n}\n\nexport const Example = (\n  <Log />\n)",
    structure: "\"No output\"",
    info: {"producesOutput":true},
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _301_ExampleInformation: ExampleInformation = {
    name: "Promise",
    id: "301",
    exportedAs: "_301_Promise",
    source: "import { h } from \"@virtualstate/fringe\";\n\nexport const _301_Promise = (\n  <container>\n    {Promise.resolve(\"🐻\")}\n  </container>\n)\nexport const _301_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/promise/promise.js",
    output: "import { h } from \"@virtualstate/fringe\";\nexport const _301_Promise = (h(\"container\", null, Promise.resolve(\"🐻\")));\nexport const _301_URL = import.meta.url;\n//# sourceMappingURL=promise.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nexport const Example = (\n  <container>\n    {Promise.resolve(\"🐻\")}\n  </container>\n)",
    structure: "<container>\n  {\"🐻\"}\n</container>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _302_ExampleInformation: ExampleInformation = {
    name: "PromiseArray",
    id: "302",
    exportedAs: "_302_PromiseArray",
    source: "import { h } from \"@virtualstate/fringe\";\n\nexport const _302_PromiseArray = (\n  <container>\n    {[\n      Promise.resolve(\"🎾\"),\n      Promise.resolve(\"🧩\")\n    ]}\n  </container>\n)\nexport const _302_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/promise/promise-array.js",
    output: "import { h } from \"@virtualstate/fringe\";\nexport const _302_PromiseArray = (h(\"container\", null, [\n    Promise.resolve(\"🎾\"),\n    Promise.resolve(\"🧩\")\n]));\nexport const _302_URL = import.meta.url;\n//# sourceMappingURL=promise-array.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nexport const Example = (\n  <container>\n    {[\n      Promise.resolve(\"🎾\"),\n      Promise.resolve(\"🧩\")\n    ]}\n  </container>\n)",
    structure: "<container>\n  {\"🎾\"}\n  {\"🧩\"}\n</container>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _303_ExampleInformation: ExampleInformation = {
    name: "AsPromise",
    id: "303",
    exportedAs: "_303_AsPromise",
    source: "import {assertPromiseVNode, ChildrenSource, h, thenish} from \"@virtualstate/fringe\";\n\nasync function *Whatever() {\n  yield (\n    <p>\n      <z>\n        <a />\n      </z>\n      <z>\n        <b />\n      </z>\n    </p>\n  )\n  yield (\n    <p>\n      <z>\n        <a />\n      </z>\n      <z>\n        <b />\n      </z>\n      <z>\n        <c />\n      </z>\n    </p>\n  )\n}\n\nasync function Example() {\n  const node = (\n    <Whatever />\n  )\n  node.then = thenish;\n  assertPromiseVNode(node);\n\n  const [p] = await node;\n\n  p.then = thenish;\n  assertPromiseVNode(p);\n  const result = await p;\n\n  return result.map(node => node.children[ChildrenSource]);\n}\n\nexport const _303_AsPromise = <Example />\nexport const _303_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/promise/as-promise.js",
    output: "import { assertPromiseVNode, ChildrenSource, h, thenish } from \"@virtualstate/fringe\";\nasync function* Whatever() {\n    yield (h(\"p\", null,\n        h(\"z\", null,\n            h(\"a\", null)),\n        h(\"z\", null,\n            h(\"b\", null))));\n    yield (h(\"p\", null,\n        h(\"z\", null,\n            h(\"a\", null)),\n        h(\"z\", null,\n            h(\"b\", null)),\n        h(\"z\", null,\n            h(\"c\", null))));\n}\nasync function Example() {\n    const node = (h(Whatever, null));\n    node.then = thenish;\n    assertPromiseVNode(node);\n    const [p] = await node;\n    p.then = thenish;\n    assertPromiseVNode(p);\n    const result = await p;\n    return result.map(node => node.children[ChildrenSource]);\n}\nexport const _303_AsPromise = h(Example, null);\nexport const _303_URL = import.meta.url;\n//# sourceMappingURL=as-promise.js.map",
    cleanerSource: "import {assertPromiseVNode, ChildrenSource, h, thenish} from \"@virtualstate/fringe\";\n\nasync function *Whatever() {\n  yield (\n    <p>\n      <z>\n        <a />\n      </z>\n      <z>\n        <b />\n      </z>\n    </p>\n  )\n  yield (\n    <p>\n      <z>\n        <a />\n      </z>\n      <z>\n        <b />\n      </z>\n      <z>\n        <c />\n      </z>\n    </p>\n  )\n}\n\nasync function Example() {\n  const node = (\n    <Whatever />\n  )\n  node.then = thenish;\n  assertPromiseVNode(node);\n\n  const [p] = await node;\n\n  p.then = thenish;\n  assertPromiseVNode(p);\n  const result = await p;\n\n  return result.map(node => node.children[ChildrenSource]);\n}\n\nexport const Example = <Example />",
    structure: "<>\n  {\"a\"}\n  {\"b\"}\n  {\"c\"}\n</>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _304_ExampleInformation: ExampleInformation = {
    name: "AsPromiseOptions",
    id: "304",
    exportedAs: "_304_AsPromiseOptions",
    source: "import {ChildrenSource, EnableThen, h} from \"@virtualstate/fringe\";\n\nconst node = (\n  <p {...{ [EnableThen]: true }}>\n    <z>\n      <a />\n    </z>\n    <z>\n      <b />\n    </z>\n    <z>\n      <c />\n    </z>\n  </p>\n)\n\nasync function Example() {\n  const result = await node;\n  return result.map(node => node.children[ChildrenSource]);\n}\n\nexport const _304_AsPromiseOptions = <Example />\nexport const _304_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/promise/as-promise-options.js",
    output: "import { ChildrenSource, EnableThen, h } from \"@virtualstate/fringe\";\nconst node = (h(\"p\", { ...{ [EnableThen]: true } },\n    h(\"z\", null,\n        h(\"a\", null)),\n    h(\"z\", null,\n        h(\"b\", null)),\n    h(\"z\", null,\n        h(\"c\", null))));\nasync function Example() {\n    const result = await node;\n    return result.map(node => node.children[ChildrenSource]);\n}\nexport const _304_AsPromiseOptions = h(Example, null);\nexport const _304_URL = import.meta.url;\n//# sourceMappingURL=as-promise-options.js.map",
    cleanerSource: "import {ChildrenSource, EnableThen, h} from \"@virtualstate/fringe\";\n\nconst node = (\n  <p {...{ [EnableThen]: true }}>\n    <z>\n      <a />\n    </z>\n    <z>\n      <b />\n    </z>\n    <z>\n      <c />\n    </z>\n  </p>\n)\n\nasync function Example() {\n  const result = await node;\n  return result.map(node => node.children[ChildrenSource]);\n}\n\nexport const Example = <Example />",
    structure: "<>\n  {\"a\"}\n  {\"b\"}\n  {\"c\"}\n</>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _305_ExampleInformation: ExampleInformation = {
    name: "AsPromiseWithGenerator",
    id: "305",
    exportedAs: "_305_AsPromiseWithGenerator",
    source: "import {ChildrenSource, EnableThen, h, createFragment} from \"@virtualstate/fringe\";\n\nasync function *Inner() {\n  yield (\n    <>\n      <z>\n        <a />\n      </z>\n      <z>\n        <b />\n      </z>\n      <z>\n        <c />\n      </z>\n    </>\n  )\n}\n\nconst node = (\n  <p {...{ [EnableThen]: true }}>\n    <Inner />\n  </p>\n)\n\nasync function Example() {\n  const result = await node;\n  return result.map(node => node.children[ChildrenSource]);\n}\n\nexport const _305_AsPromiseWithGenerator = <Example />\nexport const _305_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/promise/as-promise-options-inner.js",
    output: "import { ChildrenSource, EnableThen, h, createFragment } from \"@virtualstate/fringe\";\nasync function* Inner() {\n    yield (h(createFragment, null,\n        h(\"z\", null,\n            h(\"a\", null)),\n        h(\"z\", null,\n            h(\"b\", null)),\n        h(\"z\", null,\n            h(\"c\", null))));\n}\nconst node = (h(\"p\", { ...{ [EnableThen]: true } },\n    h(Inner, null)));\nasync function Example() {\n    const result = await node;\n    return result.map(node => node.children[ChildrenSource]);\n}\nexport const _305_AsPromiseWithGenerator = h(Example, null);\nexport const _305_URL = import.meta.url;\n//# sourceMappingURL=as-promise-options-inner.js.map",
    cleanerSource: "import {ChildrenSource, EnableThen, h, createFragment} from \"@virtualstate/fringe\";\n\nasync function *Inner() {\n  yield (\n    <>\n      <z>\n        <a />\n      </z>\n      <z>\n        <b />\n      </z>\n      <z>\n        <c />\n      </z>\n    </>\n  )\n}\n\nconst node = (\n  <p {...{ [EnableThen]: true }}>\n    <Inner />\n  </p>\n)\n\nasync function Example() {\n  const result = await node;\n  return result.map(node => node.children[ChildrenSource]);\n}\n\nexport const Example = <Example />",
    structure: "<>\n  {\"a\"}\n  {\"b\"}\n  {\"c\"}\n</>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _306_ExampleInformation: ExampleInformation = {
    name: "AsPromiseResolve",
    id: "306",
    exportedAs: "_306_AsPromiseResolve",
    source: "import { Resolve } from \"@virtualstate/fringe\";\nimport {ChildrenSource, h, createFragment} from \"@virtualstate/fringe\";\n\nasync function *Inner() {\n  yield (\n    <>\n      <z>\n        <a />\n      </z>\n      <z>\n        <b />\n      </z>\n      <z>\n        <c />\n      </z>\n    </>\n  )\n}\n\nconst node = (\n  <Resolve>\n    <Inner />\n  </Resolve>\n)\n\nasync function Example() {\n  const result = await node;\n  return result.map(node => node.children[ChildrenSource]);\n}\n\nexport const _306_AsPromiseResolve = <Example />\nexport const _306_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/promise/as-promise-options-inner-resolve.js",
    output: "import { Resolve } from \"@virtualstate/fringe\";\nimport { ChildrenSource, h, createFragment } from \"@virtualstate/fringe\";\nasync function* Inner() {\n    yield (h(createFragment, null,\n        h(\"z\", null,\n            h(\"a\", null)),\n        h(\"z\", null,\n            h(\"b\", null)),\n        h(\"z\", null,\n            h(\"c\", null))));\n}\nconst node = (h(Resolve, null,\n    h(Inner, null)));\nasync function Example() {\n    const result = await node;\n    return result.map(node => node.children[ChildrenSource]);\n}\nexport const _306_AsPromiseResolve = h(Example, null);\nexport const _306_URL = import.meta.url;\n//# sourceMappingURL=as-promise-options-inner-resolve.js.map",
    cleanerSource: "import { Resolve } from \"@virtualstate/fringe\";\nimport {ChildrenSource, h, createFragment} from \"@virtualstate/fringe\";\n\nasync function *Inner() {\n  yield (\n    <>\n      <z>\n        <a />\n      </z>\n      <z>\n        <b />\n      </z>\n      <z>\n        <c />\n      </z>\n    </>\n  )\n}\n\nconst node = (\n  <Resolve>\n    <Inner />\n  </Resolve>\n)\n\nasync function Example() {\n  const result = await node;\n  return result.map(node => node.children[ChildrenSource]);\n}\n\nexport const Example = <Example />",
    structure: "<>\n  {\"a\"}\n  {\"b\"}\n  {\"c\"}\n</>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _401_ExampleInformation: ExampleInformation = {
    name: "Class",
    id: "401",
    exportedAs: "_401_Class",
    source: "import { h } from \"@virtualstate/fringe\";\n\nclass Component {\n\n  async *[Symbol.asyncIterator]() {\n    yield \"🐸\";\n    yield \"💡\";\n  }\n\n}\n\nexport const _401_Class = (\n  <Component />\n);\nexport const _401_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/class/class.js",
    output: "import { h } from \"@virtualstate/fringe\";\nclass Component {\n    async *[Symbol.asyncIterator]() {\n        yield \"🐸\";\n        yield \"💡\";\n    }\n}\nexport const _401_Class = (h(Component, null));\nexport const _401_URL = import.meta.url;\n//# sourceMappingURL=class.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nclass Component {\n\n  async *[Symbol.asyncIterator]() {\n    yield \"🐸\";\n    yield \"💡\";\n  }\n\n}\n\nexport const Example = (\n  <Component />\n);",
    structure: "\"💡\"",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _402_ExampleInformation: ExampleInformation = {
    name: "ClassWithOptions",
    id: "402",
    exportedAs: "_402_ClassWithOptions",
    source: "import { h } from \"@virtualstate/fringe\";\n\ninterface ComponentOptions {\n  meta: string\n}\n\nclass Component {\n\n  constructor(private options: ComponentOptions) {\n  }\n\n  async *[Symbol.asyncIterator]() {\n    yield `${this.options.meta} 🛑`;\n  }\n\n}\n\nexport const _402_ClassWithOptions = (\n  <Component meta=\"🦆\" />\n);\nexport const _402_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/class/options.js",
    output: "import { h } from \"@virtualstate/fringe\";\nclass Component {\n    options;\n    constructor(options) {\n        this.options = options;\n    }\n    async *[Symbol.asyncIterator]() {\n        yield `${this.options.meta} 🛑`;\n    }\n}\nexport const _402_ClassWithOptions = (h(Component, { meta: \"\\uD83E\\uDD86\" }));\nexport const _402_URL = import.meta.url;\n//# sourceMappingURL=options.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\ninterface ComponentOptions {\n  meta: string\n}\n\nclass Component {\n\n  constructor(private options: ComponentOptions) {\n  }\n\n  async *[Symbol.asyncIterator]() {\n    yield `${this.options.meta} 🛑`;\n  }\n\n}\n\nexport const Example = (\n  <Component meta=\"🦆\" />\n);",
    structure: "\"🦆 🛑\"",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _403_ExampleInformation: ExampleInformation = {
    name: "ClassWithChildren",
    id: "403",
    exportedAs: "_403_ClassWithChildren",
    source: "import { h } from \"../../jsx\";\nimport { VNode } from \"@virtualstate/fringe\";\n\nclass Component {\n\n  constructor(o, private child: VNode) {\n  }\n\n  async *[Symbol.asyncIterator]() {\n    yield <container>{this.child}</container>;\n  }\n\n}\n\nexport const _403_ClassWithChildren = (\n  <Component>\n    {\"🐸\"}\n  </Component>\n);\nexport const _403_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/class/children.js",
    output: "import { h } from \"../../jsx.js\";\nclass Component {\n    child;\n    constructor(o, child) {\n        this.child = child;\n    }\n    async *[Symbol.asyncIterator]() {\n        yield h(\"container\", null, this.child);\n    }\n}\nexport const _403_ClassWithChildren = (h(Component, null, \"🐸\"));\nexport const _403_URL = import.meta.url;\n//# sourceMappingURL=children.js.map",
    cleanerSource: "import { h } from \"../../jsx\";\nimport { VNode } from \"@virtualstate/fringe\";\n\nclass Component {\n\n  constructor(o, private child: VNode) {\n  }\n\n  async *[Symbol.asyncIterator]() {\n    yield <container>{this.child}</container>;\n  }\n\n}\n\nexport const Example = (\n  <Component>\n    {\"🐸\"}\n  </Component>\n);",
    structure: "<container>\n  {\"🐸\"}\n</container>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _404_ExampleInformation: ExampleInformation = {
    name: "ReferenceClass",
    id: "404",
    exportedAs: "_404_ReferenceClass",
    source: "import { h } from \"../../jsx\";\n\nclass Component {\n\n  reference: symbol;\n\n  constructor() {\n    this.reference = Symbol(\"🛎️\");\n  }\n\n}\n\nexport const _404_ReferenceClass = (\n  <Component />\n);\nexport const _404_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/class/reference.js",
    output: "import { h } from \"../../jsx.js\";\nclass Component {\n    reference;\n    constructor() {\n        this.reference = Symbol(\"🛎️\");\n    }\n}\nexport const _404_ReferenceClass = (h(Component, null));\nexport const _404_URL = import.meta.url;\n//# sourceMappingURL=reference.js.map",
    cleanerSource: "import { h } from \"../../jsx\";\n\nclass Component {\n\n  reference: symbol;\n\n  constructor() {\n    this.reference = Symbol(\"🛎️\");\n  }\n\n}\n\nexport const Example = (\n  <Component />\n);",
    structure: "Symbol(\"🛎️\")",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _405_ExampleInformation: ExampleInformation = {
    name: "SharedInstance",
    id: "405",
    exportedAs: "_405_SharedInstance",
    source: "import { h } from \"../../jsx\";\nimport { And } from \"../experiments/combinational/and\";\n\nclass Component {\n\n  iterations = 0;\n\n  *[Symbol.iterator]() {\n    const id = this.iterations += 1;\n    yield { reference: `Iteration ${id} 🐸` };\n  }\n\n}\n\nconst node = <Component />;\n\nexport const _405_SharedInstance = (\n  <container>\n    <And size={3} self>\n      {node}\n      {node}\n      {node}\n    </And>\n  </container>\n);\nexport const _405_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/class/shared.js",
    output: "import { h } from \"../../jsx.js\";\nimport { And } from \"../experiments/combinational/and.js\";\nclass Component {\n    iterations = 0;\n    *[Symbol.iterator]() {\n        const id = this.iterations += 1;\n        yield { reference: `Iteration ${id} 🐸` };\n    }\n}\nconst node = h(Component, null);\nexport const _405_SharedInstance = (h(\"container\", null,\n    h(And, { size: 3, self: true },\n        node,\n        node,\n        node)));\nexport const _405_URL = import.meta.url;\n//# sourceMappingURL=shared.js.map",
    cleanerSource: "import { h } from \"../../jsx\";\nimport { And } from \"../experiments/combinational/and\";\n\nclass Component {\n\n  iterations = 0;\n\n  *[Symbol.iterator]() {\n    const id = this.iterations += 1;\n    yield { reference: `Iteration ${id} 🐸` };\n  }\n\n}\n\nconst node = <Component />;\n\nexport const Example = (\n  <container>\n    <And size={3} self>\n      {node}\n      {node}\n      {node}\n    </And>\n  </container>\n);",
    structure: "<container>\n  <TruthfulAND>\n    {\"Iteration 1 🐸\"}\n    {\"Iteration 2 🐸\"}\n    {\"Iteration 3 🐸\"}\n  </TruthfulAND>\n</container>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _406_ExampleInformation: ExampleInformation = {
    name: "SharedAsync",
    id: "406",
    exportedAs: "_406_SharedAsync",
    source: "import { h } from \"../../jsx\";\nimport { And } from \"../experiments/combinational/and\";\n\nclass Component {\n\n  iterations = 0;\n\n  async *[Symbol.asyncIterator]() {\n    const id = this.iterations += 1;\n    yield { reference: `Iteration ${id} 🕊️` };\n  }\n\n}\n\nconst node = <Component />;\n\nexport const _406_SharedAsync = (\n  <container>\n    <And size={3} self>\n      {node}\n      {node}\n      {node}\n    </And>\n  </container>\n);\nexport const _406_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/class/shared-async.js",
    output: "import { h } from \"../../jsx.js\";\nimport { And } from \"../experiments/combinational/and.js\";\nclass Component {\n    iterations = 0;\n    async *[Symbol.asyncIterator]() {\n        const id = this.iterations += 1;\n        yield { reference: `Iteration ${id} 🕊️` };\n    }\n}\nconst node = h(Component, null);\nexport const _406_SharedAsync = (h(\"container\", null,\n    h(And, { size: 3, self: true },\n        node,\n        node,\n        node)));\nexport const _406_URL = import.meta.url;\n//# sourceMappingURL=shared-async.js.map",
    cleanerSource: "import { h } from \"../../jsx\";\nimport { And } from \"../experiments/combinational/and\";\n\nclass Component {\n\n  iterations = 0;\n\n  async *[Symbol.asyncIterator]() {\n    const id = this.iterations += 1;\n    yield { reference: `Iteration ${id} 🕊️` };\n  }\n\n}\n\nconst node = <Component />;\n\nexport const Example = (\n  <container>\n    <And size={3} self>\n      {node}\n      {node}\n      {node}\n    </And>\n  </container>\n);",
    structure: "<container>\n  <TruthfulAND>\n    {\"Iteration 1 🕊️\"}\n    {\"Iteration 2 🕊️\"}\n    {\"Iteration 3 🕊️\"}\n  </TruthfulAND>\n</container>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _407_ExampleInformation: ExampleInformation = {
    name: "SharedCollector",
    id: "407",
    exportedAs: "_407_SharedCollector",
    source: "import { h } from \"../../jsx\";\nimport { And } from \"../experiments/combinational/and\";\nimport { Collector } from \"microtask-collector\";\n\nclass Component {\n\n  iterations = 0;\n\n  collector = new Collector<number>({\n    eagerCollection: true\n  });\n\n  seen = [];\n\n  constructor(public options: { expect: number }) {\n    void this.watch();\n  }\n\n  async watch() {\n    for await (const batch of this.collector) {\n      this.seen.push(...batch);\n    }\n  }\n\n  async *[Symbol.asyncIterator]() {\n    const id = this.iterations += 1;\n    this.collector.add(id);\n    yield { reference: `Iteration ${id} 🦆` };\n    yield `Seen: ${this.seen.join(\", \")} 🐸`;\n  }\n\n}\n\nconst node = <Component expect={3} />;\n\nexport const _407_SharedCollector = (\n  <container>\n    <And size={3} self>\n      {node}\n      {node}\n      {node}\n    </And>\n  </container>\n);\nexport const _407_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/class/shared-collector.js",
    output: "import { h } from \"../../jsx.js\";\nimport { And } from \"../experiments/combinational/and.js\";\nimport { Collector } from \"microtask-collector\";\nclass Component {\n    options;\n    iterations = 0;\n    collector = new Collector({\n        eagerCollection: true\n    });\n    seen = [];\n    constructor(options) {\n        this.options = options;\n        void this.watch();\n    }\n    async watch() {\n        for await (const batch of this.collector) {\n            this.seen.push(...batch);\n        }\n    }\n    async *[Symbol.asyncIterator]() {\n        const id = this.iterations += 1;\n        this.collector.add(id);\n        yield { reference: `Iteration ${id} 🦆` };\n        yield `Seen: ${this.seen.join(\", \")} 🐸`;\n    }\n}\nconst node = h(Component, { expect: 3 });\nexport const _407_SharedCollector = (h(\"container\", null,\n    h(And, { size: 3, self: true },\n        node,\n        node,\n        node)));\nexport const _407_URL = import.meta.url;\n//# sourceMappingURL=shared-collector.js.map",
    cleanerSource: "import { h } from \"../../jsx\";\nimport { And } from \"../experiments/combinational/and\";\nimport { Collector } from \"microtask-collector\";\n\nclass Component {\n\n  iterations = 0;\n\n  collector = new Collector<number>({\n    eagerCollection: true\n  });\n\n  seen = [];\n\n  constructor(public options: { expect: number }) {\n    void this.watch();\n  }\n\n  async watch() {\n    for await (const batch of this.collector) {\n      this.seen.push(...batch);\n    }\n  }\n\n  async *[Symbol.asyncIterator]() {\n    const id = this.iterations += 1;\n    this.collector.add(id);\n    yield { reference: `Iteration ${id} 🦆` };\n    yield `Seen: ${this.seen.join(\", \")} 🐸`;\n  }\n\n}\n\nconst node = <Component expect={3} />;\n\nexport const Example = (\n  <container>\n    <And size={3} self>\n      {node}\n      {node}\n      {node}\n    </And>\n  </container>\n);",
    structure: "<container>\n  <TruthfulAND>\n    {\"Seen: 1, 2, 3 🐸\"}\n    {\"Seen: 1, 2, 3 🐸\"}\n    {\"Seen: 1, 2, 3 🐸\"}\n  </TruthfulAND>\n</container>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _501_ExampleInformation: ExampleInformation = {
    name: "Static",
    id: "501",
    exportedAs: "_501_Static",
    source: "import { h } from \"@virtualstate/fringe\";\nimport { Cactus, Scroll, TestTube, Thread } from \"./domain\";\n\nexport const _501_Static = (\n  <TestTube>\n    <Thread size={2} />\n    <Cactus spikes=\"spikey\" />\n    <Cactus spikes=\"not very spikey\" />\n    <Scroll />\n  </TestTube>\n);\nexport const _501_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/static/static.js",
    output: "import { h } from \"@virtualstate/fringe\";\nimport { Cactus, Scroll, TestTube, Thread } from \"./domain.js\";\nexport const _501_Static = (h(TestTube, null,\n    h(Thread, { size: 2 }),\n    h(Cactus, { spikes: \"spikey\" }),\n    h(Cactus, { spikes: \"not very spikey\" }),\n    h(Scroll, null)));\nexport const _501_URL = import.meta.url;\n//# sourceMappingURL=static.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\nimport { Cactus, Scroll, TestTube, Thread } from \"./domain\";\n\nexport const Example = (\n  <TestTube>\n    <Thread size={2} />\n    <Cactus spikes=\"spikey\" />\n    <Cactus spikes=\"not very spikey\" />\n    <Scroll />\n  </TestTube>\n);",
    structure: "<🧪>\n  <🧵 size={2} />\n  <🌵 spikes=\"spikey\" />\n  <🌵 spikes=\"not very spikey\" />\n  {Symbol(\"📜\")}\n</🧪>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _601_ExampleInformation: ExampleInformation = {
    name: "TypeScalar",
    id: "601",
    exportedAs: "_601_TypeScalar",
    source: "import { h } from \"@virtualstate/fringe\";\n\nconst node = h(\"🐸\");\nconst source: \"🐸\" = node.source;\nconst scalar: true = node.scalar;\nconst children: never = node.children;\n\nexport const _601_TypeScalar = node;\nexport const _601_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/types/scalar.js",
    output: "import { h } from \"@virtualstate/fringe\";\nconst node = h(\"🐸\");\nconst source = node.source;\nconst scalar = node.scalar;\nconst children = node.children;\nexport const _601_TypeScalar = node;\nexport const _601_URL = import.meta.url;\n//# sourceMappingURL=scalar.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nconst node = h(\"🐸\");\nconst source: \"🐸\" = node.source;\nconst scalar: true = node.scalar;\nconst children: never = node.children;\n\nexport const Example = node;",
    structure: "\"🐸\"",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _602_ExampleInformation: ExampleInformation = {
    name: "TypeStructure",
    id: "602",
    exportedAs: "_602_TypeStructure",
    source: "import { h, VNode } from \"@virtualstate/fringe\";\n\ninterface SoccerBallOptions {\n  pressure: \"pumped\" | \"flat\"\n}\nconst soccerOptions: SoccerBallOptions = {\n  pressure: \"pumped\"\n}\nconst soccer = h(\"⚽\", soccerOptions);\n\nconst node = h(\"🐸\", {}, soccer);\nconst source: \"🐸\" = node.source;\nconst children: AsyncIterable<VNode[]> = node.children;\nconst childrenOther: AsyncIterable<(typeof soccer)[]> = node.children;\n\nfor await (const children of node.children) {\n  for (const child of children) {\n    const childSource: \"⚽\" = child.source;\n    const childOptions: SoccerBallOptions = child.options;\n    const childChildren: never = child.children;\n  }\n}\n\nexport const _602_TypeStructure = node;\nexport const _602_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/types/children.js",
    output: "import { h } from \"@virtualstate/fringe\";\nconst soccerOptions = {\n    pressure: \"pumped\"\n};\nconst soccer = h(\"⚽\", soccerOptions);\nconst node = h(\"🐸\", {}, soccer);\nconst source = node.source;\nconst children = node.children;\nconst childrenOther = node.children;\nfor await (const children of node.children) {\n    for (const child of children) {\n        const childSource = child.source;\n        const childOptions = child.options;\n        const childChildren = child.children;\n    }\n}\nexport const _602_TypeStructure = node;\nexport const _602_URL = import.meta.url;\n//# sourceMappingURL=children.js.map",
    cleanerSource: "import { h, VNode } from \"@virtualstate/fringe\";\n\ninterface SoccerBallOptions {\n  pressure: \"pumped\" | \"flat\"\n}\nconst soccerOptions: SoccerBallOptions = {\n  pressure: \"pumped\"\n}\nconst soccer = h(\"⚽\", soccerOptions);\n\nconst node = h(\"🐸\", {}, soccer);\nconst source: \"🐸\" = node.source;\nconst children: AsyncIterable<VNode[]> = node.children;\nconst childrenOther: AsyncIterable<(typeof soccer)[]> = node.children;\n\nfor await (const children of node.children) {\n  for (const child of children) {\n    const childSource: \"⚽\" = child.source;\n    const childOptions: SoccerBallOptions = child.options;\n    const childChildren: never = child.children;\n  }\n}\n\nexport const Example = node;",
    structure: "<🐸>\n  <⚽ pressure=\"pumped\" />\n</🐸>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _701_ExampleInformation: ExampleInformation = {
    name: "Token",
    id: "701",
    exportedAs: "_701_Token",
    source: "import { createToken, h } from \"@virtualstate/fringe\";\n\nconst BoxSymbol = Symbol(\"📦\");\nconst Box = createToken(BoxSymbol);\n\nexport const _701_Token = <Box />;\nexport const _701_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/token/token.js",
    output: "import { createToken, h } from \"@virtualstate/fringe\";\nconst BoxSymbol = Symbol(\"📦\");\nconst Box = createToken(BoxSymbol);\nexport const _701_Token = h(Box, null);\nexport const _701_URL = import.meta.url;\n//# sourceMappingURL=token.js.map",
    cleanerSource: "import { createToken, h } from \"@virtualstate/fringe\";\n\nconst BoxSymbol = Symbol(\"📦\");\nconst Box = createToken(BoxSymbol);\n\nexport const Example = <Box />;",
    structure: "Symbol(\"📦\")",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _702_ExampleInformation: ExampleInformation = {
    name: "TokenChildren",
    id: "702",
    exportedAs: "_702_TokenChildren",
    source: "import { createToken, h } from \"@virtualstate/fringe\";\n\nconst BoxSymbol = Symbol(\"📦\");\nconst Box = createToken(BoxSymbol);\n\nconst WrappedBoxSymbol = Symbol(\"🎁\");\nconst WrappedBox = createToken(WrappedBoxSymbol);\n\nconst CactusSymbol = Symbol(\"🌵\");\nconst Cactus = createToken(CactusSymbol);\n\nconst TestTubeSymbol = Symbol(\"🧪\");\nconst TestTube = createToken(TestTubeSymbol);\n\nconst ThreadSymbol = Symbol(\"🧵\");\nconst Thread = createToken(ThreadSymbol);\n\nconst ScrollSymbol = Symbol(\"📜\");\nconst Scroll = createToken(ScrollSymbol);\n\nconst BombSymbol = Symbol(\"💣\");\nconst Bomb = createToken(BombSymbol);\n\nfunction SecretContents() {\n  return (\n    <WrappedBox>\n      <Bomb />\n    </WrappedBox>\n  );\n}\n\nexport const _702_TokenChildren = (\n  <Box>\n    <Scroll />\n    <TestTube />\n    <Thread />\n    <Box>\n      <Cactus />\n      <SecretContents />\n    </Box>\n  </Box>\n);\nexport const _702_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/token/token-children.js",
    output: "import { createToken, h } from \"@virtualstate/fringe\";\nconst BoxSymbol = Symbol(\"📦\");\nconst Box = createToken(BoxSymbol);\nconst WrappedBoxSymbol = Symbol(\"🎁\");\nconst WrappedBox = createToken(WrappedBoxSymbol);\nconst CactusSymbol = Symbol(\"🌵\");\nconst Cactus = createToken(CactusSymbol);\nconst TestTubeSymbol = Symbol(\"🧪\");\nconst TestTube = createToken(TestTubeSymbol);\nconst ThreadSymbol = Symbol(\"🧵\");\nconst Thread = createToken(ThreadSymbol);\nconst ScrollSymbol = Symbol(\"📜\");\nconst Scroll = createToken(ScrollSymbol);\nconst BombSymbol = Symbol(\"💣\");\nconst Bomb = createToken(BombSymbol);\nfunction SecretContents() {\n    return (h(WrappedBox, null,\n        h(Bomb, null)));\n}\nexport const _702_TokenChildren = (h(Box, null,\n    h(Scroll, null),\n    h(TestTube, null),\n    h(Thread, null),\n    h(Box, null,\n        h(Cactus, null),\n        h(SecretContents, null))));\nexport const _702_URL = import.meta.url;\n//# sourceMappingURL=token-children.js.map",
    cleanerSource: "import { createToken, h } from \"@virtualstate/fringe\";\n\nconst BoxSymbol = Symbol(\"📦\");\nconst Box = createToken(BoxSymbol);\n\nconst WrappedBoxSymbol = Symbol(\"🎁\");\nconst WrappedBox = createToken(WrappedBoxSymbol);\n\nconst CactusSymbol = Symbol(\"🌵\");\nconst Cactus = createToken(CactusSymbol);\n\nconst TestTubeSymbol = Symbol(\"🧪\");\nconst TestTube = createToken(TestTubeSymbol);\n\nconst ThreadSymbol = Symbol(\"🧵\");\nconst Thread = createToken(ThreadSymbol);\n\nconst ScrollSymbol = Symbol(\"📜\");\nconst Scroll = createToken(ScrollSymbol);\n\nconst BombSymbol = Symbol(\"💣\");\nconst Bomb = createToken(BombSymbol);\n\nfunction SecretContents() {\n  return (\n    <WrappedBox>\n      <Bomb />\n    </WrappedBox>\n  );\n}\n\nexport const Example = (\n  <Box>\n    <Scroll />\n    <TestTube />\n    <Thread />\n    <Box>\n      <Cactus />\n      <SecretContents />\n    </Box>\n  </Box>\n);",
    structure: "<📦>\n  {Symbol(\"📜\")}\n  {Symbol(\"🧪\")}\n  {Symbol(\"🧵\")}\n  <📦>\n    {Symbol(\"🌵\")}\n    <🎁>\n      {Symbol(\"💣\")}\n    </🎁>\n  </📦>\n</📦>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _703_ExampleInformation: ExampleInformation = {
    name: "TokenOptions",
    id: "703",
    exportedAs: "_703_TokenOptions",
    source: "import { createToken, h, createFragment } from \"@virtualstate/fringe\";\n\ninterface BoxOptions extends Record<string, unknown> {\n  size: \"1\" | \"2\" | \"3\";\n}\n\nconst BoxSymbol = Symbol(\"📦\");\nconst Box = createToken<typeof BoxSymbol, BoxOptions>(BoxSymbol);\n\nconst defaultOptions: BoxOptions = {\n  size: \"1\"\n};\nconst BoxSized = createToken(BoxSymbol, defaultOptions);\n\nexport const _703_TokenOptions = (\n  <>\n    <Box size=\"3\" />\n    <BoxSized />\n    <BoxSized size=\"2\" />\n  </>\n);\nexport const _703_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/token/token-options.js",
    output: "import { createToken, h, createFragment } from \"@virtualstate/fringe\";\nconst BoxSymbol = Symbol(\"📦\");\nconst Box = createToken(BoxSymbol);\nconst defaultOptions = {\n    size: \"1\"\n};\nconst BoxSized = createToken(BoxSymbol, defaultOptions);\nexport const _703_TokenOptions = (h(createFragment, null,\n    h(Box, { size: \"3\" }),\n    h(BoxSized, null),\n    h(BoxSized, { size: \"2\" })));\nexport const _703_URL = import.meta.url;\n//# sourceMappingURL=token-options.js.map",
    cleanerSource: "import { createToken, h, createFragment } from \"@virtualstate/fringe\";\n\ninterface BoxOptions extends Record<string, unknown> {\n  size: \"1\" | \"2\" | \"3\";\n}\n\nconst BoxSymbol = Symbol(\"📦\");\nconst Box = createToken<typeof BoxSymbol, BoxOptions>(BoxSymbol);\n\nconst defaultOptions: BoxOptions = {\n  size: \"1\"\n};\nconst BoxSized = createToken(BoxSymbol, defaultOptions);\n\nexport const Example = (\n  <>\n    <Box size=\"3\" />\n    <BoxSized />\n    <BoxSized size=\"2\" />\n  </>\n);",
    structure: "<>\n  <📦 size=\"3\" />\n  <📦 size=\"1\" />\n  <📦 size=\"2\" />\n</>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _704_ExampleInformation: ExampleInformation = {
    name: "TokenFunction",
    id: "704",
    exportedAs: "_704_TokenFunction",
    source: "import {\n  createNode,\n  Resolve,\n  ResolveSymbol,\n  ResolveTokenFn,\n  h,\n  ChildrenSource,\n  createFragment\n} from \"@virtualstate/fringe\";\n\n\nasync function *Inner() {\n\n  const z: ResolveTokenFn = createNode(Resolve, { wow: 1 });\n  const i: ResolveTokenFn = <Resolve base={Symbol(\"Cool\")} />\n  const s: typeof ResolveSymbol = z.source;\n\n  const k: ResolveTokenFn = createNode(z,{}, <p>Hello!</p>);\n  const j = createNode(i,{ hey: 6 }, <p>Hello!</p>);\n\n  const LabelAsComponentFirst = j;\n  const l: ResolveTokenFn = <LabelAsComponentFirst hi=\"!!!\" />\n\n  yield <hi>\n    {z}\n    {i}\n    {s}\n    {k}\n    {j}\n    {l}\n    {k({ property: 1 })}\n    {j({ property: 2 })}\n    {Resolve({ property: 3 })}\n  </hi>;\n}\n\nconst node = (\n  <Resolve>\n    <Inner />\n  </Resolve>\n);\n\nexport const _704_TokenFunction = node\nexport const _704_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/token/token-function.js",
    output: "import { createNode, Resolve, h } from \"@virtualstate/fringe\";\nasync function* Inner() {\n    const z = createNode(Resolve, { wow: 1 });\n    const i = h(Resolve, { base: Symbol(\"Cool\") });\n    const s = z.source;\n    const k = createNode(z, {}, h(\"p\", null, \"Hello!\"));\n    const j = createNode(i, { hey: 6 }, h(\"p\", null, \"Hello!\"));\n    const LabelAsComponentFirst = j;\n    const l = h(LabelAsComponentFirst, { hi: \"!!!\" });\n    yield h(\"hi\", null,\n        z,\n        i,\n        s,\n        k,\n        j,\n        l,\n        k({ property: 1 }),\n        j({ property: 2 }),\n        Resolve({ property: 3 }));\n}\nconst node = (h(Resolve, null,\n    h(Inner, null)));\nexport const _704_TokenFunction = node;\nexport const _704_URL = import.meta.url;\n//# sourceMappingURL=token-function.js.map",
    cleanerSource: "import {\n  createNode,\n  Resolve,\n  ResolveSymbol,\n  ResolveTokenFn,\n  h,\n  ChildrenSource,\n  createFragment\n} from \"@virtualstate/fringe\";\n\n\nasync function *Inner() {\n\n  const z: ResolveTokenFn = createNode(Resolve, { wow: 1 });\n  const i: ResolveTokenFn = <Resolve base={Symbol(\"Cool\")} />\n  const s: typeof ResolveSymbol = z.source;\n\n  const k: ResolveTokenFn = createNode(z,{}, <p>Hello!</p>);\n  const j = createNode(i,{ hey: 6 }, <p>Hello!</p>);\n\n  const LabelAsComponentFirst = j;\n  const l: ResolveTokenFn = <LabelAsComponentFirst hi=\"!!!\" />\n\n  yield <hi>\n    {z}\n    {i}\n    {s}\n    {k}\n    {j}\n    {l}\n    {k({ property: 1 })}\n    {j({ property: 2 })}\n    {Resolve({ property: 3 })}\n  </hi>;\n}\n\nconst node = (\n  <Resolve>\n    <Inner />\n  </Resolve>\n);\n\nexport const Example = node",
    structure: "<Resolve>\n  <hi>\n    <Resolve wow={1} />\n    <Resolve base={Symbol(\"Cool\")} />\n    {Symbol(\"Resolve\")}\n    <Resolve wow={1}>\n      <p>\n        {\"Hello!\"}\n      </p>\n    </Resolve>\n    <Resolve base={Symbol(\"Cool\")} hey={6}>\n      <p>\n        {\"Hello!\"}\n      </p>\n    </Resolve>\n    <Resolve\n      base={Symbol(\"Cool\")}\n      hey={6}\n      hi=\"!!!\"\n    >\n      <p>\n        {\"Hello!\"}\n      </p>\n    </Resolve>\n    <Resolve wow={1} property={1}>\n      <p>\n        {\"Hello!\"}\n      </p>\n    </Resolve>\n    <Resolve\n      base={Symbol(\"Cool\")}\n      hey={6}\n      property={2}\n    >\n      <p>\n        {\"Hello!\"}\n      </p>\n    </Resolve>\n    <Resolve property={3} />\n  </hi>\n</Resolve>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _705_ExampleInformation: ExampleInformation = {
    name: "TokenExtendable",
    id: "705",
    exportedAs: "_705_TokenExtendable",
    source: "import {\n  createNode,\n  Resolve,\n  ResolveSymbol,\n  ResolveTokenFn,\n  h,\n  ChildrenSource,\n  createFragment, createToken\n} from \"@virtualstate/fringe\";\n\nconst Token = createToken(\"implementation-name\", {\n  root: false\n});\n\nconst Referenced = <Token value={3} />\n\nconst Node = (\n  <Token root={true}>\n    <Token />\n    <Token value={1} />\n    <Token value={2} />\n    <Referenced type=\"number\" />\n  </Token>\n)\n\nexport const _705_TokenExtendable = Node;\nexport const _705_URL = import.meta.url;\n\nexport const _706_TokenExtendableAgain = <Node new={true} />;\nexport const _706_URL = import.meta.url;\n\nexport const _707_TokenExtendableChildren = (\n  <Node new={false}>\n    <Token value={true} type=\"boolean\" />\n  </Node>\n) ;\nexport const _707_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/token/token-extendable.js",
    output: "import { h, createToken } from \"@virtualstate/fringe\";\nconst Token = createToken(\"implementation-name\", {\n    root: false\n});\nconst Referenced = h(Token, { value: 3 });\nconst Node = (h(Token, { root: true },\n    h(Token, null),\n    h(Token, { value: 1 }),\n    h(Token, { value: 2 }),\n    h(Referenced, { type: \"number\" })));\nexport const _705_TokenExtendable = Node;\nexport const _705_URL = import.meta.url;\nexport const _706_TokenExtendableAgain = h(Node, { new: true });\nexport const _706_URL = import.meta.url;\nexport const _707_TokenExtendableChildren = (h(Node, { new: false },\n    h(Token, { value: true, type: \"boolean\" })));\nexport const _707_URL = import.meta.url;\n//# sourceMappingURL=token-extendable.js.map",
    cleanerSource: "import {\n  createNode,\n  Resolve,\n  ResolveSymbol,\n  ResolveTokenFn,\n  h,\n  ChildrenSource,\n  createFragment, createToken\n} from \"@virtualstate/fringe\";\n\nconst Token = createToken(\"implementation-name\", {\n  root: false\n});\n\nconst Referenced = <Token value={3} />\n\nconst Node = (\n  <Token root={true}>\n    <Token />\n    <Token value={1} />\n    <Token value={2} />\n    <Referenced type=\"number\" />\n  </Token>\n)\n\nexport const Example = Node;",
    structure: "<implementation-name root={true}>\n  <implementation-name root={false} />\n  <implementation-name root={false} value={1} />\n  <implementation-name root={false} value={2} />\n  <implementation-name\n    root={false}\n    value={3}\n    type=\"number\"\n   />\n</implementation-name>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _706_ExampleInformation: ExampleInformation = {
    name: "TokenExtendableAgain",
    id: "706",
    exportedAs: "_706_TokenExtendableAgain",
    source: "import {\n  createNode,\n  Resolve,\n  ResolveSymbol,\n  ResolveTokenFn,\n  h,\n  ChildrenSource,\n  createFragment, createToken\n} from \"@virtualstate/fringe\";\n\nconst Token = createToken(\"implementation-name\", {\n  root: false\n});\n\nconst Referenced = <Token value={3} />\n\nconst Node = (\n  <Token root={true}>\n    <Token />\n    <Token value={1} />\n    <Token value={2} />\n    <Referenced type=\"number\" />\n  </Token>\n)\n\nexport const _705_TokenExtendable = Node;\nexport const _705_URL = import.meta.url;\n\nexport const _706_TokenExtendableAgain = <Node new={true} />;\nexport const _706_URL = import.meta.url;\n\nexport const _707_TokenExtendableChildren = (\n  <Node new={false}>\n    <Token value={true} type=\"boolean\" />\n  </Node>\n) ;\nexport const _707_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/token/token-extendable.js",
    output: "import { h, createToken } from \"@virtualstate/fringe\";\nconst Token = createToken(\"implementation-name\", {\n    root: false\n});\nconst Referenced = h(Token, { value: 3 });\nconst Node = (h(Token, { root: true },\n    h(Token, null),\n    h(Token, { value: 1 }),\n    h(Token, { value: 2 }),\n    h(Referenced, { type: \"number\" })));\nexport const _705_TokenExtendable = Node;\nexport const _705_URL = import.meta.url;\nexport const _706_TokenExtendableAgain = h(Node, { new: true });\nexport const _706_URL = import.meta.url;\nexport const _707_TokenExtendableChildren = (h(Node, { new: false },\n    h(Token, { value: true, type: \"boolean\" })));\nexport const _707_URL = import.meta.url;\n//# sourceMappingURL=token-extendable.js.map",
    cleanerSource: "import {\n  createNode,\n  Resolve,\n  ResolveSymbol,\n  ResolveTokenFn,\n  h,\n  ChildrenSource,\n  createFragment, createToken\n} from \"@virtualstate/fringe\";\n\nconst Token = createToken(\"implementation-name\", {\n  root: false\n});\n\nconst Referenced = <Token value={3} />\n\nconst Node = (\n  <Token root={true}>\n    <Token />\n    <Token value={1} />\n    <Token value={2} />\n    <Referenced type=\"number\" />\n  </Token>\n)\n\nexport const Example = Node;",
    structure: "<implementation-name root={true} new={true}>\n  <implementation-name root={false} />\n  <implementation-name root={false} value={1} />\n  <implementation-name root={false} value={2} />\n  <implementation-name\n    root={false}\n    value={3}\n    type=\"number\"\n   />\n</implementation-name>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _707_ExampleInformation: ExampleInformation = {
    name: "TokenExtendableChildren",
    id: "707",
    exportedAs: "_707_TokenExtendableChildren",
    source: "import {\n  createNode,\n  Resolve,\n  ResolveSymbol,\n  ResolveTokenFn,\n  h,\n  ChildrenSource,\n  createFragment, createToken\n} from \"@virtualstate/fringe\";\n\nconst Token = createToken(\"implementation-name\", {\n  root: false\n});\n\nconst Referenced = <Token value={3} />\n\nconst Node = (\n  <Token root={true}>\n    <Token />\n    <Token value={1} />\n    <Token value={2} />\n    <Referenced type=\"number\" />\n  </Token>\n)\n\nexport const _705_TokenExtendable = Node;\nexport const _705_URL = import.meta.url;\n\nexport const _706_TokenExtendableAgain = <Node new={true} />;\nexport const _706_URL = import.meta.url;\n\nexport const _707_TokenExtendableChildren = (\n  <Node new={false}>\n    <Token value={true} type=\"boolean\" />\n  </Node>\n) ;\nexport const _707_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/token/token-extendable.js",
    output: "import { h, createToken } from \"@virtualstate/fringe\";\nconst Token = createToken(\"implementation-name\", {\n    root: false\n});\nconst Referenced = h(Token, { value: 3 });\nconst Node = (h(Token, { root: true },\n    h(Token, null),\n    h(Token, { value: 1 }),\n    h(Token, { value: 2 }),\n    h(Referenced, { type: \"number\" })));\nexport const _705_TokenExtendable = Node;\nexport const _705_URL = import.meta.url;\nexport const _706_TokenExtendableAgain = h(Node, { new: true });\nexport const _706_URL = import.meta.url;\nexport const _707_TokenExtendableChildren = (h(Node, { new: false },\n    h(Token, { value: true, type: \"boolean\" })));\nexport const _707_URL = import.meta.url;\n//# sourceMappingURL=token-extendable.js.map",
    cleanerSource: "import {\n  createNode,\n  Resolve,\n  ResolveSymbol,\n  ResolveTokenFn,\n  h,\n  ChildrenSource,\n  createFragment, createToken\n} from \"@virtualstate/fringe\";\n\nconst Token = createToken(\"implementation-name\", {\n  root: false\n});\n\nconst Referenced = <Token value={3} />\n\nconst Node = (\n  <Token root={true}>\n    <Token />\n    <Token value={1} />\n    <Token value={2} />\n    <Referenced type=\"number\" />\n  </Token>\n)\n\nexport const Example = Node;",
    structure: "<implementation-name root={true} new={false}>\n  <implementation-name\n    root={false}\n    value={true}\n    type=\"boolean\"\n   />\n</implementation-name>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _708_ExampleInformation: ExampleInformation = {
    name: "TokenDefine",
    id: "708",
    exportedAs: "_708_TokenDefine",
    source: "import {\n  createNode,\n  Resolve,\n  ResolveSymbol,\n  ResolveTokenFn,\n  h,\n  ChildrenSource,\n  createFragment,\n  createToken\n} from \"@virtualstate/fringe\";\n\nfunction define() {\n  return {\n    Token: <token-name />,\n    Button: <button />\n  }\n}\n\nconst { Token, Button } = define();\nexport const _708_TokenDefine= (\n  <Token new={false}>\n    <Token value={true} type=\"boolean\" />\n    <Button onClick={() => {}} />\n  </Token>\n) ;\nexport const _708_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/token/token-h.js",
    output: "import { h } from \"@virtualstate/fringe\";\nfunction define() {\n    return {\n        Token: h(\"token-name\", null),\n        Button: h(\"button\", null)\n    };\n}\nconst { Token, Button } = define();\nexport const _708_TokenDefine = (h(Token, { new: false },\n    h(Token, { value: true, type: \"boolean\" }),\n    h(Button, { onClick: () => { } })));\nexport const _708_URL = import.meta.url;\n//# sourceMappingURL=token-h.js.map",
    cleanerSource: "import {\n  createNode,\n  Resolve,\n  ResolveSymbol,\n  ResolveTokenFn,\n  h,\n  ChildrenSource,\n  createFragment,\n  createToken\n} from \"@virtualstate/fringe\";\n\nfunction define() {\n  return {\n    Token: <token-name />,\n    Button: <button />\n  }\n}\n\nconst { Token, Button } = define();\nexport const _708_TokenDefine= (\n  <Token new={false}>\n    <Token value={true} type=\"boolean\" />\n    <Button onClick={() => {}} />\n  </Token>\n) ;",
    structure: "<token-name new={false}>\n  <token-name value={true} type=\"boolean\" />\n  <button onClick={() => undefined} />\n</token-name>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _709_ExampleInformation: ExampleInformation = {
    name: "TokenDefine",
    id: "709",
    exportedAs: "_709_TokenDefine",
    source: "import {\n  createNode,\n  Resolve,\n  ResolveSymbol,\n  ResolveTokenFn,\n  h,\n  ChildrenSource,\n  createFragment,\n  createToken\n} from \"@virtualstate/fringe\";\n\nasync function fakeImport() {\n  return {\n    Token: createToken(\"override!\")\n  };\n}\n\nasync function define(importPromise = fakeImport()) {\n  const imported = await importPromise;\n  return {\n    Token: <token-name />,\n    Button: (\n      <button>\n        <span>Hello!</span>\n        <span>By default children are included</span>\n      </button>\n    ),\n    ...imported,\n    ...(await import(\"./token-extendable-example-tokens.js\"))\n  }\n}\n\nconst { Token, Button, Example } = await define();\n\nexport const _709_TokenDefine = (\n  <Token new={false}>\n    <Token value={true} type=\"boolean\" />\n    <Button onClick={() => {}} />\n    <Example />\n  </Token>\n) ;\nexport const _709_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/token/token-h-children.js",
    output: "import { h, createToken } from \"@virtualstate/fringe\";\nasync function fakeImport() {\n    return {\n        Token: createToken(\"override!\")\n    };\n}\nasync function define(importPromise = fakeImport()) {\n    const imported = await importPromise;\n    return {\n        Token: h(\"token-name\", null),\n        Button: (h(\"button\", null,\n            h(\"span\", null, \"Hello!\"),\n            h(\"span\", null, \"By default children are included\"))),\n        ...imported,\n        ...(await import(\"./token-extendable-example-tokens.js\"))\n    };\n}\nconst { Token, Button, Example } = await define();\nexport const _709_TokenDefine = (h(Token, { new: false },\n    h(Token, { value: true, type: \"boolean\" }),\n    h(Button, { onClick: () => { } }),\n    h(Example, null)));\nexport const _709_URL = import.meta.url;\n//# sourceMappingURL=token-h-children.js.map",
    cleanerSource: "import {\n  createNode,\n  Resolve,\n  ResolveSymbol,\n  ResolveTokenFn,\n  h,\n  ChildrenSource,\n  createFragment,\n  createToken\n} from \"@virtualstate/fringe\";\n\nasync function fakeImport() {\n  return {\n    Token: createToken(\"override!\")\n  };\n}\n\nasync function define(importPromise = fakeImport()) {\n  const imported = await importPromise;\n  return {\n    Token: <token-name />,\n    Button: (\n      <button>\n        <span>Hello!</span>\n        <span>By default children are included</span>\n      </button>\n    ),\n    ...imported,\n    ...(await import(\"./token-extendable-example-tokens.js\"))\n  }\n}\n\nconst { Token, Button, Example } = await define();\n\nexport const Example = (\n  <Token new={false}>\n    <Token value={true} type=\"boolean\" />\n    <Button onClick={() => {}} />\n    <Example />\n  </Token>\n) ;",
    structure: "<override! new={false}>\n  <override! value={true} type=\"boolean\" />\n  <button onClick={() => undefined}>\n    <span>\n      {\"Hello!\"}\n    </span>\n    <span>\n      {\"By default children are included\"}\n    </span>\n  </button>\n  <Example property={1}>\n    {\"Value\"}\n  </Example>\n</override!>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _710_ExampleInformation: ExampleInformation = {
    name: "Token",
    id: "710",
    exportedAs: "_710_Token",
    source: "import { h } from \"@virtualstate/fringe\";\n\nconst Token = (\n  <test class=\"default-class\">\n    <inner>Hello!</inner>\n  </test>\n);\n\nconst output = (\n  <hello class=\"main\">\n    <Token first={true} />\n    <Token class=\"content\">\n      This is the content for this middle one\n    </Token>\n    <Token last={true} class=\"footer\">\n      This is the content for the last one\n    </Token>\n  </hello>\n)\n\nexport const _710_Token = output;\nexport const _710_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/token/token-extendable-top-level.js",
    output: "import { h } from \"@virtualstate/fringe\";\nconst Token = (h(\"test\", { class: \"default-class\" },\n    h(\"inner\", null, \"Hello!\")));\nconst output = (h(\"hello\", { class: \"main\" },\n    h(Token, { first: true }),\n    h(Token, { class: \"content\" }, \"This is the content for this middle one\"),\n    h(Token, { last: true, class: \"footer\" }, \"This is the content for the last one\")));\nexport const _710_Token = output;\nexport const _710_URL = import.meta.url;\n//# sourceMappingURL=token-extendable-top-level.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\n\nconst Token = (\n  <test class=\"default-class\">\n    <inner>Hello!</inner>\n  </test>\n);\n\nconst output = (\n  <hello class=\"main\">\n    <Token first={true} />\n    <Token class=\"content\">\n      This is the content for this middle one\n    </Token>\n    <Token last={true} class=\"footer\">\n      This is the content for the last one\n    </Token>\n  </hello>\n)\n\nexport const Example = output;",
    structure: "<hello class=\"main\">\n  <test class=\"default-class\" first={true}>\n    <inner>\n      {\"Hello!\"}\n    </inner>\n  </test>\n  <test class=\"content\">\n    {\"This is the content for this middle one\"}\n  </test>\n  <test class=\"footer\" last={true}>\n    {\"This is the content for the last one\"}\n  </test>\n</hello>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _801_ExampleInformation: ExampleInformation = {
    name: "Iterable",
    id: "801",
    exportedAs: "_801_Iterable",
    source: "import { h, i, createFragment } from \"@virtualstate/x\";\n\nconst source: Iterable<number> = [\n  1,\n  2,\n  3,\n  4,\n  5\n];\n\nfunction Iterable() {\n  return (\n    <>\n      {\n        i(source)\n          .skip(1)\n          .take(3)\n          .map(value => value * 5)\n      }\n    </>\n  );\n}\n\nexport const _801_Iterable = <Iterable />\nexport const _801_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/iterable/iterable.js",
    output: "import { h, i, createFragment } from \"@virtualstate/x\";\nconst source = [\n    1,\n    2,\n    3,\n    4,\n    5\n];\nfunction Iterable() {\n    return (h(createFragment, null, i(source)\n        .skip(1)\n        .take(3)\n        .map(value => value * 5)));\n}\nexport const _801_Iterable = h(Iterable, null);\nexport const _801_URL = import.meta.url;\n//# sourceMappingURL=iterable.js.map",
    cleanerSource: "import { h, i, createFragment } from \"@virtualstate/x\";\n\nconst source: Iterable<number> = [\n  1,\n  2,\n  3,\n  4,\n  5\n];\n\nfunction Iterable() {\n  return (\n    <>\n      {\n        i(source)\n          .skip(1)\n          .take(3)\n          .map(value => value * 5)\n      }\n    </>\n  );\n}\n\nexport const Example = <Iterable />",
    structure: "<>\n  {10}\n  {15}\n  {20}\n</>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _802_ExampleInformation: ExampleInformation = {
    name: "IterableFunction",
    id: "802",
    exportedAs: "_802_IterableFunction",
    source: "import { h, i, createFragment } from \"@virtualstate/x\";\n\nfunction *source(): Iterable<number> {\n  yield 1;\n  yield 2;\n  yield 3;\n  yield 4;\n  yield 5;\n}\n\nfunction Iterable() {\n  return (\n    <>\n      {\n        i(source())\n          .skip(1)\n          .take(3)\n          .map(value => value * 5)\n      }\n    </>\n  );\n}\n\nexport const _802_IterableFunction = <Iterable />\nexport const _802_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/iterable/iterable-source.js",
    output: "import { h, i, createFragment } from \"@virtualstate/x\";\nfunction* source() {\n    yield 1;\n    yield 2;\n    yield 3;\n    yield 4;\n    yield 5;\n}\nfunction Iterable() {\n    return (h(createFragment, null, i(source())\n        .skip(1)\n        .take(3)\n        .map(value => value * 5)));\n}\nexport const _802_IterableFunction = h(Iterable, null);\nexport const _802_URL = import.meta.url;\n//# sourceMappingURL=iterable-source.js.map",
    cleanerSource: "import { h, i, createFragment } from \"@virtualstate/x\";\n\nfunction *source(): Iterable<number> {\n  yield 1;\n  yield 2;\n  yield 3;\n  yield 4;\n  yield 5;\n}\n\nfunction Iterable() {\n  return (\n    <>\n      {\n        i(source())\n          .skip(1)\n          .take(3)\n          .map(value => value * 5)\n      }\n    </>\n  );\n}\n\nexport const Example = <Iterable />",
    structure: "<>\n  {10}\n  {15}\n  {20}\n</>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _803_ExampleInformation: ExampleInformation = {
    name: "IterableVNode",
    id: "803",
    exportedAs: "_803_IterableVNode",
    source: "import {h, a, createFragment, VNode, createToken} from \"@virtualstate/x\";\nimport { read } from \"./read\";\n\nasync function *Source() {\n  yield \"🐦\";\n  yield \"❤️\";\n  yield \"💪\";\n  yield \"🦿\";\n}\n\nconst Box = createToken(Symbol(\"📦\"));\n\nfunction Iterable(o: unknown, state: VNode) {\n  return (\n    <>\n      {\n        a(read(state))\n          .map(child => (\n            <Box>\n              {child}\n            </Box>\n          ))\n      }\n    </>\n  );\n}\n\nexport const _803_IterableVNode = (\n  <Iterable>\n    <Source />\n  </Iterable>\n)\nexport const _803_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/iterable/iterable-nodes.js",
    output: "import { h, a, createFragment, createToken } from \"@virtualstate/x\";\nimport { read } from \"./read.js\";\nasync function* Source() {\n    yield \"🐦\";\n    yield \"❤️\";\n    yield \"💪\";\n    yield \"🦿\";\n}\nconst Box = createToken(Symbol(\"📦\"));\nfunction Iterable(o, state) {\n    return (h(createFragment, null, a(read(state))\n        .map(child => (h(Box, null, child)))));\n}\nexport const _803_IterableVNode = (h(Iterable, null,\n    h(Source, null)));\nexport const _803_URL = import.meta.url;\n//# sourceMappingURL=iterable-nodes.js.map",
    cleanerSource: "import {h, a, createFragment, VNode, createToken} from \"@virtualstate/x\";\nimport { read } from \"./read\";\n\nasync function *Source() {\n  yield \"🐦\";\n  yield \"❤️\";\n  yield \"💪\";\n  yield \"🦿\";\n}\n\nconst Box = createToken(Symbol(\"📦\"));\n\nfunction Iterable(o, state: VNode) {\n  return (\n    <>\n      {\n        a(read(state))\n          .map(child => (\n            <Box>\n              {child}\n            </Box>\n          ))\n      }\n    </>\n  );\n}\n\nexport const Example = (\n  <Iterable>\n    <Source />\n  </Iterable>\n)",
    structure: "<>\n  <📦>\n    {\"🐦\"}\n  </📦>\n  <📦>\n    {\"❤️\"}\n  </📦>\n  <📦>\n    {\"💪\"}\n  </📦>\n  <📦>\n    {\"🦿\"}\n  </📦>\n</>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _804_ExampleInformation: ExampleInformation = {
    name: "IterableUnion",
    id: "804",
    exportedAs: "_804_IterableUnion",
    source: "import {h, a, createFragment, VNode, createToken} from \"@virtualstate/x\";\nimport { read } from \"./read\";\nimport {union} from \"@virtualstate/union\";\n\nasync function *Horse() {\n  yield \"🐴\";\n  yield \"💪\";\n}\n\nasync function *Bird() {\n  yield \"🐦\";\n  yield \"❤️\";\n}\n\nasync function *Robot() {\n  yield \"🤖\";\n  yield \"🤳\";\n}\n\nasync function *Component() {\n  for await (const [horse, bird, robot] of union([\n    Horse(),\n    Bird(),\n    Robot()\n  ])) {\n    console.log({ horse, bird, robot })\n    yield [horse, bird, robot];\n  }\n}\n\nexport const _804_IterableUnion = (\n  <Component />\n)\nexport const _804_URL = import.meta.url;\nexport const _804_Info = {\n  producesOutput: true\n}\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/iterable/iterable-union.js",
    output: "import { h } from \"@virtualstate/x\";\nimport { union } from \"@virtualstate/union\";\nasync function* Horse() {\n    yield \"🐴\";\n    yield \"💪\";\n}\nasync function* Bird() {\n    yield \"🐦\";\n    yield \"❤️\";\n}\nasync function* Robot() {\n    yield \"🤖\";\n    yield \"🤳\";\n}\nasync function* Component() {\n    for await (const [horse, bird, robot] of union([\n        Horse(),\n        Bird(),\n        Robot()\n    ])) {\n        console.log({ horse, bird, robot });\n        yield [horse, bird, robot];\n    }\n}\nexport const _804_IterableUnion = (h(Component, null));\nexport const _804_URL = import.meta.url;\nexport const _804_Info = {\n    producesOutput: true\n};\n//# sourceMappingURL=iterable-union.js.map",
    cleanerSource: "import {h, a, createFragment, VNode, createToken} from \"@virtualstate/x\";\nimport { read } from \"./read\";\nimport {union} from \"@virtualstate/union\";\n\nasync function *Horse() {\n  yield \"🐴\";\n  yield \"💪\";\n}\n\nasync function *Bird() {\n  yield \"🐦\";\n  yield \"❤️\";\n}\n\nasync function *Robot() {\n  yield \"🤖\";\n  yield \"🤳\";\n}\n\nasync function *Component() {\n  for await (const [horse, bird, robot] of union([\n    Horse(),\n    Bird(),\n    Robot()\n  ])) {\n    console.log({ horse, bird, robot })\n    yield [horse, bird, robot];\n  }\n}\n\nexport const Example = (\n  <Component />\n)",
    structure: "<>\n  {\"💪\"}\n  {\"❤️\"}\n  {\"🤳\"}\n</>",
    info: {"producesOutput":true},
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _901_ExampleInformation: ExampleInformation = {
    name: "Transform",
    id: "901",
    exportedAs: "_901_Transform",
    source: "import {Source, VNode, h, createToken, createFragment, Fragment} from \"@virtualstate/fringe\";\nimport { Hook, Mutation } from \"@virtualstate/hooks-extended\";\n\nfunction FnComponent() {\n  return \"📜\";\n}\n\nconst ComponentSymbol = Symbol(FnComponent.name);\nconst Component = createToken(ComponentSymbol);\n\nconst functions = new Map<unknown, Source>();\nfunctions.set(ComponentSymbol, FnComponent);\n\nexport interface TransformOptions {\n  map: Map<unknown, Source>\n}\n\n/**\n * @experimental\n */\nexport function Transform({ map }: TransformOptions, state: VNode) {\n  return (\n    <Hook>\n      <Mutation is={is} mutate={mutate}>\n        {state}\n      </Mutation>\n    </Hook>\n  )\n\n  function is(value: VNode): value is VNode {\n    return map.has(value.source)\n  }\n\n  function mutate(value: VNode) {\n    return h(map.get(value.source), value.options, {\n      reference: Fragment,\n      children: value.children\n    })\n  }\n}\n\nexport const _901_Transform = (\n  <Transform map={functions}>\n    <Component />\n  </Transform>\n)\nexport const _901_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/transform/transform.js",
    output: "import { h, createToken, Fragment } from \"@virtualstate/fringe\";\nimport { Hook, Mutation } from \"@virtualstate/hooks-extended\";\nfunction FnComponent() {\n    return \"📜\";\n}\nconst ComponentSymbol = Symbol(FnComponent.name);\nconst Component = createToken(ComponentSymbol);\nconst functions = new Map();\nfunctions.set(ComponentSymbol, FnComponent);\n/**\n * @experimental\n */\nexport function Transform({ map }, state) {\n    return (h(Hook, null,\n        h(Mutation, { is: is, mutate: mutate }, state)));\n    function is(value) {\n        return map.has(value.source);\n    }\n    function mutate(value) {\n        return h(map.get(value.source), value.options, {\n            reference: Fragment,\n            children: value.children\n        });\n    }\n}\nexport const _901_Transform = (h(Transform, { map: functions },\n    h(Component, null)));\nexport const _901_URL = import.meta.url;\n//# sourceMappingURL=transform.js.map",
    cleanerSource: "import {Source, VNode, h, createToken, createFragment, Fragment} from \"@virtualstate/fringe\";\nimport { Hook, Mutation } from \"@virtualstate/hooks-extended\";\n\nfunction FnComponent() {\n  return \"📜\";\n}\n\nconst ComponentSymbol = Symbol(FnComponent.name);\nconst Component = createToken(ComponentSymbol);\n\nconst functions = new Map<unknown, Source>();\nfunctions.set(ComponentSymbol, FnComponent);\n\nexport interface TransformOptions {\n  map: Map<unknown, Source>\n}\n\n/**\n * @experimental\n */\nexport function Transform({ map }: TransformOptions, state: VNode) {\n  return (\n    <Hook>\n      <Mutation is={is} mutate={mutate}>\n        {state}\n      </Mutation>\n    </Hook>\n  )\n\n  function is(value: VNode): value is VNode {\n    return map.has(value.source)\n  }\n\n  function mutate(value: VNode) {\n    return h(map.get(value.source), value.options, {\n      reference: Fragment,\n      children: value.children\n    })\n  }\n}\n\nexport const Example = (\n  <Transform map={functions}>\n    <Component />\n  </Transform>\n)",
    structure: "\"📜\"",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _902_ExampleInformation: ExampleInformation = {
    name: "TransformString",
    id: "902",
    exportedAs: "_902_TransformString",
    source: "import { Source, h, createToken } from \"@virtualstate/fringe\";\nimport { Transform } from \"@virtualstate/examples\";\n\nfunction FnComponent({ meta }) {\n  return `${meta} 📜`;\n}\n\nconst ComponentString = FnComponent.name;\nconst Component = createToken(ComponentString);\n\nconst functions = new Map<unknown, Source>();\nfunctions.set(ComponentString, FnComponent);\n\nexport const _902_TransformString = (\n  <Transform map={functions}>\n    <Component meta=\"🌵\" />\n  </Transform>\n)\nexport const _902_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/transform/transform-string.js",
    output: "import { h, createToken } from \"@virtualstate/fringe\";\nimport { Transform } from \"@virtualstate/examples\";\nfunction FnComponent({ meta }) {\n    return `${meta} 📜`;\n}\nconst ComponentString = FnComponent.name;\nconst Component = createToken(ComponentString);\nconst functions = new Map();\nfunctions.set(ComponentString, FnComponent);\nexport const _902_TransformString = (h(Transform, { map: functions },\n    h(Component, { meta: \"\\uD83C\\uDF35\" })));\nexport const _902_URL = import.meta.url;\n//# sourceMappingURL=transform-string.js.map",
    cleanerSource: "import { Source, h, createToken } from \"@virtualstate/fringe\";\nimport { Transform } from \"@virtualstate/examples\";\n\nfunction FnComponent({ meta }) {\n  return `${meta} 📜`;\n}\n\nconst ComponentString = FnComponent.name;\nconst Component = createToken(ComponentString);\n\nconst functions = new Map<unknown, Source>();\nfunctions.set(ComponentString, FnComponent);\n\nexport const Example = (\n  <Transform map={functions}>\n    <Component meta=\"🌵\" />\n  </Transform>\n)",
    structure: "\"🌵 📜\"",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _903_ExampleInformation: ExampleInformation = {
    name: "TransformStatic",
    id: "903",
    exportedAs: "_903_TransformStatic",
    source: "import {h} from \"@virtualstate/examples\";\nimport { Hook, Mutation } from \"@virtualstate/hooks-extended\";\nimport {\n  ChildrenSource,\n  createNode,\n  Fragment,\n  Instance,\n  isScalarVNode, isVNode,\n  SourceReference,\n  VNode\n} from \"@virtualstate/fringe\";\nimport { readAllDrain } from \"./read\";\nimport {source} from \"iterable\";\n\ntype VNodeWithChildren = VNode & { children: AsyncIterable<VNode[]> }\n\n/**\n * @experimental\n */\nexport const IsStaticSymbol = Symbol(\"Is Static\");\n\nexport interface StaticOptions {\n  reference?: boolean;\n  source?: boolean;\n  yieldAllChildren?: boolean\n}\n\n/**\n * @experimental\n */\nexport class Static {\n\n  readonly #weakTree = new WeakMap<VNode, VNode>();\n  readonly #referenceTree = new Map<SourceReference, VNode>();\n  readonly #sourceTree = new Map<unknown, VNode>();\n  readonly #weakChildrenRecording = new WeakMap<VNode, VNode[][]>();\n  readonly #weakChildrenRecordingInProgress = new WeakSet<VNode>();\n  readonly #state: VNode = createNode();\n  readonly #options: StaticOptions = {};\n\n  constructor(options: StaticOptions, state: VNode) {\n    this.#state = state;\n    this.#options = options;\n  }\n\n  async *[Symbol.asyncIterator]() {\n    const weakTree = this.#weakTree;\n    const referenceTree = this.#referenceTree;\n    const sourceTree = this.#sourceTree;\n    const weakChildrenRecording = this.#weakChildrenRecording;\n    const weakChildrenRecordingInProgress = this.#weakChildrenRecordingInProgress;\n    const options = this.#options;\n\n    yield mutate(this.#state);\n\n    // We have a static copy of this.#state from here on\n\n    function mutate(value: VNode): VNode {\n      const existing = getExisting(value);\n      if (existing) return existing;\n      return make(value);\n    }\n\n    function make(value: VNode): VNode {\n      if (isScalarVNode(value) || value[IsStaticSymbol] || !value.children) {\n        return value;\n      }\n      const proxied = new Proxy(value, {\n        get(target: VNode, p: keyof VNode) {\n          if (typeof p === \"symbol\" && p === IsStaticSymbol) {\n            return true;\n          }\n          if (p !== \"children\") {\n            return target[p];\n          }\n          if (!isVNodeWithChildren(target)) {\n            return target.children;\n          }\n          const asyncIterable = replayChildrenViaRecording(target);\n          const recording = weakChildrenRecording.get(target);\n          if (recording?.length) {\n            asyncIterable[ChildrenSource] = recording[recording.length - 1];\n          }\n          return asyncIterable;\n        }\n      });\n      weakTree.set(value, proxied);\n      if (options.reference) {\n        referenceTree.set(value.reference, proxied);\n      }\n      if (options.source) {\n        sourceTree.set(value.source, proxied);\n      }\n      return proxied;\n    }\n\n    function isVNodeWithChildren(node: VNode): node is VNodeWithChildren {\n      return !!node.children;\n    }\n\n    async function *replayChildrenViaRecording(node: VNodeWithChildren): AsyncIterable<VNode[]> {\n      const existingRecording = weakChildrenRecording.get(node);\n      if (existingRecording) {\n        return yield * existingRecording;\n      }\n      if (weakChildrenRecordingInProgress.has(node)) {\n        throw new Error(\"Initial children recording in progress, pre-record if multiple consumers are required\");\n      }\n      weakChildrenRecordingInProgress.add(node);\n      const recording: VNode[][] = [];\n      for await (const children of node.children) {\n        const mapped = children.map(mutate)\n        yield mapped;\n        if (!options.yieldAllChildren) {\n          recording[0] = mapped;\n        } else {\n          recording.push(mapped);\n        }\n      }\n      weakChildrenRecording.set(node, recording);\n      weakChildrenRecordingInProgress.delete(node);\n    }\n\n    function getExisting(value: VNode): VNode | undefined {\n      const weakExisting = weakTree.get(value);\n      if (weakExisting) {\n        return weakExisting;\n      }\n      const referenceExisting = options.reference && referenceTree.get(value.reference);\n      if (referenceExisting) {\n        return referenceExisting;\n      }\n      const sourceExisting = options.source && sourceTree.get(value.source);\n      if (sourceExisting) {\n        return sourceExisting;\n      }\n      return undefined;\n    }\n  }\n\n}\n\nfunction Component({ meta }) {\n  return (\n    <innerContainer>\n      {meta} ❤️\n    </innerContainer>\n  );\n}\n\nconst instance = (\n  <Static>\n    <Component meta=\"🦿\" />\n  </Static>\n);\n\nawait readAllDrain(instance);\nawait readAllDrain(instance); // We are static now\n\nexport const _903_TransformStatic = (\n  <container class=\"example\">\n    {instance}\n  </container>\n)\nexport const _903_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/transform/static.js",
    output: "import { h } from \"@virtualstate/examples\";\nimport { ChildrenSource, createNode, isScalarVNode } from \"@virtualstate/fringe\";\nimport { readAllDrain } from \"./read.js\";\n/**\n * @experimental\n */\nexport const IsStaticSymbol = Symbol(\"Is Static\");\n/**\n * @experimental\n */\nexport class Static {\n    #weakTree = new WeakMap();\n    #referenceTree = new Map();\n    #sourceTree = new Map();\n    #weakChildrenRecording = new WeakMap();\n    #weakChildrenRecordingInProgress = new WeakSet();\n    #state = createNode();\n    #options = {};\n    constructor(options, state) {\n        this.#state = state;\n        this.#options = options;\n    }\n    async *[Symbol.asyncIterator]() {\n        const weakTree = this.#weakTree;\n        const referenceTree = this.#referenceTree;\n        const sourceTree = this.#sourceTree;\n        const weakChildrenRecording = this.#weakChildrenRecording;\n        const weakChildrenRecordingInProgress = this.#weakChildrenRecordingInProgress;\n        const options = this.#options;\n        yield mutate(this.#state);\n        // We have a static copy of this.#state from here on\n        function mutate(value) {\n            const existing = getExisting(value);\n            if (existing)\n                return existing;\n            return make(value);\n        }\n        function make(value) {\n            if (isScalarVNode(value) || value[IsStaticSymbol] || !value.children) {\n                return value;\n            }\n            const proxied = new Proxy(value, {\n                get(target, p) {\n                    if (typeof p === \"symbol\" && p === IsStaticSymbol) {\n                        return true;\n                    }\n                    if (p !== \"children\") {\n                        return target[p];\n                    }\n                    if (!isVNodeWithChildren(target)) {\n                        return target.children;\n                    }\n                    const asyncIterable = replayChildrenViaRecording(target);\n                    const recording = weakChildrenRecording.get(target);\n                    if (recording?.length) {\n                        asyncIterable[ChildrenSource] = recording[recording.length - 1];\n                    }\n                    return asyncIterable;\n                }\n            });\n            weakTree.set(value, proxied);\n            if (options.reference) {\n                referenceTree.set(value.reference, proxied);\n            }\n            if (options.source) {\n                sourceTree.set(value.source, proxied);\n            }\n            return proxied;\n        }\n        function isVNodeWithChildren(node) {\n            return !!node.children;\n        }\n        async function* replayChildrenViaRecording(node) {\n            const existingRecording = weakChildrenRecording.get(node);\n            if (existingRecording) {\n                return yield* existingRecording;\n            }\n            if (weakChildrenRecordingInProgress.has(node)) {\n                throw new Error(\"Initial children recording in progress, pre-record if multiple consumers are required\");\n            }\n            weakChildrenRecordingInProgress.add(node);\n            const recording = [];\n            for await (const children of node.children) {\n                const mapped = children.map(mutate);\n                yield mapped;\n                if (!options.yieldAllChildren) {\n                    recording[0] = mapped;\n                }\n                else {\n                    recording.push(mapped);\n                }\n            }\n            weakChildrenRecording.set(node, recording);\n            weakChildrenRecordingInProgress.delete(node);\n        }\n        function getExisting(value) {\n            const weakExisting = weakTree.get(value);\n            if (weakExisting) {\n                return weakExisting;\n            }\n            const referenceExisting = options.reference && referenceTree.get(value.reference);\n            if (referenceExisting) {\n                return referenceExisting;\n            }\n            const sourceExisting = options.source && sourceTree.get(value.source);\n            if (sourceExisting) {\n                return sourceExisting;\n            }\n            return undefined;\n        }\n    }\n}\nfunction Component({ meta }) {\n    return (h(\"innerContainer\", null,\n        meta,\n        \" \\u2764\\uFE0F\"));\n}\nconst instance = (h(Static, null,\n    h(Component, { meta: \"\\uD83E\\uDDBF\" })));\nawait readAllDrain(instance);\nawait readAllDrain(instance); // We are static now\nexport const _903_TransformStatic = (h(\"container\", { class: \"example\" }, instance));\nexport const _903_URL = import.meta.url;\n//# sourceMappingURL=static.js.map",
    cleanerSource: "import {h} from \"@virtualstate/examples\";\nimport { Hook, Mutation } from \"@virtualstate/hooks-extended\";\nimport {\n  ChildrenSource,\n  createNode,\n  Fragment,\n  Instance,\n  isScalarVNode, isVNode,\n  SourceReference,\n  VNode\n} from \"@virtualstate/fringe\";\nimport { readAllDrain } from \"./read\";\nimport {source} from \"iterable\";\n\ntype VNodeWithChildren = VNode & { children: AsyncIterable<VNode[]> }\n\n/**\n * @experimental\n */\nexport const IsStaticSymbol = Symbol(\"Is Static\");\n\nexport interface StaticOptions {\n  reference?: boolean;\n  source?: boolean;\n  yieldAllChildren?: boolean\n}\n\n/**\n * @experimental\n */\nexport class Static {\n\n  readonly #weakTree = new WeakMap<VNode, VNode>();\n  readonly #referenceTree = new Map<SourceReference, VNode>();\n  readonly #sourceTree = new Map<unknown, VNode>();\n  readonly #weakChildrenRecording = new WeakMap<VNode, VNode[][]>();\n  readonly #weakChildrenRecordingInProgress = new WeakSet<VNode>();\n  readonly #state: VNode = createNode();\n  readonly #options: StaticOptions = {};\n\n  constructor(options: StaticOptions, state: VNode) {\n    this.#state = state;\n    this.#options = options;\n  }\n\n  async *[Symbol.asyncIterator]() {\n    const weakTree = this.#weakTree;\n    const referenceTree = this.#referenceTree;\n    const sourceTree = this.#sourceTree;\n    const weakChildrenRecording = this.#weakChildrenRecording;\n    const weakChildrenRecordingInProgress = this.#weakChildrenRecordingInProgress;\n    const options = this.#options;\n\n    yield mutate(this.#state);\n\n    // We have a static copy of this.#state from here on\n\n    function mutate(value: VNode): VNode {\n      const existing = getExisting(value);\n      if (existing) return existing;\n      return make(value);\n    }\n\n    function make(value: VNode): VNode {\n      if (isScalarVNode(value) || value[IsStaticSymbol] || !value.children) {\n        return value;\n      }\n      const proxied = new Proxy(value, {\n        get(target: VNode, p: keyof VNode) {\n          if (typeof p === \"symbol\" && p === IsStaticSymbol) {\n            return true;\n          }\n          if (p !== \"children\") {\n            return target[p];\n          }\n          if (!isVNodeWithChildren(target)) {\n            return target.children;\n          }\n          const asyncIterable = replayChildrenViaRecording(target);\n          const recording = weakChildrenRecording.get(target);\n          if (recording?.length) {\n            asyncIterable[ChildrenSource] = recording[recording.length - 1];\n          }\n          return asyncIterable;\n        }\n      });\n      weakTree.set(value, proxied);\n      if (options.reference) {\n        referenceTree.set(value.reference, proxied);\n      }\n      if (options.source) {\n        sourceTree.set(value.source, proxied);\n      }\n      return proxied;\n    }\n\n    function isVNodeWithChildren(node: VNode): node is VNodeWithChildren {\n      return !!node.children;\n    }\n\n    async function *replayChildrenViaRecording(node: VNodeWithChildren): AsyncIterable<VNode[]> {\n      const existingRecording = weakChildrenRecording.get(node);\n      if (existingRecording) {\n        return yield * existingRecording;\n      }\n      if (weakChildrenRecordingInProgress.has(node)) {\n        throw new Error(\"Initial children recording in progress, pre-record if multiple consumers are required\");\n      }\n      weakChildrenRecordingInProgress.add(node);\n      const recording: VNode[][] = [];\n      for await (const children of node.children) {\n        const mapped = children.map(mutate)\n        yield mapped;\n        if (!options.yieldAllChildren) {\n          recording[0] = mapped;\n        } else {\n          recording.push(mapped);\n        }\n      }\n      weakChildrenRecording.set(node, recording);\n      weakChildrenRecordingInProgress.delete(node);\n    }\n\n    function getExisting(value: VNode): VNode | undefined {\n      const weakExisting = weakTree.get(value);\n      if (weakExisting) {\n        return weakExisting;\n      }\n      const referenceExisting = options.reference && referenceTree.get(value.reference);\n      if (referenceExisting) {\n        return referenceExisting;\n      }\n      const sourceExisting = options.source && sourceTree.get(value.source);\n      if (sourceExisting) {\n        return sourceExisting;\n      }\n      return undefined;\n    }\n  }\n\n}\n\nfunction Component({ meta }) {\n  return (\n    <innerContainer>\n      {meta} ❤️\n    </innerContainer>\n  );\n}\n\nconst instance = (\n  <Static>\n    <Component meta=\"🦿\" />\n  </Static>\n);\n\nawait readAllDrain(instance);\nawait readAllDrain(instance); // We are static now\n\nexport const Example = (\n  <container class=\"example\">\n    {instance}\n  </container>\n)",
    structure: "<container class=\"example\">\n  <innerContainer>\n    {\"🦿\"}\n    {\" ❤️\"}\n  </innerContainer>\n</container>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _CT0001_ExampleInformation: ExampleInformation = {
    name: "CompileTransform",
    id: "CT0001",
    exportedAs: "_CT0001_CompileTransform",
    source: "import {useState, useEffect, useContext, useRef} from \"./source.interface\";\nimport {View, Text, Source} from \"./source.tokens\";\nimport {h, createFragment} from \"@virtualstate/fringe\";\nimport {EngineURL, EngineURLSymbol} from \"./source.engine\";\nimport {SourceURLSymbol} from \"./source.transform\";\n\nconst context = useContext();\nconst [state, setState] = useState({\n  currentThing: 0\n});\n\nuseEffect(() => {\n  console.log(\"On each second\", state.currentThing, context.globalThing);\n}, new Date().getSeconds());\n\nuseEffect(async () => {\n  console.log(\"On something else\", state.currentThing, context.globalThing);\n  setState({\n    currentThing: 1\n  });\n}, Math.random() < 0.1);\n\nconst previousStateThing = useRef(state.currentThing);\nuseEffect(() => {\n  console.log(\"State thing changed from\", previousStateThing.current, \"to\", state.currentThing);\n  previousStateThing.current = state.currentThing;\n\n  if (state.currentThing > 10) {\n    WebDynamic = (\n      <div>\n        Did ten things!!\n      </div>\n    );\n    NativeDynamic = (\n      <Text>\n        Did ten things!!\n      </Text>\n    );\n  }\n}, state.currentThing);\n\nconst previousGlobalThing = useRef(context.globalThing);\nuseEffect(() => {\n  console.log(\"Global thing changed from\", previousGlobalThing.current, \"to\", context.globalThing);\n  previousGlobalThing.current = context.globalThing;\n}, context.globalThing);\n\nexport const Web = (\n  <div>\n    <h1>Global Thing:</h1>\n    <span>{previousGlobalThing.current}</span>\n    <h1>State Thing:</h1>\n    <span>{state.currentThing}</span>\n  </div>\n);\n\nexport const Native = (\n  <View>\n    <Text>Global Thing:</Text>\n    <Text>{previousGlobalThing.current}</Text>\n    <Text>State Thing:</Text>\n    <Text>{state.currentThing}</Text>\n  </View>\n);\n\nexport let WebDynamic = (\n  <div>\n    <h1>Global Thing:</h1>\n    <span>{previousGlobalThing.current}</span>\n    <h1>State Thing:</h1>\n    <span>{state.currentThing}</span>\n  </div>\n)\n\nexport let NativeDynamic = (\n  <View>\n    <Text>Global Thing:</Text>\n    <Text>{previousGlobalThing.current}</Text>\n    <Text>State Thing:</Text>\n    <Text>{state.currentThing}</Text>\n  </View>\n)\n\nexport interface SourceComponentProps {\n  componentThing: number;\n}\n\nexport async function SourceComponent({ componentThing }: SourceComponentProps) {\n\n  const [componentState, setComponentState] = useState({\n    currentThing: 0\n  });\n\n  useEffect(async () => {\n    if (state.currentThing > 10) {\n      setComponentState({\n        currentThing: 1\n      });\n    }\n  }, state.currentThing);\n\n  return (\n    <>\n      <Source>\n        <div>\n          <h1>Global Thing:</h1>\n          <span>{previousGlobalThing.current}</span>\n          <h1>State Thing:</h1>\n          <span>{state.currentThing}</span>\n          <h1>Component Thing:</h1>\n          <span>{componentThing}</span>\n          <h1>Component State Thing:</h1>\n          <span>{componentState.currentThing}</span>\n        </div>\n      </Source>\n      <Source>\n        <View>\n          <Text>Global Thing:</Text>\n          <Text>{previousGlobalThing.current}</Text>\n          <Text>State Thing:</Text>\n          <Text>{state.currentThing}</Text>\n          <Text>Component Thing:</Text>\n          <Text>{componentThing}</Text>\n        </View>\n      </Source>\n    </>\n  )\n}\n\nexport const _CT0001_CompileTransform = (\n  <>\n    <Source>\n      {Web}\n    </Source>\n    <Source>\n      {Native}\n    </Source>\n    <Source>\n      {WebDynamic}\n    </Source>\n  </>\n)\nexport const _CT0001_URL = import.meta.url;\nexport const _CT0001_Info = {\n  [EngineURLSymbol]: EngineURL,\n  [SourceURLSymbol]: import.meta.url,\n  ...context\n}\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/compile-transform/source.js",
    output: "import { useState, useEffect, useContext, useRef } from \"./source.interface.js\";\nimport { View, Text, Source } from \"./source.tokens.js\";\nimport { h, createFragment } from \"@virtualstate/fringe\";\nimport { EngineURL, EngineURLSymbol } from \"./source.engine.js\";\nimport { SourceURLSymbol } from \"./source.transform.js\";\nconst context = useContext();\nconst [state, setState] = useState({\n    currentThing: 0\n});\nuseEffect(() => {\n    console.log(\"On each second\", state.currentThing, context.globalThing);\n}, new Date().getSeconds());\nuseEffect(async () => {\n    console.log(\"On something else\", state.currentThing, context.globalThing);\n    setState({\n        currentThing: 1\n    });\n}, Math.random() < 0.1);\nconst previousStateThing = useRef(state.currentThing);\nuseEffect(() => {\n    console.log(\"State thing changed from\", previousStateThing.current, \"to\", state.currentThing);\n    previousStateThing.current = state.currentThing;\n    if (state.currentThing > 10) {\n        WebDynamic = (h(\"div\", null, \"Did ten things!!\"));\n        NativeDynamic = (h(Text, null, \"Did ten things!!\"));\n    }\n}, state.currentThing);\nconst previousGlobalThing = useRef(context.globalThing);\nuseEffect(() => {\n    console.log(\"Global thing changed from\", previousGlobalThing.current, \"to\", context.globalThing);\n    previousGlobalThing.current = context.globalThing;\n}, context.globalThing);\nexport const Web = (h(\"div\", null,\n    h(\"h1\", null, \"Global Thing:\"),\n    h(\"span\", null, previousGlobalThing.current),\n    h(\"h1\", null, \"State Thing:\"),\n    h(\"span\", null, state.currentThing)));\nexport const Native = (h(View, null,\n    h(Text, null, \"Global Thing:\"),\n    h(Text, null, previousGlobalThing.current),\n    h(Text, null, \"State Thing:\"),\n    h(Text, null, state.currentThing)));\nexport let WebDynamic = (h(\"div\", null,\n    h(\"h1\", null, \"Global Thing:\"),\n    h(\"span\", null, previousGlobalThing.current),\n    h(\"h1\", null, \"State Thing:\"),\n    h(\"span\", null, state.currentThing)));\nexport let NativeDynamic = (h(View, null,\n    h(Text, null, \"Global Thing:\"),\n    h(Text, null, previousGlobalThing.current),\n    h(Text, null, \"State Thing:\"),\n    h(Text, null, state.currentThing)));\nexport async function SourceComponent({ componentThing }) {\n    const [componentState, setComponentState] = useState({\n        currentThing: 0\n    });\n    useEffect(async () => {\n        if (state.currentThing > 10) {\n            setComponentState({\n                currentThing: 1\n            });\n        }\n    }, state.currentThing);\n    return (h(createFragment, null,\n        h(Source, null,\n            h(\"div\", null,\n                h(\"h1\", null, \"Global Thing:\"),\n                h(\"span\", null, previousGlobalThing.current),\n                h(\"h1\", null, \"State Thing:\"),\n                h(\"span\", null, state.currentThing),\n                h(\"h1\", null, \"Component Thing:\"),\n                h(\"span\", null, componentThing),\n                h(\"h1\", null, \"Component State Thing:\"),\n                h(\"span\", null, componentState.currentThing))),\n        h(Source, null,\n            h(View, null,\n                h(Text, null, \"Global Thing:\"),\n                h(Text, null, previousGlobalThing.current),\n                h(Text, null, \"State Thing:\"),\n                h(Text, null, state.currentThing),\n                h(Text, null, \"Component Thing:\"),\n                h(Text, null, componentThing)))));\n}\nexport const _CT0001_CompileTransform = (h(createFragment, null,\n    h(Source, null, Web),\n    h(Source, null, Native),\n    h(Source, null, WebDynamic)));\nexport const _CT0001_URL = import.meta.url;\nexport const _CT0001_Info = {\n    [EngineURLSymbol]: EngineURL,\n    [SourceURLSymbol]: import.meta.url,\n    ...context\n};\n//# sourceMappingURL=source.js.map",
    cleanerSource: "import {useState, useEffect, useContext, useRef} from \"./source.interface\";\nimport {View, Text, Source} from \"./source.tokens\";\nimport {h, createFragment} from \"@virtualstate/fringe\";\nimport {EngineURL, EngineURLSymbol} from \"./source.engine\";\nimport {SourceURLSymbol} from \"./source.transform\";\n\nconst context = useContext();\nconst [state, setState] = useState({\n  currentThing: 0\n});\n\nuseEffect(() => {\n  console.log(\"On each second\", state.currentThing, context.globalThing);\n}, new Date().getSeconds());\n\nuseEffect(async () => {\n  console.log(\"On something else\", state.currentThing, context.globalThing);\n  setState({\n    currentThing: 1\n  });\n}, Math.random() < 0.1);\n\nconst previousStateThing = useRef(state.currentThing);\nuseEffect(() => {\n  console.log(\"State thing changed from\", previousStateThing.current, \"to\", state.currentThing);\n  previousStateThing.current = state.currentThing;\n\n  if (state.currentThing > 10) {\n    WebDynamic = (\n      <div>\n        Did ten things!!\n      </div>\n    );\n    NativeDynamic = (\n      <Text>\n        Did ten things!!\n      </Text>\n    );\n  }\n}, state.currentThing);\n\nconst previousGlobalThing = useRef(context.globalThing);\nuseEffect(() => {\n  console.log(\"Global thing changed from\", previousGlobalThing.current, \"to\", context.globalThing);\n  previousGlobalThing.current = context.globalThing;\n}, context.globalThing);\n\nexport const Web = (\n  <div>\n    <h1>Global Thing:</h1>\n    <span>{previousGlobalThing.current}</span>\n    <h1>State Thing:</h1>\n    <span>{state.currentThing}</span>\n  </div>\n);\n\nexport const Native = (\n  <View>\n    <Text>Global Thing:</Text>\n    <Text>{previousGlobalThing.current}</Text>\n    <Text>State Thing:</Text>\n    <Text>{state.currentThing}</Text>\n  </View>\n);\n\nexport let WebDynamic = (\n  <div>\n    <h1>Global Thing:</h1>\n    <span>{previousGlobalThing.current}</span>\n    <h1>State Thing:</h1>\n    <span>{state.currentThing}</span>\n  </div>\n)\n\nexport let NativeDynamic = (\n  <View>\n    <Text>Global Thing:</Text>\n    <Text>{previousGlobalThing.current}</Text>\n    <Text>State Thing:</Text>\n    <Text>{state.currentThing}</Text>\n  </View>\n)\n\nexport interface SourceComponentProps {\n  componentThing: number;\n}\n\nexport async function SourceComponent({ componentThing }: SourceComponentProps) {\n\n  const [componentState, setComponentState] = useState({\n    currentThing: 0\n  });\n\n  useEffect(async () => {\n    if (state.currentThing > 10) {\n      setComponentState({\n        currentThing: 1\n      });\n    }\n  }, state.currentThing);\n\n  return (\n    <>\n      <Source>\n        <div>\n          <h1>Global Thing:</h1>\n          <span>{previousGlobalThing.current}</span>\n          <h1>State Thing:</h1>\n          <span>{state.currentThing}</span>\n          <h1>Component Thing:</h1>\n          <span>{componentThing}</span>\n          <h1>Component State Thing:</h1>\n          <span>{componentState.currentThing}</span>\n        </div>\n      </Source>\n      <Source>\n        <View>\n          <Text>Global Thing:</Text>\n          <Text>{previousGlobalThing.current}</Text>\n          <Text>State Thing:</Text>\n          <Text>{state.currentThing}</Text>\n          <Text>Component Thing:</Text>\n          <Text>{componentThing}</Text>\n        </View>\n      </Source>\n    </>\n  )\n}\n\nexport const Example = (\n  <>\n    <Source>\n      {Web}\n    </Source>\n    <Source>\n      {Native}\n    </Source>\n    <Source>\n      {WebDynamic}\n    </Source>\n  </>\n)",
    structure: "<>\n  <Source>\n    <div>\n      <h1>\n        {\"Global Thing:\"}\n      </h1>\n      <span>\n        {0}\n      </span>\n      <h1>\n        {\"State Thing:\"}\n      </h1>\n      <span>\n        {0}\n      </span>\n    </div>\n  </Source>\n  <Source>\n    <View>\n      <Text>\n        {\"Global Thing:\"}\n      </Text>\n      <Text>\n        {0}\n      </Text>\n      <Text>\n        {\"State Thing:\"}\n      </Text>\n      <Text>\n        {0}\n      </Text>\n    </View>\n  </Source>\n  <Source>\n    <div>\n      <h1>\n        {\"Global Thing:\"}\n      </h1>\n      <span>\n        {0}\n      </span>\n      <h1>\n        {\"State Thing:\"}\n      </h1>\n      <span>\n        {0}\n      </span>\n    </div>\n  </Source>\n</>",
    info: {"globalThing":0},
    engineURL: "file:///workspaces/x/packages/examples/lib/examples/compile-transform/source.engine.js",
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      const { Engine, SourceURLSymbol, EngineURLSymbol, SourceSymbol, SourceInterfaceURLSymbol, SourceInterfaceSymbol } = await import("./examples/compile-transform/source.engine.js");
      return h(
        Engine,
        {
          ..._CT0001_ExampleInformation.info,
          ...context,
          [SourceURLSymbol]: _CT0001_ExampleInformation.sourceURL,
          [EngineURLSymbol]: _CT0001_ExampleInformation.engineURL,
          [SourceInterfaceURLSymbol]: _CT0001_ExampleInformation.sourceInterfaceURL,
          [SourceInterfaceSymbol]: _CT0001_ExampleInformation.sourceInterface,
          [SourceSymbol]: _CT0001_ExampleInformation.source,
        },
        state
      );
    }
}
export const _E0101_ExampleInformation: ExampleInformation = {
    name: "Combinational",
    id: "E0101",
    exportedAs: "_E0101_Combinational",
    source: "import { h } from \"@virtualstate/fringe\";\nimport { Not } from \"./not\";\nimport { And } from \"./and\";\nimport { Or } from \"./or\";\nimport { True, False, isTrue } from \"./truth\";\nimport { Truthful } from \"./truthful\";\nimport { Void } from \"./void\";\n\nconst a = (\n  <And>\n    <True />\n    <True />\n  </And>\n);\nconst b = (\n  <Not>\n    <And>\n      <True />\n      <False />\n    </And>\n  </Not>\n);\nconst c = (\n  <Not>\n    <And>\n      <False />\n      <True />\n    </And>\n  </Not>\n);\nconst d = (\n  <Not>\n    <And>\n      <False />\n      <False />\n    </And>\n  </Not>\n);\nconst e = (\n  <And>\n    {a}\n    {b}\n    {c}\n    {d}\n  </And>\n);\n\nconst complete =\n  <Or>\n    {e}\n  </Or>;\n\n/**\n * @experimental\n */\nexport const Combinational = {\n  Void,\n  Truthful,\n  And,\n  Or,\n  Not,\n  isTrue,\n  True,\n  False,\n}\n\n/**\n * @experimental\n */\nexport const _E0101_Combinational = (\n  <Void>\n    <Truthful>\n      {a}\n      {e}\n      {complete}\n    </Truthful>\n  </Void>\n)\nexport const _E0101_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/experiments/combinational/index.js",
    output: "import { h } from \"@virtualstate/fringe\";\nimport { Not } from \"./not.js\";\nimport { And } from \"./and.js\";\nimport { Or } from \"./or.js\";\nimport { True, False, isTrue } from \"./truth.js\";\nimport { Truthful } from \"./truthful.js\";\nimport { Void } from \"./void.js\";\nconst a = (h(And, null,\n    h(True, null),\n    h(True, null)));\nconst b = (h(Not, null,\n    h(And, null,\n        h(True, null),\n        h(False, null))));\nconst c = (h(Not, null,\n    h(And, null,\n        h(False, null),\n        h(True, null))));\nconst d = (h(Not, null,\n    h(And, null,\n        h(False, null),\n        h(False, null))));\nconst e = (h(And, null,\n    a,\n    b,\n    c,\n    d));\nconst complete = h(Or, null, e);\n/**\n * @experimental\n */\nexport const Combinational = {\n    Void,\n    Truthful,\n    And,\n    Or,\n    Not,\n    isTrue,\n    True,\n    False,\n};\n/**\n * @experimental\n */\nexport const _E0101_Combinational = (h(Void, null,\n    h(Truthful, null,\n        a,\n        e,\n        complete)));\nexport const _E0101_URL = import.meta.url;\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import { h } from \"@virtualstate/fringe\";\nimport { Not } from \"./not\";\nimport { And } from \"./and\";\nimport { Or } from \"./or\";\nimport { True, False, isTrue } from \"./truth\";\nimport { Truthful } from \"./truthful\";\nimport { Void } from \"./void\";\n\nconst a = (\n  <And>\n    <True />\n    <True />\n  </And>\n);\nconst b = (\n  <Not>\n    <And>\n      <True />\n      <False />\n    </And>\n  </Not>\n);\nconst c = (\n  <Not>\n    <And>\n      <False />\n      <True />\n    </And>\n  </Not>\n);\nconst d = (\n  <Not>\n    <And>\n      <False />\n      <False />\n    </And>\n  </Not>\n);\nconst e = (\n  <And>\n    {a}\n    {b}\n    {c}\n    {d}\n  </And>\n);\n\nconst complete =\n  <Or>\n    {e}\n  </Or>;\n\n/**\n * @experimental\n */\nexport const Combinational = {\n  Void,\n  Truthful,\n  And,\n  Or,\n  Not,\n  isTrue,\n  True,\n  False,\n}\n\n/**\n * @experimental\n */\nexport const Example = (\n  <Void>\n    <Truthful>\n      {a}\n      {e}\n      {complete}\n    </Truthful>\n  </Void>\n)",
    structure: "\"No output\"",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _E2001_ExampleInformation: ExampleInformation = {
    name: "Store",
    id: "E2001",
    exportedAs: "_E2001_Store",
    source: "import { h, VNode } from \"@virtualstate/fringe\";\nimport { Store } from \"./store\";\nimport { Domain, Cactus, Scroll, TestTube, Thread, DomainToken } from \"./domain\";\nimport { Instance } from \"@virtualstate/fringe\";\n\nexport * from \"./store\";\nexport * from \"./read\";\n\nconst store: VNode & { [Instance]?: Store<DomainToken> } = (\n  <Store domain={Domain} final visit={[TestTube]}>\n    <TestTube>\n      <Thread size={2} />\n      <Cactus spikes=\"spikey\" />\n      <Cactus spikes=\"not very spikey\" />\n      <Scroll />\n    </TestTube>\n  </Store>\n)\n\nfunction *Look(o: unknown, state?: VNode) {\n  yield state;\n  console.log(store[Instance]?.get(TestTube));\n}\n\nexport const _E2001_Store = (\n  <container>\n    <Look>\n      {store}\n    </Look>\n  </container>\n)\nexport const _E2001_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/experiments/store/index.js",
    output: "import { h } from \"@virtualstate/fringe\";\nimport { Store } from \"./store.js\";\nimport { Domain, Cactus, Scroll, TestTube, Thread } from \"./domain.js\";\nimport { Instance } from \"@virtualstate/fringe\";\nexport * from \"./store.js\";\nexport * from \"./read.js\";\nconst store = (h(Store, { domain: Domain, final: true, visit: [TestTube] },\n    h(TestTube, null,\n        h(Thread, { size: 2 }),\n        h(Cactus, { spikes: \"spikey\" }),\n        h(Cactus, { spikes: \"not very spikey\" }),\n        h(Scroll, null))));\nfunction* Look(o, state) {\n    yield state;\n    console.log(store[Instance]?.get(TestTube));\n}\nexport const _E2001_Store = (h(\"container\", null,\n    h(Look, null, store)));\nexport const _E2001_URL = import.meta.url;\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import { h, VNode } from \"@virtualstate/fringe\";\nimport { Store } from \"./store\";\nimport { Domain, Cactus, Scroll, TestTube, Thread, DomainToken } from \"./domain\";\nimport { Instance } from \"@virtualstate/fringe\";\n\nexport * from \"./store\";\nexport * from \"./read\";\n\nconst store: VNode & { [Instance]?: Store<DomainToken> } = (\n  <Store domain={Domain} final visit={[TestTube]}>\n    <TestTube>\n      <Thread size={2} />\n      <Cactus spikes=\"spikey\" />\n      <Cactus spikes=\"not very spikey\" />\n      <Scroll />\n    </TestTube>\n  </Store>\n)\n\nfunction *Look(o, state?: VNode) {\n  yield state;\n  console.log(store[Instance]?.get(TestTube));\n}\n\nexport const Example = (\n  <container>\n    <Look>\n      {store}\n    </Look>\n  </container>\n)",
    structure: "<container>\n  {new Map()}\n</container>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _E3001_ExampleInformation: ExampleInformation = {
    name: "InfrastructureAsCode",
    id: "E3001",
    exportedAs: "_E3001_InfrastructureAsCode",
    source: "import { Farm, Service, SmallerBigProcess, BigProcess } from \"./domain\";\nimport { h } from \"../../../jsx\";\n\nexport const _E3001_InfrastructureAsCode = (\n  <Farm>\n    <Service ram=\"big\" cpu=\"quick\">\n      <SmallerBigProcess />\n    </Service>\n    <Service ram=\"huge\" cpu=\"very quick\">\n      <BigProcess />\n    </Service>\n  </Farm>\n)\nexport const _E3001_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/experiments/infrastructure-as-code/index.js",
    output: "import { Farm, Service, SmallerBigProcess, BigProcess } from \"./domain.js\";\nimport { h } from \"../../../jsx.js\";\nexport const _E3001_InfrastructureAsCode = (h(Farm, null,\n    h(Service, { ram: \"big\", cpu: \"quick\" },\n        h(SmallerBigProcess, null)),\n    h(Service, { ram: \"huge\", cpu: \"very quick\" },\n        h(BigProcess, null))));\nexport const _E3001_URL = import.meta.url;\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import { Farm, Service, SmallerBigProcess, BigProcess } from \"./domain\";\nimport { h } from \"../../../jsx\";\n\nexport const Example = (\n  <Farm>\n    <Service ram=\"big\" cpu=\"quick\">\n      <SmallerBigProcess />\n    </Service>\n    <Service ram=\"huge\" cpu=\"very quick\">\n      <BigProcess />\n    </Service>\n  </Farm>\n)",
    structure: "<🚜>\n  <🙋 ram=\"big\" cpu=\"quick\">\n    <Symbol(Smaller Big Process) />\n  </🙋>\n  <🙋 ram=\"huge\" cpu=\"very quick\">\n    <Symbol(Big Process) />\n  </🙋>\n</🚜>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _E4001_ExampleInformation: ExampleInformation = {
    name: "Static",
    id: "E4001",
    exportedAs: "_E4001_Static",
    source: "import { createStaticNode } from \"./static\";\nimport { Cactus, Scroll, TestTube, Thread } from \"./domain\";\nimport { h } from \"@virtualstate/fringe\";\n\nexport * from \"./static\";\n\nconst node = (\n  <TestTube>\n    <Thread size={2} />\n    <Cactus spikes=\"spikey\" />\n    <Cactus spikes=\"not very spikey\" />\n    <Scroll />\n  </TestTube>\n)\n\nexport const _E4001_Static = createStaticNode(node);\nexport const _E4001_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/experiments/static/index.js",
    output: "import { createStaticNode } from \"./static.js\";\nimport { Cactus, Scroll, TestTube, Thread } from \"./domain.js\";\nimport { h } from \"@virtualstate/fringe\";\nexport * from \"./static.js\";\nconst node = (h(TestTube, null,\n    h(Thread, { size: 2 }),\n    h(Cactus, { spikes: \"spikey\" }),\n    h(Cactus, { spikes: \"not very spikey\" }),\n    h(Scroll, null)));\nexport const _E4001_Static = createStaticNode(node);\nexport const _E4001_URL = import.meta.url;\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import { createStaticNode } from \"./static\";\nimport { Cactus, Scroll, TestTube, Thread } from \"./domain\";\nimport { h } from \"@virtualstate/fringe\";\n\nexport * from \"./static\";\n\nconst node = (\n  <TestTube>\n    <Thread size={2} />\n    <Cactus spikes=\"spikey\" />\n    <Cactus spikes=\"not very spikey\" />\n    <Scroll />\n  </TestTube>\n)\n\nexport const Example = createStaticNode(node);",
    structure: "<🧪>\n  <🧵 size={2} />\n  <🌵 spikes=\"spikey\" />\n  <🌵 spikes=\"not very spikey\" />\n  {Symbol(\"📜\")}\n</🧪>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _EC001_ExampleInformation: ExampleInformation = {
    name: "ChildrenOptions",
    id: "EC001",
    exportedAs: "_EC001_ChildrenOptions",
    source: "import {ChildrenOptions, ChildrenTransformOptions, h, VNode, createFragment} from \"@virtualstate/fringe\";\n\nfunction TryItOut(this: { counter?: number }) {\n  console.log({ TryItOut: this });\n  this.counter = 0;\n  return (\n    <>\n      <Child />\n      <Child />\n      <Child />\n    </>\n  )\n}\n\nfunction Child(this: { counter: number }) {\n  console.log({ Child: this });\n  this.counter += 1;\n  return <output>{this.counter}</output>\n}\n\nconst context = new WeakMap<object, unknown>();\n\nconst Provided = Symbol(\"Provided\");\n\nfunction proxyNode(options: ChildrenTransformOptions, defaultContext: object, node: VNode) {\n  return new Proxy<VNode>(node, {\n    get(target: VNode, p: keyof VNode | typeof ChildrenOptions) {\n      if (p === ChildrenOptions) {\n        return target[p] || options;\n      }\n      const value = target[p];\n      if (p === \"source\" && typeof value === \"function\") {\n        let sourceContext = context.get(options);\n        if (!sourceContext) {\n          sourceContext = {\n            ...defaultContext\n          };\n          context.set(options, sourceContext);\n        }\n        return value.bind(sourceContext);\n      }\n      return value;\n    }\n  });\n}\nfunction createOptions(defaultContext: object): ChildrenTransformOptions {\n  const options: ChildrenTransformOptions = {\n    createNode: h,\n    proxyNode() {\n      throw new Error(\"Not Implemented\");\n    }\n  };\n  options.proxyNode = proxyNode.bind(undefined, options, defaultContext);\n  return options;\n}\nfunction bind(defaultContext: object, node: VNode): VNode {\n  const options = createOptions(defaultContext);\n  return options.proxyNode?.(node) ?? node;\n}\n\nconst bound = bind({ [Provided]: true, counter: undefined }, <TryItOut />);\n\nexport const _EC001_ChildrenOptions = bound;\nexport const _EC001_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/experiments/children-options/index.js",
    output: "import { ChildrenOptions, h, createFragment } from \"@virtualstate/fringe\";\nfunction TryItOut() {\n    console.log({ TryItOut: this });\n    this.counter = 0;\n    return (h(createFragment, null,\n        h(Child, null),\n        h(Child, null),\n        h(Child, null)));\n}\nfunction Child() {\n    console.log({ Child: this });\n    this.counter += 1;\n    return h(\"output\", null, this.counter);\n}\nconst context = new WeakMap();\nconst Provided = Symbol(\"Provided\");\nfunction proxyNode(options, defaultContext, node) {\n    return new Proxy(node, {\n        get(target, p) {\n            if (p === ChildrenOptions) {\n                return target[p] || options;\n            }\n            const value = target[p];\n            if (p === \"source\" && typeof value === \"function\") {\n                let sourceContext = context.get(options);\n                if (!sourceContext) {\n                    sourceContext = {\n                        ...defaultContext\n                    };\n                    context.set(options, sourceContext);\n                }\n                return value.bind(sourceContext);\n            }\n            return value;\n        }\n    });\n}\nfunction createOptions(defaultContext) {\n    const options = {\n        createNode: h,\n        proxyNode() {\n            throw new Error(\"Not Implemented\");\n        }\n    };\n    options.proxyNode = proxyNode.bind(undefined, options, defaultContext);\n    return options;\n}\nfunction bind(defaultContext, node) {\n    const options = createOptions(defaultContext);\n    return options.proxyNode?.(node) ?? node;\n}\nconst bound = bind({ [Provided]: true, counter: undefined }, h(TryItOut, null));\nexport const _EC001_ChildrenOptions = bound;\nexport const _EC001_URL = import.meta.url;\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import {ChildrenOptions, ChildrenTransformOptions, h, VNode, createFragment} from \"@virtualstate/fringe\";\n\nfunction TryItOut(this: { counter?: number }) {\n  console.log({ TryItOut: this });\n  this.counter = 0;\n  return (\n    <>\n      <Child />\n      <Child />\n      <Child />\n    </>\n  )\n}\n\nfunction Child(this: { counter: number }) {\n  console.log({ Child: this });\n  this.counter += 1;\n  return <output>{this.counter}</output>\n}\n\nconst context = new WeakMap<object, unknown>();\n\nconst Provided = Symbol(\"Provided\");\n\nfunction proxyNode(options: ChildrenTransformOptions, defaultContext: object, node: VNode) {\n  return new Proxy<VNode>(node, {\n    get(target: VNode, p: keyof VNode | typeof ChildrenOptions) {\n      if (p === ChildrenOptions) {\n        return target[p] || options;\n      }\n      const value = target[p];\n      if (p === \"source\" && typeof value === \"function\") {\n        let sourceContext = context.get(options);\n        if (!sourceContext) {\n          sourceContext = {\n            ...defaultContext\n          };\n          context.set(options, sourceContext);\n        }\n        return value.bind(sourceContext);\n      }\n      return value;\n    }\n  });\n}\nfunction createOptions(defaultContext: object): ChildrenTransformOptions {\n  const options: ChildrenTransformOptions = {\n    createNode: h,\n    proxyNode() {\n      throw new Error(\"Not Implemented\");\n    }\n  };\n  options.proxyNode = proxyNode.bind(undefined, options, defaultContext);\n  return options;\n}\nfunction bind(defaultContext: object, node: VNode): VNode {\n  const options = createOptions(defaultContext);\n  return options.proxyNode?.(node) ?? node;\n}\n\nconst bound = bind({ [Provided]: true, counter: undefined }, <TryItOut />);\n\nexport const Example = bound;",
    structure: "<>\n  <output>\n    {1}\n  </output>\n  <output>\n    {2}\n  </output>\n  <output>\n    {3}\n  </output>\n</>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _EEQ01_ExampleInformation: ExampleInformation = {
    name: "Equal",
    id: "EEQ01",
    exportedAs: "_EEQ01_Equal",
    source: "import {equal, h, createFragment} from \"@virtualstate/fringe\";\n\nfunction Structure() {\n  return (\n    <thing>\n      <inner />\n    </thing>\n  )\n}\n\nasync function Equal() {\n  const instance = <Structure />;\n  return (\n    <p>\n      Is Equal {`${await equal(instance, instance)}`}\n      Is Equal {`${await equal(instance, <Structure />)}`}\n      Is Equal {`${await equal(<Structure />, <Structure />)}`}\n      Is Equal {`${await equal(<Structure />, (\n      <>\n        {h(async function *Thing() {\n          yield <z />\n          yield <thing />\n          yield <thing><zee /></thing>\n          yield <thing><inner /></thing>\n        })}\n      </>\n    ))}`}\n      Is Equal {`${await equal(<Structure />, (\n      <>\n        {h(async function *Thing() {\n          yield <thing><inner value=\"1\" /></thing>\n        })}\n      </>\n    ))}`}\n      Is Equal {`${await equal(<thing><inner value=\"1\" /></thing>, (\n      <>\n        {h(async function *Thing() {\n          async function *Inner() {\n            yield <inner />\n            yield <inner value=\"1\" />\n          }\n          yield <thing><Inner /></thing>\n        })}\n      </>\n    ))}`}\n      Is Equal {`${await equal(h(async function *Thing() {\n        async function *Inner() {\n          yield <inner value=\"1\" />\n        }\n        yield <thing><Inner /></thing>\n      }), (\n      <>\n        {h(async function *Thing() {\n          async function *Inner() {\n            yield <inner />\n            yield <inner value=\"1\" />\n          }\n          yield <thing><Inner /></thing>\n        })}\n      </>\n    ))}`}\n    </p>\n  )\n}\n\nexport const _EEQ01_Equal = <Equal />\nexport const _EEQ01_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/experiments/equal/index.js",
    output: "import { equal, h, createFragment } from \"@virtualstate/fringe\";\nfunction Structure() {\n    return (h(\"thing\", null,\n        h(\"inner\", null)));\n}\nasync function Equal() {\n    const instance = h(Structure, null);\n    return (h(\"p\", null,\n        \"Is Equal \",\n        `${await equal(instance, instance)}`,\n        \"Is Equal \",\n        `${await equal(instance, h(Structure, null))}`,\n        \"Is Equal \",\n        `${await equal(h(Structure, null), h(Structure, null))}`,\n        \"Is Equal \",\n        `${await equal(h(Structure, null), (h(createFragment, null, h(async function* Thing() {\n            yield h(\"z\", null);\n            yield h(\"thing\", null);\n            yield h(\"thing\", null,\n                h(\"zee\", null));\n            yield h(\"thing\", null,\n                h(\"inner\", null));\n        }))))}`,\n        \"Is Equal \",\n        `${await equal(h(Structure, null), (h(createFragment, null, h(async function* Thing() {\n            yield h(\"thing\", null,\n                h(\"inner\", { value: \"1\" }));\n        }))))}`,\n        \"Is Equal \",\n        `${await equal(h(\"thing\", null,\n            h(\"inner\", { value: \"1\" })), (h(createFragment, null, h(async function* Thing() {\n            async function* Inner() {\n                yield h(\"inner\", null);\n                yield h(\"inner\", { value: \"1\" });\n            }\n            yield h(\"thing\", null,\n                h(Inner, null));\n        }))))}`,\n        \"Is Equal \",\n        `${await equal(h(async function* Thing() {\n            async function* Inner() {\n                yield h(\"inner\", { value: \"1\" });\n            }\n            yield h(\"thing\", null,\n                h(Inner, null));\n        }), (h(createFragment, null, h(async function* Thing() {\n            async function* Inner() {\n                yield h(\"inner\", null);\n                yield h(\"inner\", { value: \"1\" });\n            }\n            yield h(\"thing\", null,\n                h(Inner, null));\n        }))))}`));\n}\nexport const _EEQ01_Equal = h(Equal, null);\nexport const _EEQ01_URL = import.meta.url;\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import {equal, h, createFragment} from \"@virtualstate/fringe\";\n\nfunction Structure() {\n  return (\n    <thing>\n      <inner />\n    </thing>\n  )\n}\n\nasync function Equal() {\n  const instance = <Structure />;\n  return (\n    <p>\n      Is Equal {`${await equal(instance, instance)}`}\n      Is Equal {`${await equal(instance, <Structure />)}`}\n      Is Equal {`${await equal(<Structure />, <Structure />)}`}\n      Is Equal {`${await equal(<Structure />, (\n      <>\n        {h(async function *Thing() {\n          yield <z />\n          yield <thing />\n          yield <thing><zee /></thing>\n          yield <thing><inner /></thing>\n        })}\n      </>\n    ))}`}\n      Is Equal {`${await equal(<Structure />, (\n      <>\n        {h(async function *Thing() {\n          yield <thing><inner value=\"1\" /></thing>\n        })}\n      </>\n    ))}`}\n      Is Equal {`${await equal(<thing><inner value=\"1\" /></thing>, (\n      <>\n        {h(async function *Thing() {\n          async function *Inner() {\n            yield <inner />\n            yield <inner value=\"1\" />\n          }\n          yield <thing><Inner /></thing>\n        })}\n      </>\n    ))}`}\n      Is Equal {`${await equal(h(async function *Thing() {\n        async function *Inner() {\n          yield <inner value=\"1\" />\n        }\n        yield <thing><Inner /></thing>\n      }), (\n      <>\n        {h(async function *Thing() {\n          async function *Inner() {\n            yield <inner />\n            yield <inner value=\"1\" />\n          }\n          yield <thing><Inner /></thing>\n        })}\n      </>\n    ))}`}\n    </p>\n  )\n}\n\nexport const Example = <Equal />",
    structure: "<p>\n  {\"Is Equal \"}\n  {\"true\"}\n  {\"Is Equal \"}\n  {\"true\"}\n  {\"Is Equal \"}\n  {\"true\"}\n  {\"Is Equal \"}\n  {\"true\"}\n  {\"Is Equal \"}\n  {\"false\"}\n  {\"Is Equal \"}\n  {\"true\"}\n  {\"Is Equal \"}\n  {\"true\"}\n</p>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _G0001_ExampleInformation: ExampleInformation = {
    name: "Graph",
    id: "G0001",
    exportedAs: "_G0001_Graph",
    source: "import {Domain, Graph, MainGraph, DomainToken} from \"./main\";\nimport {Store} from \"../../examples/experiments/store\";\nimport {h, VNode, Instance} from \"@virtualstate/fringe\"\nimport {\n  assertQuadInstanceToken,\n  BlankNode,\n  DefaultGraph,\n  Literal,\n  NamedNode,\n  Quad,\n  QuadInstanceToken,\n  QuadToken,\n  Variable\n} from \"./tokens\";\nimport * as rdf from \"@opennetwork/rdf-data-model\";\nimport {\n  DefaultDataFactory,\n  isQuadGraphLike,\n  isQuadLike,\n  isQuadObjectLike,\n  isQuadPredicateLike,\n  isQuadSubjectLike,\n  QuadLike\n} from \"@opennetwork/rdf-data-model\";\nimport {thenish} from \"@virtualstate/fringe\";\n\nexport const _G0001_Graph = MainGraph;\nexport const _G0001_URL = import.meta.url;\n\nexport async function *_G0002_GraphStoreRead(): AsyncIterable<QuadInstanceToken[]> {\n  const store = (\n    <Store domain={Domain} visit={[Graph, Quad]}>\n      {MainGraph}\n    </Store>\n  );\n  await store;\n  yield await Promise.all(\n    [...store[Instance].get(Quad)]\n      .filter(Quad.is)\n      .map(async (input): Promise<QuadInstanceToken> => {\n        const instance: rdf.Quad = await quad(input, await parse(await getState(input)));\n        const frozen: Readonly<rdf.Quad> = Object.freeze(instance);\n        const token = Quad(frozen);\n        assertQuadInstanceToken(token);\n        return token;\n      })\n  );\n}\nexport const _G0002_GraphStore = <_G0002_GraphStoreRead />\nexport const _G0002_URL = import.meta.url;\n\nasync function getState(node: VNode) {\n  return new Promise<VNode[]>(thenish.bind(node));\n}\n\ntype Parsed = (rdf.Quad | ReturnType<rdf.DataFactory[\"fromTerm\"]>);\n\nasync function parse(state: VNode[]): Promise<Parsed[]> {\n  return Promise.all(\n    state.map(\n      async (node): Promise<Parsed> => {\n        if (Quad.is(node)) {\n          return quad(node, await parse(await getState(node)))\n        }\n        if (NamedNode.is(node)) {\n          return DefaultDataFactory.namedNode(node.options.value);\n        }\n        if (BlankNode.is(node)) {\n          return DefaultDataFactory.blankNode(node.options.value);\n        }\n        if (DefaultGraph.is(node)) {\n          return DefaultDataFactory.defaultGraph();\n        }\n        if (Literal.is(node)) {\n          return new rdf.Literal(\n            node.options.value,\n            node.options.language,\n            DefaultDataFactory.fromTerm(node.options.datatype)\n          );\n        }\n        if (Variable.is(node)) {\n          return DefaultDataFactory.variable(node.options.value);\n        }\n        return rdf.DefaultDataFactory.fromTerm(node.options);\n      }\n    )\n  )\n}\nasync function quad(token: QuadToken, terms: Parsed[]): Promise<rdf.Quad> {\n  const [\n    subject,\n    predicate,\n    object,\n    graph\n  ] = terms;\n  const options: Partial<Record<keyof QuadLike, unknown>> = {\n    termType: \"Quad\",\n    value: \"\",\n    graph: new rdf.DefaultGraph(),\n    ...token.options\n  };\n  if (isQuadSubjectLike(subject)) {\n    options.subject = subject;\n    if (isQuadPredicateLike(predicate)) {\n      options.predicate = predicate;\n      if (isQuadObjectLike(object)) {\n        options.object = object;\n        if (isQuadGraphLike(graph)) {\n          options.graph = graph;\n        } else if (graph) {\n          throw new Error(\"Graph is not valid\");\n        }\n      } else if (object) {\n        throw new Error(\"Object is not valid\");\n      }\n    } else if (predicate) {\n      throw new Error(\"Predicate is not valid\");\n    }\n  } else if (subject) {\n    throw new Error(\"Subject is not valid\");\n  }\n  if (!isQuadLike(options)) {\n    throw new Error(\"Quad is not valid\");\n  }\n  return DefaultDataFactory.fromTerm(options);\n}\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/graph/index.js",
    output: "import { Domain, Graph, MainGraph } from \"./main.js\";\nimport { Store } from \"../../examples/experiments/store/index.js\";\nimport { h, Instance } from \"@virtualstate/fringe\";\nimport { assertQuadInstanceToken, BlankNode, DefaultGraph, Literal, NamedNode, Quad, Variable } from \"./tokens.js\";\nimport * as rdf from \"@opennetwork/rdf-data-model\";\nimport { DefaultDataFactory, isQuadGraphLike, isQuadLike, isQuadObjectLike, isQuadPredicateLike, isQuadSubjectLike } from \"@opennetwork/rdf-data-model\";\nimport { thenish } from \"@virtualstate/fringe\";\nexport const _G0001_Graph = MainGraph;\nexport const _G0001_URL = import.meta.url;\nexport async function* _G0002_GraphStoreRead() {\n    const store = (h(Store, { domain: Domain, visit: [Graph, Quad] }, MainGraph));\n    await store;\n    yield await Promise.all([...store[Instance].get(Quad)]\n        .filter(Quad.is)\n        .map(async (input) => {\n        const instance = await quad(input, await parse(await getState(input)));\n        const frozen = Object.freeze(instance);\n        const token = Quad(frozen);\n        assertQuadInstanceToken(token);\n        return token;\n    }));\n}\nexport const _G0002_GraphStore = h(_G0002_GraphStoreRead, null);\nexport const _G0002_URL = import.meta.url;\nasync function getState(node) {\n    return new Promise(thenish.bind(node));\n}\nasync function parse(state) {\n    return Promise.all(state.map(async (node) => {\n        if (Quad.is(node)) {\n            return quad(node, await parse(await getState(node)));\n        }\n        if (NamedNode.is(node)) {\n            return DefaultDataFactory.namedNode(node.options.value);\n        }\n        if (BlankNode.is(node)) {\n            return DefaultDataFactory.blankNode(node.options.value);\n        }\n        if (DefaultGraph.is(node)) {\n            return DefaultDataFactory.defaultGraph();\n        }\n        if (Literal.is(node)) {\n            return new rdf.Literal(node.options.value, node.options.language, DefaultDataFactory.fromTerm(node.options.datatype));\n        }\n        if (Variable.is(node)) {\n            return DefaultDataFactory.variable(node.options.value);\n        }\n        return rdf.DefaultDataFactory.fromTerm(node.options);\n    }));\n}\nasync function quad(token, terms) {\n    const [subject, predicate, object, graph] = terms;\n    const options = {\n        termType: \"Quad\",\n        value: \"\",\n        graph: new rdf.DefaultGraph(),\n        ...token.options\n    };\n    if (isQuadSubjectLike(subject)) {\n        options.subject = subject;\n        if (isQuadPredicateLike(predicate)) {\n            options.predicate = predicate;\n            if (isQuadObjectLike(object)) {\n                options.object = object;\n                if (isQuadGraphLike(graph)) {\n                    options.graph = graph;\n                }\n                else if (graph) {\n                    throw new Error(\"Graph is not valid\");\n                }\n            }\n            else if (object) {\n                throw new Error(\"Object is not valid\");\n            }\n        }\n        else if (predicate) {\n            throw new Error(\"Predicate is not valid\");\n        }\n    }\n    else if (subject) {\n        throw new Error(\"Subject is not valid\");\n    }\n    if (!isQuadLike(options)) {\n        throw new Error(\"Quad is not valid\");\n    }\n    return DefaultDataFactory.fromTerm(options);\n}\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import {Domain, Graph, MainGraph, DomainToken} from \"./main\";\nimport {Store} from \"../../examples/experiments/store\";\nimport {h, VNode, Instance} from \"@virtualstate/fringe\"\nimport {\n  assertQuadInstanceToken,\n  BlankNode,\n  DefaultGraph,\n  Literal,\n  NamedNode,\n  Quad,\n  QuadInstanceToken,\n  QuadToken,\n  Variable\n} from \"./tokens\";\nimport * as rdf from \"@opennetwork/rdf-data-model\";\nimport {\n  DefaultDataFactory,\n  isQuadGraphLike,\n  isQuadLike,\n  isQuadObjectLike,\n  isQuadPredicateLike,\n  isQuadSubjectLike,\n  QuadLike\n} from \"@opennetwork/rdf-data-model\";\nimport {thenish} from \"@virtualstate/fringe\";\n\nexport const Example = MainGraph;",
    structure: "<Graph>\n  <Quad graph={{\"termType\":\"NamedNode\",\"value\":\"mainGraph\"}}>\n    <NamedNode termType=\"NamedNode\" value=\"value\" />\n    <NamedNode termType=\"NamedNode\" value=\"name\" />\n    <Literal\n      termType=\"Literal\"\n      value=\"main\"\n      language=\"\"\n      datatype={{\"termType\":\"NamedNode\",\"value\":\"http://www.w3.org/2001/XMLSchema#string\"}}\n     />\n  </Quad>\n  <Quad graph={{\"termType\":\"NamedNode\",\"value\":\"mainGraph\"}}>\n    <NamedNode termType=\"NamedNode\" value=\"value\" />\n    <NamedNode termType=\"NamedNode\" value=\"version\" />\n    <Literal\n      termType=\"Literal\"\n      value=\"1.0.0\"\n      language=\"\"\n      datatype={{\"termType\":\"NamedNode\",\"value\":\"http://www.w3.org/2001/XMLSchema#string\"}}\n     />\n  </Quad>\n</Graph>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _G0002_ExampleInformation: ExampleInformation = {
    name: "GraphStore",
    id: "G0002",
    exportedAs: "_G0002_GraphStore",
    source: "import {Domain, Graph, MainGraph, DomainToken} from \"./main\";\nimport {Store} from \"../../examples/experiments/store\";\nimport {h, VNode, Instance} from \"@virtualstate/fringe\"\nimport {\n  assertQuadInstanceToken,\n  BlankNode,\n  DefaultGraph,\n  Literal,\n  NamedNode,\n  Quad,\n  QuadInstanceToken,\n  QuadToken,\n  Variable\n} from \"./tokens\";\nimport * as rdf from \"@opennetwork/rdf-data-model\";\nimport {\n  DefaultDataFactory,\n  isQuadGraphLike,\n  isQuadLike,\n  isQuadObjectLike,\n  isQuadPredicateLike,\n  isQuadSubjectLike,\n  QuadLike\n} from \"@opennetwork/rdf-data-model\";\nimport {thenish} from \"@virtualstate/fringe\";\n\nexport const _G0001_Graph = MainGraph;\nexport const _G0001_URL = import.meta.url;\n\nexport async function *_G0002_GraphStoreRead(): AsyncIterable<QuadInstanceToken[]> {\n  const store = (\n    <Store domain={Domain} visit={[Graph, Quad]}>\n      {MainGraph}\n    </Store>\n  );\n  await store;\n  yield await Promise.all(\n    [...store[Instance].get(Quad)]\n      .filter(Quad.is)\n      .map(async (input): Promise<QuadInstanceToken> => {\n        const instance: rdf.Quad = await quad(input, await parse(await getState(input)));\n        const frozen: Readonly<rdf.Quad> = Object.freeze(instance);\n        const token = Quad(frozen);\n        assertQuadInstanceToken(token);\n        return token;\n      })\n  );\n}\nexport const _G0002_GraphStore = <_G0002_GraphStoreRead />\nexport const _G0002_URL = import.meta.url;\n\nasync function getState(node: VNode) {\n  return new Promise<VNode[]>(thenish.bind(node));\n}\n\ntype Parsed = (rdf.Quad | ReturnType<rdf.DataFactory[\"fromTerm\"]>);\n\nasync function parse(state: VNode[]): Promise<Parsed[]> {\n  return Promise.all(\n    state.map(\n      async (node): Promise<Parsed> => {\n        if (Quad.is(node)) {\n          return quad(node, await parse(await getState(node)))\n        }\n        if (NamedNode.is(node)) {\n          return DefaultDataFactory.namedNode(node.options.value);\n        }\n        if (BlankNode.is(node)) {\n          return DefaultDataFactory.blankNode(node.options.value);\n        }\n        if (DefaultGraph.is(node)) {\n          return DefaultDataFactory.defaultGraph();\n        }\n        if (Literal.is(node)) {\n          return new rdf.Literal(\n            node.options.value,\n            node.options.language,\n            DefaultDataFactory.fromTerm(node.options.datatype)\n          );\n        }\n        if (Variable.is(node)) {\n          return DefaultDataFactory.variable(node.options.value);\n        }\n        return rdf.DefaultDataFactory.fromTerm(node.options);\n      }\n    )\n  )\n}\nasync function quad(token: QuadToken, terms: Parsed[]): Promise<rdf.Quad> {\n  const [\n    subject,\n    predicate,\n    object,\n    graph\n  ] = terms;\n  const options: Partial<Record<keyof QuadLike, unknown>> = {\n    termType: \"Quad\",\n    value: \"\",\n    graph: new rdf.DefaultGraph(),\n    ...token.options\n  };\n  if (isQuadSubjectLike(subject)) {\n    options.subject = subject;\n    if (isQuadPredicateLike(predicate)) {\n      options.predicate = predicate;\n      if (isQuadObjectLike(object)) {\n        options.object = object;\n        if (isQuadGraphLike(graph)) {\n          options.graph = graph;\n        } else if (graph) {\n          throw new Error(\"Graph is not valid\");\n        }\n      } else if (object) {\n        throw new Error(\"Object is not valid\");\n      }\n    } else if (predicate) {\n      throw new Error(\"Predicate is not valid\");\n    }\n  } else if (subject) {\n    throw new Error(\"Subject is not valid\");\n  }\n  if (!isQuadLike(options)) {\n    throw new Error(\"Quad is not valid\");\n  }\n  return DefaultDataFactory.fromTerm(options);\n}\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/graph/index.js",
    output: "import { Domain, Graph, MainGraph } from \"./main.js\";\nimport { Store } from \"../../examples/experiments/store/index.js\";\nimport { h, Instance } from \"@virtualstate/fringe\";\nimport { assertQuadInstanceToken, BlankNode, DefaultGraph, Literal, NamedNode, Quad, Variable } from \"./tokens.js\";\nimport * as rdf from \"@opennetwork/rdf-data-model\";\nimport { DefaultDataFactory, isQuadGraphLike, isQuadLike, isQuadObjectLike, isQuadPredicateLike, isQuadSubjectLike } from \"@opennetwork/rdf-data-model\";\nimport { thenish } from \"@virtualstate/fringe\";\nexport const _G0001_Graph = MainGraph;\nexport const _G0001_URL = import.meta.url;\nexport async function* _G0002_GraphStoreRead() {\n    const store = (h(Store, { domain: Domain, visit: [Graph, Quad] }, MainGraph));\n    await store;\n    yield await Promise.all([...store[Instance].get(Quad)]\n        .filter(Quad.is)\n        .map(async (input) => {\n        const instance = await quad(input, await parse(await getState(input)));\n        const frozen = Object.freeze(instance);\n        const token = Quad(frozen);\n        assertQuadInstanceToken(token);\n        return token;\n    }));\n}\nexport const _G0002_GraphStore = h(_G0002_GraphStoreRead, null);\nexport const _G0002_URL = import.meta.url;\nasync function getState(node) {\n    return new Promise(thenish.bind(node));\n}\nasync function parse(state) {\n    return Promise.all(state.map(async (node) => {\n        if (Quad.is(node)) {\n            return quad(node, await parse(await getState(node)));\n        }\n        if (NamedNode.is(node)) {\n            return DefaultDataFactory.namedNode(node.options.value);\n        }\n        if (BlankNode.is(node)) {\n            return DefaultDataFactory.blankNode(node.options.value);\n        }\n        if (DefaultGraph.is(node)) {\n            return DefaultDataFactory.defaultGraph();\n        }\n        if (Literal.is(node)) {\n            return new rdf.Literal(node.options.value, node.options.language, DefaultDataFactory.fromTerm(node.options.datatype));\n        }\n        if (Variable.is(node)) {\n            return DefaultDataFactory.variable(node.options.value);\n        }\n        return rdf.DefaultDataFactory.fromTerm(node.options);\n    }));\n}\nasync function quad(token, terms) {\n    const [subject, predicate, object, graph] = terms;\n    const options = {\n        termType: \"Quad\",\n        value: \"\",\n        graph: new rdf.DefaultGraph(),\n        ...token.options\n    };\n    if (isQuadSubjectLike(subject)) {\n        options.subject = subject;\n        if (isQuadPredicateLike(predicate)) {\n            options.predicate = predicate;\n            if (isQuadObjectLike(object)) {\n                options.object = object;\n                if (isQuadGraphLike(graph)) {\n                    options.graph = graph;\n                }\n                else if (graph) {\n                    throw new Error(\"Graph is not valid\");\n                }\n            }\n            else if (object) {\n                throw new Error(\"Object is not valid\");\n            }\n        }\n        else if (predicate) {\n            throw new Error(\"Predicate is not valid\");\n        }\n    }\n    else if (subject) {\n        throw new Error(\"Subject is not valid\");\n    }\n    if (!isQuadLike(options)) {\n        throw new Error(\"Quad is not valid\");\n    }\n    return DefaultDataFactory.fromTerm(options);\n}\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import {Domain, Graph, MainGraph, DomainToken} from \"./main\";\nimport {Store} from \"../../examples/experiments/store\";\nimport {h, VNode, Instance} from \"@virtualstate/fringe\"\nimport {\n  assertQuadInstanceToken,\n  BlankNode,\n  DefaultGraph,\n  Literal,\n  NamedNode,\n  Quad,\n  QuadInstanceToken,\n  QuadToken,\n  Variable\n} from \"./tokens\";\nimport * as rdf from \"@opennetwork/rdf-data-model\";\nimport {\n  DefaultDataFactory,\n  isQuadGraphLike,\n  isQuadLike,\n  isQuadObjectLike,\n  isQuadPredicateLike,\n  isQuadSubjectLike,\n  QuadLike\n} from \"@opennetwork/rdf-data-model\";\nimport {thenish} from \"@virtualstate/fringe\";\n\nexport const Example = MainGraph;",
    structure: "<>\n  <Quad\n    termType=\"Quad\"\n    value=\"\"\n    subject={{\"termType\":\"NamedNode\",\"value\":\"value\"}}\n    predicate={{\"termType\":\"NamedNode\",\"value\":\"name\"}}\n    object={{\"termType\":\"Literal\",\"value\":\"main\",\"language\":\"\",\"datatype\":{\"termType\":\"NamedNode\",\"value\":\"http://www.w3.org/2001/XMLSchema#string\"}}}\n    graph={{\"termType\":\"NamedNode\",\"value\":\"mainGraph\"}}\n   />\n  <Quad\n    termType=\"Quad\"\n    value=\"\"\n    subject={{\"termType\":\"NamedNode\",\"value\":\"value\"}}\n    predicate={{\"termType\":\"NamedNode\",\"value\":\"version\"}}\n    object={{\"termType\":\"Literal\",\"value\":\"1.0.0\",\"language\":\"\",\"datatype\":{\"termType\":\"NamedNode\",\"value\":\"http://www.w3.org/2001/XMLSchema#string\"}}}\n    graph={{\"termType\":\"NamedNode\",\"value\":\"mainGraph\"}}\n   />\n</>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _H1001_ExampleInformation: ExampleInformation = {
    name: "HTML",
    id: "H1001",
    exportedAs: "_H1001_HTML",
    source: "import { h, createFragment } from \"@virtualstate/fringe\";\n\nexport const _H1001_HTML = (\n  <>\n    <head>\n      <title>My Website</title>\n      <meta name=\"test\" value=\"value\" />\n    </head>\n    <body>\n      <main class=\"main\">\n        Example!\n      </main>\n    </body>\n  </>\n)\nexport const _H1001_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/html/html.js",
    output: "import { h, createFragment } from \"@virtualstate/fringe\";\nexport const _H1001_HTML = (h(createFragment, null,\n    h(\"head\", null,\n        h(\"title\", null, \"My Website\"),\n        h(\"meta\", { name: \"test\", value: \"value\" })),\n    h(\"body\", null,\n        h(\"main\", { class: \"main\" }, \"Example!\"))));\nexport const _H1001_URL = import.meta.url;\n//# sourceMappingURL=html.js.map",
    cleanerSource: "import { h, createFragment } from \"@virtualstate/fringe\";\n\nexport const Example = (\n  <>\n    <head>\n      <title>My Website</title>\n      <meta name=\"test\" value=\"value\" />\n    </head>\n    <body>\n      <main class=\"main\">\n        Example!\n      </main>\n    </body>\n  </>\n)",
    structure: "<>\n  <head>\n    <title>\n      My Website\n    </title>\n    <meta name=\"test\" value=\"value\" />\n  </head>\n  <body>\n    <main class=\"main\">\n      Example!\n    </main>\n  </body>\n</>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _W0001_ExampleInformation: ExampleInformation = {
    name: "StartHTML",
    id: "W0001",
    exportedAs: "_W0001_StartHTML",
    source: "import {h} from \"@virtualstate/fringe\";\n\nasync function Import(url: string, name: string) {\n  const { [name]: contents } = await import(url);\n  return h(contents);\n}\n\nexport const _W0001_StartHTML = h(Import.bind(undefined, \"./start.js\", \"default\"));\nexport const _W0001_URL = import.meta.url;\nexport const _W0002_Start = h(Import.bind(undefined, \"./start.js\", \"SiteContents\"));\nexport const _W0002_URL = import.meta.url;\nexport const _W0003_ButtonHTML = h(Import.bind(undefined, \"./button.js\", \"default\"));\nexport const _W0003_URL = import.meta.url;\nexport const _W0004_Button = h(Import.bind(undefined, \"./button.js\", \"SiteContents\"));\nexport const _W0004_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/walkthrough/index.js",
    output: "import { h } from \"@virtualstate/fringe\";\nasync function Import(url, name) {\n    const { [name]: contents } = await import(url);\n    return h(contents);\n}\nexport const _W0001_StartHTML = h(Import.bind(undefined, \"./start.js\", \"default\"));\nexport const _W0001_URL = import.meta.url;\nexport const _W0002_Start = h(Import.bind(undefined, \"./start.js\", \"SiteContents\"));\nexport const _W0002_URL = import.meta.url;\nexport const _W0003_ButtonHTML = h(Import.bind(undefined, \"./button.js\", \"default\"));\nexport const _W0003_URL = import.meta.url;\nexport const _W0004_Button = h(Import.bind(undefined, \"./button.js\", \"SiteContents\"));\nexport const _W0004_URL = import.meta.url;\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import {h} from \"@virtualstate/fringe\";\n\nasync function Import(url: string, name: string) {\n  const { [name]: contents } = await import(url);\n  return h(contents);\n}\n\nexport const Example = h(Import.bind(undefined, \"./start.js\", \"default\"));",
    structure: "<html>\n  <body>\n    <script type=\"application/javascript\">\n      const { h } = await import(\"@virtualstate/fringe\");\n      const { render } = await import(\"@virtualstate/dom\");\n      async function SiteContents() {\n          return h(\"p\", {}, \"Hello World!\");\n      }\n      async function Site() {\n          const root = document.createElement(\"div\");\n          await render(h(SiteContents), root);\n          document.body.append(root);\n      }\n      await Site()\n    </script>\n  </body>\n</html>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _W0002_ExampleInformation: ExampleInformation = {
    name: "Start",
    id: "W0002",
    exportedAs: "_W0002_Start",
    source: "import {h} from \"@virtualstate/fringe\";\n\nasync function Import(url: string, name: string) {\n  const { [name]: contents } = await import(url);\n  return h(contents);\n}\n\nexport const _W0001_StartHTML = h(Import.bind(undefined, \"./start.js\", \"default\"));\nexport const _W0001_URL = import.meta.url;\nexport const _W0002_Start = h(Import.bind(undefined, \"./start.js\", \"SiteContents\"));\nexport const _W0002_URL = import.meta.url;\nexport const _W0003_ButtonHTML = h(Import.bind(undefined, \"./button.js\", \"default\"));\nexport const _W0003_URL = import.meta.url;\nexport const _W0004_Button = h(Import.bind(undefined, \"./button.js\", \"SiteContents\"));\nexport const _W0004_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/walkthrough/index.js",
    output: "import { h } from \"@virtualstate/fringe\";\nasync function Import(url, name) {\n    const { [name]: contents } = await import(url);\n    return h(contents);\n}\nexport const _W0001_StartHTML = h(Import.bind(undefined, \"./start.js\", \"default\"));\nexport const _W0001_URL = import.meta.url;\nexport const _W0002_Start = h(Import.bind(undefined, \"./start.js\", \"SiteContents\"));\nexport const _W0002_URL = import.meta.url;\nexport const _W0003_ButtonHTML = h(Import.bind(undefined, \"./button.js\", \"default\"));\nexport const _W0003_URL = import.meta.url;\nexport const _W0004_Button = h(Import.bind(undefined, \"./button.js\", \"SiteContents\"));\nexport const _W0004_URL = import.meta.url;\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import {h} from \"@virtualstate/fringe\";\n\nasync function Import(url: string, name: string) {\n  const { [name]: contents } = await import(url);\n  return h(contents);\n}\n\nexport const Example = h(Import.bind(undefined, \"./start.js\", \"default\"));",
    structure: "<p>\n  {\"Hello World!\"}\n</p>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _W0003_ExampleInformation: ExampleInformation = {
    name: "ButtonHTML",
    id: "W0003",
    exportedAs: "_W0003_ButtonHTML",
    source: "import {h} from \"@virtualstate/fringe\";\n\nasync function Import(url: string, name: string) {\n  const { [name]: contents } = await import(url);\n  return h(contents);\n}\n\nexport const _W0001_StartHTML = h(Import.bind(undefined, \"./start.js\", \"default\"));\nexport const _W0001_URL = import.meta.url;\nexport const _W0002_Start = h(Import.bind(undefined, \"./start.js\", \"SiteContents\"));\nexport const _W0002_URL = import.meta.url;\nexport const _W0003_ButtonHTML = h(Import.bind(undefined, \"./button.js\", \"default\"));\nexport const _W0003_URL = import.meta.url;\nexport const _W0004_Button = h(Import.bind(undefined, \"./button.js\", \"SiteContents\"));\nexport const _W0004_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/walkthrough/index.js",
    output: "import { h } from \"@virtualstate/fringe\";\nasync function Import(url, name) {\n    const { [name]: contents } = await import(url);\n    return h(contents);\n}\nexport const _W0001_StartHTML = h(Import.bind(undefined, \"./start.js\", \"default\"));\nexport const _W0001_URL = import.meta.url;\nexport const _W0002_Start = h(Import.bind(undefined, \"./start.js\", \"SiteContents\"));\nexport const _W0002_URL = import.meta.url;\nexport const _W0003_ButtonHTML = h(Import.bind(undefined, \"./button.js\", \"default\"));\nexport const _W0003_URL = import.meta.url;\nexport const _W0004_Button = h(Import.bind(undefined, \"./button.js\", \"SiteContents\"));\nexport const _W0004_URL = import.meta.url;\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import {h} from \"@virtualstate/fringe\";\n\nasync function Import(url: string, name: string) {\n  const { [name]: contents } = await import(url);\n  return h(contents);\n}\n\nexport const Example = h(Import.bind(undefined, \"./start.js\", \"default\"));",
    structure: "<html>\n  <body>\n    <script type=\"application/javascript\">\n      const { h, createFragment } = await import(\"@virtualstate/fringe\");\n      const { render } = await import(\"@virtualstate/dom\");\n      async function SiteContents() {\n          return createFragment({}, h(\"p\", {}, \"Hello World!\"), h(\"button\", {\n              type: \"button\",\n              onClick() {\n                  alert(\"Button clicked!\");\n              }\n          }, \"Press me!!\"));\n      }\n      async function Site() {\n          const root = document.createElement(\"div\");\n          await render(h(SiteContents), root);\n          document.body.append(root);\n      }\n      await Site()\n    </script>\n  </body>\n</html>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _W0004_ExampleInformation: ExampleInformation = {
    name: "Button",
    id: "W0004",
    exportedAs: "_W0004_Button",
    source: "import {h} from \"@virtualstate/fringe\";\n\nasync function Import(url: string, name: string) {\n  const { [name]: contents } = await import(url);\n  return h(contents);\n}\n\nexport const _W0001_StartHTML = h(Import.bind(undefined, \"./start.js\", \"default\"));\nexport const _W0001_URL = import.meta.url;\nexport const _W0002_Start = h(Import.bind(undefined, \"./start.js\", \"SiteContents\"));\nexport const _W0002_URL = import.meta.url;\nexport const _W0003_ButtonHTML = h(Import.bind(undefined, \"./button.js\", \"default\"));\nexport const _W0003_URL = import.meta.url;\nexport const _W0004_Button = h(Import.bind(undefined, \"./button.js\", \"SiteContents\"));\nexport const _W0004_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/walkthrough/index.js",
    output: "import { h } from \"@virtualstate/fringe\";\nasync function Import(url, name) {\n    const { [name]: contents } = await import(url);\n    return h(contents);\n}\nexport const _W0001_StartHTML = h(Import.bind(undefined, \"./start.js\", \"default\"));\nexport const _W0001_URL = import.meta.url;\nexport const _W0002_Start = h(Import.bind(undefined, \"./start.js\", \"SiteContents\"));\nexport const _W0002_URL = import.meta.url;\nexport const _W0003_ButtonHTML = h(Import.bind(undefined, \"./button.js\", \"default\"));\nexport const _W0003_URL = import.meta.url;\nexport const _W0004_Button = h(Import.bind(undefined, \"./button.js\", \"SiteContents\"));\nexport const _W0004_URL = import.meta.url;\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import {h} from \"@virtualstate/fringe\";\n\nasync function Import(url: string, name: string) {\n  const { [name]: contents } = await import(url);\n  return h(contents);\n}\n\nexport const Example = h(Import.bind(undefined, \"./start.js\", \"default\"));",
    structure: "<>\n  <p>\n    {\"Hello World!\"}\n  </p>\n  <button type=\"button\" onClick={() => undefined}>\n    {\"Press me!!\"}\n  </button>\n</>",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
export const _Z0001_ExampleInformation: ExampleInformation = {
    name: "StringWebsite",
    id: "Z0001",
    exportedAs: "_Z0001_StringWebsite",
    source: "import { toString, h, createFragment } from \"@virtualstate/fringe\";\n\nfunction MyWebsite() {\n  return (\n    <html>\n      <head>\n        <title>My Website</title>\n      </head>\n      <body>\n        <h1>Hello!</h1>\n        <main>\n          <p key=\"huh\">Content here</p>\n          <p attr={false} other={true} value={1} one=\"two\">Content there</p>\n        </main>\n        <footer>\n          <a href=\"https://example.com\" target=\"_blank\">example.com</a>\n        </footer>\n      </body>\n    </html>\n  )\n}\n\nasync function Render() {\n  // for await (const iteration of toString(<MyWebsite />)) {\n  //   console.log({ iteration });\n  // }\n  return toString(<MyWebsite />)\n}\n\nexport const _Z0001_StringWebsite = <Render />\nexport const _Z0001_URL = import.meta.url;\n",
    sourceURL: "file:///workspaces/x/packages/examples/lib/examples/string/index.js",
    output: "import { toString, h } from \"@virtualstate/fringe\";\nfunction MyWebsite() {\n    return (h(\"html\", null,\n        h(\"head\", null,\n            h(\"title\", null, \"My Website\")),\n        h(\"body\", null,\n            h(\"h1\", null, \"Hello!\"),\n            h(\"main\", null,\n                h(\"p\", { key: \"huh\" }, \"Content here\"),\n                h(\"p\", { attr: false, other: true, value: 1, one: \"two\" }, \"Content there\")),\n            h(\"footer\", null,\n                h(\"a\", { href: \"https://example.com\", target: \"_blank\" }, \"example.com\")))));\n}\nasync function Render() {\n    // for await (const iteration of toString(<MyWebsite />)) {\n    //   console.log({ iteration });\n    // }\n    return toString(h(MyWebsite, null));\n}\nexport const _Z0001_StringWebsite = h(Render, null);\nexport const _Z0001_URL = import.meta.url;\n//# sourceMappingURL=index.js.map",
    cleanerSource: "import { toString, h, createFragment } from \"@virtualstate/fringe\";\n\nfunction MyWebsite() {\n  return (\n    <html>\n      <head>\n        <title>My Website</title>\n      </head>\n      <body>\n        <h1>Hello!</h1>\n        <main>\n          <p key=\"huh\">Content here</p>\n          <p attr={false} other={true} value={1} one=\"two\">Content there</p>\n        </main>\n        <footer>\n          <a href=\"https://example.com\" target=\"_blank\">example.com</a>\n        </footer>\n      </body>\n    </html>\n  )\n}\n\nasync function Render() {\n  // for await (const iteration of toString(<MyWebsite />)) {\n  //   console.log({ iteration });\n  // }\n  return toString(<MyWebsite />)\n}\n\nexport const Example = <Render />",
    structure: "\"<html><head><title>My Website</title></head>\\n<body><h1>Hello!</h1>\\n<main><p key=\\\"huh\\\">Content here</p>\\n<p other value=\\\"1\\\" one=\\\"two\\\">Content there</p></main>\\n<footer><a href=\\\"https://example.com\\\" target=\\\"_blank\\\">example.com</a></footer></body></html>\"",
    info: undefined,
    engineURL: undefined,
    sourceInterfaceURL: undefined,
    sourceInterface: undefined,
    import: async (context?: Record<string, unknown>, state?: VNode): Promise<VNode> => {
      throw new Error("Not available");
    }
}
