export const FringeErrorSymbol = Symbol.for("@virtualstate/fringe/error");

export class FringeError extends Error {
  [FringeErrorSymbol]: true
}
