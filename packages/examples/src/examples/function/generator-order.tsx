import { h } from "@virtualstate/fringe";
import { read } from "./read";

function *Component() {
  console.log("πΈ");
  yield "πΏ";
  console.log("π");
  yield "π";
  console.log("π‘");
}

async function Log() {
  console.log("πΎοΈ\n");
  for await (const node of read(<Component />)) {
    console.log(node.source);
    console.log("\nβ­οΈ\n");
  }
  console.log("\nπ");
}

export const _208_LogOrder = (
  <Log />
)
export const _208_URL = import.meta.url;
export const _208_Info = {
  producesOutput: true
}
