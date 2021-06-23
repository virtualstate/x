import { createToken, TokenVNodeBase, TokenVNodeFn } from "@virtualstate/fringe";

export const IsolatedSymbol = Symbol("Isolated");
export interface IsolatedOptions {

}
export type IsolatedToken = TokenVNodeBase<typeof IsolatedSymbol, IsolatedOptions>;
export type IsolatedTokenFn = TokenVNodeFn<typeof IsolatedSymbol, IsolatedOptions>;
export const Isolated: IsolatedTokenFn = createToken(IsolatedSymbol);
