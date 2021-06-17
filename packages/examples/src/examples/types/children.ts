import { h, VNode } from "@virtualstate/fringe";

interface SoccerBallOptions {
  pressure: "pumped" | "flat"
}
const soccerOptions: SoccerBallOptions = {
  pressure: "pumped"
}
const soccer = h("⚽", soccerOptions);

const node = h("🐸", {}, soccer);
const source: "🐸" = node.source;
const children: AsyncIterable<VNode[]> = node.children;
const childrenOther: AsyncIterable<(typeof soccer)[]> = node.children;

for await (const children of node.children) {
  for (const child of children) {
    const childSource: "⚽" = child.source;
    const childOptions: SoccerBallOptions = child.options;
    const childChildren: never = child.children;
  }
}

export const _602_TypeStructure = node;
export const _602_URL = import.meta.url;
