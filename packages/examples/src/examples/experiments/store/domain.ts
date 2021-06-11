import {createToken, TokenVNodeBase, TokenVNodeFn} from "@virtualstate/fringe";


export const CactusSymbol = Symbol("🌵");
export interface CactusOptions {
  spikes: "spikey" | "not very spikey"
}
export type CactusToken = TokenVNodeBase<typeof CactusSymbol, CactusOptions>;
export type CactusTokenFn = TokenVNodeFn<typeof CactusSymbol, CactusOptions>;
export const Cactus: CactusTokenFn = createToken(CactusSymbol);

export const TestTubeSymbol = Symbol("🧪");
export interface TestTubeOptions {
  size?: number;
}
export type TestTubeToken = TokenVNodeBase<typeof TestTubeSymbol, TestTubeOptions>;
export type TestTubeTokenFn = TokenVNodeFn<typeof TestTubeSymbol, TestTubeOptions>;
export const TestTube: TestTubeTokenFn = createToken(TestTubeSymbol);

export const ThreadSymbol = Symbol("🧵");
export interface ThreadOptions {
  size?: number;
}
export type ThreadToken = TokenVNodeBase<typeof ThreadSymbol, ThreadOptions>;
export type ThreadTokenFn = TokenVNodeFn<typeof ThreadSymbol, ThreadOptions>;
export const Thread: ThreadTokenFn = createToken(ThreadSymbol);

export const ScrollSymbol = Symbol("📜");
export interface ScrollOptions {
  size?: number;
}
export type ScrollToken = TokenVNodeBase<typeof ScrollSymbol, ScrollOptions>;
export type ScrollTokenFn = TokenVNodeFn<typeof ScrollSymbol, ScrollOptions>;
export const Scroll: ScrollTokenFn = createToken(ScrollSymbol);

const domainMap = {
  Scroll,
  Thread,
  Cactus,
  TestTube
}

type DomainTokenMap = typeof domainMap;
export type DomainToken = DomainTokenMap[keyof DomainTokenMap];

export const Domain: DomainToken[] = [
  ...Object.values(domainMap)
]
