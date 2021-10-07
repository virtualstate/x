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

  const z: ResolveTokenFn = createNode(Resolve, { wow: 1 });
  const i: ResolveTokenFn = <Resolve base={Symbol("Cool")} />
  const s: typeof ResolveSymbol = z.source;

  const k: ResolveTokenFn = createNode(z,{}, <p>Hello!</p>);
  const j = createNode(i,{ hey: 6 }, <p>Hello!</p>);

  const LabelAsComponentFirst = j;
  const l: ResolveTokenFn = <LabelAsComponentFirst hi="!!!" />

  yield <hi>
    {z}
    {i}
    {s}
    {k}
    {j}
    {l}
    {k({ property: 1 })}
    {j({ property: 2 })}
    {Resolve({ property: 3 })}
  </hi>;
}

const node = (
  <Resolve>
    <Inner />
  </Resolve>
);

export const _704_TokenFunction = node
export const _704_URL = import.meta.url;
