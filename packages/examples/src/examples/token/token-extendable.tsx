import {
  createNode,
  Resolve,
  ResolveSymbol,
  ResolveTokenFn,
  h,
  ChildrenSource,
  createFragment, createToken
} from "@virtualstate/fringe";

const Token = createToken("k", {
  root: false
});

const Referenced = <Token value={3} />

const node = (
  <Token root={true}>
    <Token />
    <Token value={1} />
    <Token value={2} />
    <Referenced type="number" />
  </Token>
)

export const _705_TokenExtendable = node;
export const _705_URL = import.meta.url;
