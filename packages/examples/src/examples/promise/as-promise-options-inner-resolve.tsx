import { Resolve } from "@virtualstate/fringe";
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
  <Resolve>
    <Inner />
  </Resolve>
)

async function Example() {
  const result = await node;
  return result.map(node => node.children[ChildrenSource]);
}

export const _306_AsPromiseResolve = <Example />
export const _306_URL = import.meta.url;
