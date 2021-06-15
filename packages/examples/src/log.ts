import * as Examples from "./examples";
import { isVNode } from "@virtualstate/fringe";
import {getExampleNameFromKey, log} from "./log.util";

for (const exampleKey in Examples) {
  const example = Examples[exampleKey];
  if (!isVNode(example)) continue;
  const name = getExampleNameFromKey(exampleKey);
  console.log(`Example: ${name}\n`);
  await log(example, exampleKey.includes("Loop"), true);
  console.log("");
}


export default 1;
export const isLog = 1;
