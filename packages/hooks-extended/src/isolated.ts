import { createToken, TokenVNodeBase } from "@virtualstate/fringe";

export const IsolatedSymbol = Symbol("Isolated");
export interface IsolatedOptions {

}
export type IsolatedToken = TokenVNodeBase<typeof IsolatedSymbol, IsolatedOptions>;
export const Isolated: IsolatedToken = createToken(IsolatedSymbol);
