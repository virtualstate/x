import { createStaticNode } from "./static";
import { Cactus, Scroll, TestTube, Thread } from "../store/domain";
import { h } from "@virtualstate/fringe";

export * from "./static";

const node = (
  <TestTube>
    <Thread size={2} />
    <Cactus spikes="spikey" />
    <Cactus spikes="not very spikey" />
    <Scroll />
  </TestTube>
)

export const _E4001_Static = createStaticNode(node);
export const _E4001_URL = import.meta.url;
