import {createToken} from "./token";
import {EnableThen} from "./then";


/**
 * @experimental
 */
export const ResolveSymbol = Symbol("Resolve");

/**
 * @experimental
 */
export const Resolve = createToken(ResolveSymbol, {
  [EnableThen]: true
});
