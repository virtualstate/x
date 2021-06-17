import { h } from "@virtualstate/fringe";

class Component {

  async *[Symbol.asyncIterator]() {
    yield "🪁";
    yield "💡";
  }

}

export const _401_Class = (
  <Component />
);
export const _401_URL = import.meta.url;
