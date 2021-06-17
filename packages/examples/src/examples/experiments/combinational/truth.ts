import { createToken, Fragment, TokenVNodeBase, TokenVNodeFn, VNode } from "@virtualstate/fringe";

export function isTrue(value?: VNode): value is VNode {
  if (value.reference === Fragment) {
    throw new Error("Did not expect to see Fragment while checking for truth");
  }
  return (
    !!value &&
    (
      !False.is(value) &&
      value.source !== false &&
      value.source !== 0 &&
      value.source !== 0n
    )
  );
}

// Used as a defined true
export const TrueSymbol = Symbol("Truth");
export type TrueOptions = Record<string, never>;
export type TrueToken = TokenVNodeBase<typeof TrueSymbol, TrueOptions>;
export type TrueTokenFn = TokenVNodeFn<typeof TrueSymbol, TrueOptions>;
export const True: TrueTokenFn = createToken(TrueSymbol, Object.freeze({}));

// Used as a defined false, where non existences is ambiguous
export const FalseSymbol = Symbol("Not Truth");
export type FalseOptions = Record<string, never>;
export type FalseToken = TokenVNodeBase<typeof FalseSymbol, FalseOptions>;
export type FalseTokenFn = TokenVNodeFn<typeof FalseSymbol, FalseOptions>;
export const False: FalseTokenFn = createToken(FalseSymbol, Object.freeze({}));
