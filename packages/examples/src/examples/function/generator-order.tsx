import { h } from "../../jsx";
import { read } from "./read";

function *Component() {
  console.log("🪁");
  yield "💿";
  console.log("💎");
  yield "🔑";
  console.log("💡");
}

async function Log() {
  console.log("🟢️\n");
  for await (const node of read(<Component />)) {
    console.log(node.source);
    console.log("\n⏭️\n");
  }
  console.log("\n🛑");
}

export const _208_LogOrder = (
  <Log />
)
export const _208_URL = import.meta.url;
export const _208_Info = {
  producesOutput: true
}
