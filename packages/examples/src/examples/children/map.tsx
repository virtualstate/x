import {h, createFragment, VNode} from "@virtualstate/fringe";

const input: VNode = (
  <>
    <number value={1} />
    <number value={2} />
    <number value={3} />
    <done />
  </>
)

async function Map() {
  const iterations = await input.children[Symbol.asyncIterator]()
    .map(children => children.map(child => {
      if (!isNumber(child)) return child;
      return {
        ...child,
        source: child.options.value,
        scalar: true,
        options: undefined
      };
    }))
    .toArray();

  console.log(iterations)

  return iterations[iterations.length - 1];

  function isNumber(value: VNode): value is VNode & { source: "number", options: { value: number } } {
    return value.source === "number";
  }
}
export const _CH0002_ChildrenMap = <Map />;
export const _CH0002_URL = import.meta.url;
export const _CH0002_IsResolving = true;

