import {h, VNode} from "@virtualstate/fringe";
import {Store} from "./store";
import {Domain, Cactus, Scroll, TestTube, Thread, DomainToken} from "./domain";
import {Instance} from "@virtualstate/fringe";

export * from "./store";

const store: VNode & { [Instance]?: Store<DomainToken> } = (
  <Store domain={Domain} final visit={[TestTube]}>
    <TestTube>
      <Thread size={2} />
      <Cactus spikes="spikey" />
      <Cactus spikes="not very spikey" />
      <Scroll />
    </TestTube>
  </Store>
)

function *Look(o: unknown, state?: VNode) {
  yield state;
  console.log(store[Instance]?.get(TestTube));
}

export const _E2001_Store = (
  <container>
    <Look>
      {store}
    </Look>
  </container>
)
export const _E2001_URL = import.meta.url;
