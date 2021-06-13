import {Cactus, Scroll, TestTube, Thread} from "../experiments/store/domain";
import {h} from "@virtualstate/fringe";

export const _501_Static = (
  <TestTube>
    <Thread size={2} />
    <Cactus spikes="spikey" />
    <Cactus spikes="not very spikey" />
    <Scroll />
  </TestTube>
);
