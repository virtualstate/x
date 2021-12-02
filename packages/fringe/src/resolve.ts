import {createToken, TokenVNodeFn} from "./token";
import {EnableThen} from "./then";
import {createNode} from "./create-node";


/**
 * @experimental
 */
export const ResolveSymbol = Symbol.for("@virtualstate/fringe/Resolve");

/**
 * @experimental
 */
export type ResolveTokenFn = TokenVNodeFn<typeof ResolveSymbol>;

/**
 * @experimental
 */
export const Resolve: ResolveTokenFn = createToken(ResolveSymbol, {
  [EnableThen]: true
});
