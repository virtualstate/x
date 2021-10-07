import {
  createNode,
  Resolve,
  ResolveSymbol,
  ResolveTokenFn,
  h,
  ChildrenSource,
  createFragment
} from "@virtualstate/fringe";


async function *Inner() {

  const z: ResolveTokenFn = createNode(Resolve);
  const s: typeof ResolveSymbol = z.source;

  const k: ResolveTokenFn = createNode(z,{}, <p>Hello!</p>);

  yield <hi>
    {z}
    {s}
    {k}
    {k({ property: 1 })}
    {Resolve({ property: 2 })}
  </hi>;
}

const node = (
  <Resolve>
    <Inner />
  </Resolve>
)

async function Example() {
  return node;
}

export const _704_TokenFunction = <Example />
export const _704_URL = import.meta.url;
