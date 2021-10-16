import {assertPromiseVNode, ChildrenSource, h, thenish} from "@virtualstate/fringe";

async function *Whatever() {
  yield (
    <p>
      <z>
        <a />
      </z>
      <z>
        <b />
      </z>
    </p>
  )
  yield (
    <p>
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
}

async function Example() {
  const node = (
    <Whatever />
  )
  node.then = thenish;
  assertPromiseVNode(node);

  const [p] = await node;

  p.then = thenish;
  assertPromiseVNode(p);
  const result = await p;

  return result.map(node => node.children[ChildrenSource]);
}

export const _303_AsPromise = <Example />
export const _303_URL = import.meta.url;
