import {assertPromiseVNode, ChildrenSource, h, then} from "@virtualstate/fringe";

async function *Whatever() {
  yield (
    <p>
      <z>A</z>
      <z>B</z>
    </p>
  )
  yield (
    <p>
      <z>A</z>
      <z>B</z>
      <z>C</z>
    </p>
  )
}

async function Example() {
  const node = (
    <Whatever />
  )
  node.then = then;
  assertPromiseVNode(node);

  const [p] = await node;

  console.log({ node, p });

  p.then = then;
  assertPromiseVNode(p);
  const result = await p;

  return result.map(node => node.children[ChildrenSource]);
}

export const _303_AsPromise = <Example />
export const _303_URL = import.meta.url;
