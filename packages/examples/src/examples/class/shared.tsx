import { h } from "../../jsx";
import {And} from "../experiments/combinational/and";

class Component {

  iterations = 0;

  async *[Symbol.asyncIterator]() {
    const id = this.iterations += 1;
    yield { reference: `Iteration ${id}` };
  }

}

const node = <Component />

export const _405_SharedInstance = (
  <container>
    <And size={3} self>
      {node}
      {node}
      {node}
    </And>
  </container>
)
