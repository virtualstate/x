import {
  createNode,
  Resolve,
  ResolveSymbol,
  ResolveTokenFn,
  h,
  ChildrenSource,
  createFragment,
  createToken
} from "@virtualstate/fringe";

async function fakeImport() {
  return {
    Token: createToken("override!")
  };
}

async function define(importPromise = fakeImport()) {
  const h = createToken;
  const imported = await importPromise;
  return {
    Token: <token-name />,
    Button: (
      <button>
        <span>Hello!</span>
        <span>By default children are included</span>
      </button>
    ),
    ...imported,
    ...(await import("./token-extendable-example-tokens.js"))
  }
}

const { Token, Button, Example } = await define();

export const _709_TokenDefine = (
  <Token new={false}>
    <Token value={true} type="boolean" />
    <Button onClick={() => {}} />
    <Example />
  </Token>
) ;
export const _709_URL = import.meta.url;
