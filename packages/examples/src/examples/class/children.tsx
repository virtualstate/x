import { h, createFragment } from "../../jsx";
import {VNode} from "@virtualstate/fringe";

class Component {

  constructor(o, private child: VNode) {
  }

  async *[Symbol.asyncIterator]() {
    yield <container>{this.child}</container>;
  }

}

export const _403_ClassWithChildren= (
  <Component>
    <innerChild />
  </Component>
)
