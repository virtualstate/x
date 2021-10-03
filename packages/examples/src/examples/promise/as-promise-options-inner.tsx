import {ChildrenSource, EnableThen, h, createFragment} from "@virtualstate/fringe";

async function *Inner() {
  yield (
    <>
      <z>
        <a />
      </z>
      <z>
        <b />
      </z>
      <z>
        <c />
      </z>
    </>
  )
}

const node = (
  <p {...{ [EnableThen]: true }}>
    <Inner />
  </p>
)

async function Example() {
  const result = await node;
  return result.map(node => node.children[ChildrenSource]);
}

export const _305_AsPromiseOptions = <Example />
export const _305_URL = import.meta.url;
