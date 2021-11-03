import {h, createToken, VNode, TokenVNode} from "@virtualstate/fringe";

async function *eventListener(that: Element, event: string): AsyncIterable<Event> {

}

interface ValueUpdateOptions {
  id: string;
  value: string;
}
const ValueUpdateSymbol = Symbol("ValueUpdate");
const ValueUpdate = createToken<typeof ValueUpdateSymbol, ValueUpdateOptions>(ValueUpdateSymbol);

async function *WatchValue(this: HTMLInputElement): AsyncIterable<TokenVNode> {
  for await (const event of eventListener(this, "input")) {
    yield <ValueUpdate value={this.value} id={this.id} />
  }
}

const example = (
  <form>
    <input type="text" value="">
      <WatchValue />
    </input>
  </form>
)

const example2 = (
  h("form", {},
    h("input", { type: "text", value: "", id: "something" },
      h(WatchValue)
    )
  )
)

interface ExampleType extends VNode {
  source: "form",
  children: AsyncIterable<({
    source: "input",
    options: {
      id: string
    },
    children: AsyncIterable<({
      source: typeof WatchValue
    })[]>
  } & VNode)[]>
}

const typed: ExampleType = example2;

async function *render(hasUser?: boolean): AsyncIterable<VNode[]> {
  const form = document.createElement(typed.source);
  document.getElementById("root").append(form);
  for await (const elements of typed.children) {
    for (const element of elements) {
      const input = document.createElement(element.source);
      form.append(input);
      /* set some attributes here */
      const yielding: VNode[] = [];
      if (element.source === "input") {
        if (hasUser) {
          for await (const processors of element.children) {
            yielding.push(h(
              processors.map(processor => ({
                ...processor,
                source: processor.source.bind(input)
              }))
            ));
          }
        }
      }
      yield yielding;
    }
  }
}

async function exampleRun() {
  for await (const events of h(render(true)).children) {
    for (const event of events) {
      if (ValueUpdate.is(event)) {
        console.log({ [event.options.id]: event.options.value });
      }
    }
  }
}
