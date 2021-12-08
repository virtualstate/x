import {h, createFragment} from "@virtualstate/fringe";
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

async function StaticLog() {
  const [thread, spikeyCactus, cactus, scroll] = _501_Static.children;
  const log = { thread, spikeyCactus, cactus, scroll };
  console.log("sync", log);
  for await (const [thread, spikeyCactus, cactus, scroll] of _501_Static.children) {
    console.log("async", { thread, spikeyCactus, cactus, scroll });
  }
  return (
    <>
      {Object.entries(log).map(([Key, result]) => <Key>{result}</Key>)}
    </>
  );
}

export const _502_Static = <StaticLog />;
export const _502_URL = import.meta.url;
