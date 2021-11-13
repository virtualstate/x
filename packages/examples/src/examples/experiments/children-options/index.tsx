import {ChildrenOptions, ChildrenTransformOptions, h, VNode, createFragment} from "@virtualstate/fringe";

function TryItOut(this: { counter?: number }) {
  console.log({ TryItOut: this });
  this.counter = 0;
  console.log({ TryItOutSet: this });
  return (
    <>
      <Child />
      <Child />
      <Child />
    </>
  )
}

function Child(this: { counter: number }) {
  console.log({ Child: this });
  this.counter += 1;
  return <output>{this.counter}</output>
}

const context = new WeakMap<object, unknown>();

const Provided = Symbol("Provided");

function proxyNode(options: ChildrenTransformOptions, defaultContext: object, node: VNode) {
  return new Proxy<VNode>(node, {
    get(target: VNode, p: keyof VNode | typeof ChildrenOptions) {
      if (p === ChildrenOptions) {
        return target[p] || options;
      }
      const value = target[p];
      if (p === "source" && typeof value === "function") {
        let sourceContext = context.get(options);
        if (!sourceContext) {
          sourceContext = {
            ...defaultContext
          };
          context.set(options, sourceContext);
        }
        return value.bind(sourceContext);
      }
      return value;
    }
  });
}
function createOptions(defaultContext: object): ChildrenTransformOptions {
  const options: ChildrenTransformOptions = {
    createNode: h,
    proxyNode() {
      throw new Error("Not Implemented");
    }
  };
  options.proxyNode = proxyNode.bind(undefined, options, defaultContext);
  return options;
}
function bind(defaultContext: object, node: VNode): VNode {
  const options = createOptions(defaultContext);
  return options.proxyNode?.(node) ?? node;
}

const bound = bind({ [Provided]: true, counter: undefined }, <TryItOut />);

export const _EC001_ChildrenOptions = bound;
export const _EC001_URL = import.meta.url;
