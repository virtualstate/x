import {
  createNode,
  Resolve,
  ResolveSymbol,
  ResolveTokenFn,
  h,
  ChildrenSource,
  createFragment, createToken
} from "@virtualstate/fringe";

const Token = createToken("Token", {
  root: false
});

const Referenced = <Token value={3} />

const Node = (
  <Token root={true}>
    <Token />
    <Token value={1} />
    <Token value={2} />
    <Referenced type="number" />
  </Token>
)

export const _705_TokenExtendable = Node;
export const _705_URL = import.meta.url;

export const _706_TokenExtendableAgain = <Node new={true} />;
export const _706_URL = import.meta.url;

export const _707_TokenExtendableChildren = (
  <Node new={false}>
    <Token value={true} type="boolean" />
  </Node>
) ;
export const _707_URL = import.meta.url;
