import {createToken} from "./token";
import {EnableThen} from "./then";

export const ResolveSymbol = Symbol("Resolve");
export const Resolve = createToken(ResolveSymbol, {
  [EnableThen]: true
});
