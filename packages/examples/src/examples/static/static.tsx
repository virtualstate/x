import { h } from "@virtualstate/fringe";
import { Cactus, Scroll, TestTube, Thread } from "./domain";

export const _501_Static = (
  <TestTube>
    <Thread size={2} />
    <Cactus spikes="spikey" />
    <Cactus spikes="not very spikey" />
    <Scroll />
  </TestTube>
);
export const _501_URL = import.meta.url;
