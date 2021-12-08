import {h, createFragment, EnableThen} from "@virtualstate/fringe";
import { Cactus, Scroll, TestTube, Thread } from "./domain";
import {isIterable} from "iterable";

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
  console.log("sync", { thread, spikeyCactus, cactus, scroll });
  for await (const [threadAsync, spikeyCactusAsync, cactusAsync, scrollAsync] of _501_Static.children) {
    console.log("async", { thread: threadAsync, spikeyCactus: spikeyCactusAsync, cactus: cactusAsync, scroll: scrollAsync });
  }
  //
  const promise = Promise.resolve(_501_Static.children);
  const [threadAsync, spikeyCactusAsync, cactusAsync, scrollAsync] = await promise;
  console.log("promise", { promise, thread: threadAsync, spikeyCactus: spikeyCactusAsync, cactus: cactusAsync, scroll: scrollAsync });
  const child = h(Symbol("Child"), { [EnableThen]: true });
  const it = Symbol("It");
  let Component = h(it, { [EnableThen]: true }, child);

  await Component;
  if (isIterable(Component.children)) {
    console.log([...Component.children]);
  }
  return (
    <>
      {Object.entries({ thread, spikeyCactus, cactus, scroll }).map(([Key, result]) => <Key>{result}</Key>)}
    </>
  );
}

export const _502_Static = <StaticLog />;
export const _502_URL = import.meta.url;
