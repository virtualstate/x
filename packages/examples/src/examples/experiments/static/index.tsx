import { Sync } from "./static";
import { Cactus, Scroll, TestTube, Thread } from "./domain";
import { h, createFragment } from "@virtualstate/fringe";

export * from "./static";

const node = (
  <TestTube>
    <Thread size={2} />
    <Cactus spikes="spikey" />
    <Cactus spikes="not very spikey" />
    <Scroll />
  </TestTube>
)

export const _E4001_StaticSync = (
  <Sync>
    {node}
  </Sync>
)
export const _E4001_URL = import.meta.url;

export const _E4002_StaticSync = (
  <>
    {_E4001_StaticSync}
    {_E4001_StaticSync}
    {_E4001_StaticSync}
    {_E4001_StaticSync}
  </>
);
export const _E4002_URL = import.meta.url;
