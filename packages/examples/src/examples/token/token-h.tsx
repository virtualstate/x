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

function define() {
  return {
    Token: <token-name />,
    Button: <button />
  }
}

const { Token, Button } = define();
export const _708_TokenDefine= (
  <Token new={false}>
    <Token value={true} type="boolean" />
    <Button onClick={() => {}} />
  </Token>
) ;
export const _708_URL = import.meta.url;
