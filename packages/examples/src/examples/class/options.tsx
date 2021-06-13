import { h } from "../../jsx";

interface ComponentOptions {
  meta: string
}

class Component {

  constructor(private options: ComponentOptions) {
  }

  async *[Symbol.asyncIterator]() {
    yield `${this.options.meta} value`;
  }

}

export const _402_ClassWithOptions = (
  <Component meta="Some" />
)
export const _402_URL = import.meta.url;
