import {ChildrenSource, EnableThen, h} from "@virtualstate/fringe";

const node = (
  <p {...{ [EnableThen]: true }}>
    <z>
      <a />
    </z>
    <z>
      <b />
    </z>
    <z>
      <c />
    </z>
  </p>
)

async function Example() {
  const result = await node;
  return result.map(node => node.children[ChildrenSource]);
}

export const _304_AsPromiseOptions = <Example />
export const _304_URL = import.meta.url;
