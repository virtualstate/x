import { h } from "../../jsx";

class Component {

  async *[Symbol.asyncIterator]() {
    yield "First Result";
    yield "Second Result";
  }

}

export const _401_Class = (
  <Component />
)
export const _401_URL = import.meta.url;
