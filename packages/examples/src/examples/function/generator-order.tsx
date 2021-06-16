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
  console.log("🧲");
  for await (const node of read(<Component />)) {
    console.log(node.source);
  }
  console.log("🧪");
}

export const _208_LogOrder = (
  <Log />
)
export const _208_URL = import.meta.url;
export const _208_Info = {
  producesOutput: true
}
