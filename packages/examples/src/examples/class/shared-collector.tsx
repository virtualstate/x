import { h } from "../../jsx";
import {And} from "../experiments/combinational/and";
import {Collector} from "microtask-collector";

class Component {

  iterations = 0;

  collector = new Collector<number>({
    eagerCollection: true
  });

  seen = [];

  constructor(public options: { expect: number }) {
    void this.watch();
  }

  async watch() {
    for await (const batch of this.collector) {
      this.seen.push(...batch)
    }
  }

  async *[Symbol.asyncIterator]() {
    const id = this.iterations += 1;
    this.collector.add(id);
    yield { reference: `Iteration ${id}` };
    yield `Seen: ${this.seen.join(", ")}`;
  }

}

const node = <Component expect={3} />

export const _407_SharedCollector = (
  <container>
    <And size={3} self>
      {node}
      {node}
      {node}
    </And>
  </container>
)
