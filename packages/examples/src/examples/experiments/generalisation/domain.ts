/**
 * @internal
 */
export const Call = Symbol("Call");
/**
 * @internal
 */
export const DefaultValue = Symbol("DefaultValue");
/**
 * @internal
 */
export const Identity = Symbol("Identity");

export interface Options<T = unknown> {
  [Identity]?(): object
  [Call]<TT extends T>(value: T): TT;
  [DefaultValue]: T;
}

export function isOptions<T = unknown>(value: unknown): value is Options<T> {
  function isOptionsLike(value: unknown): value is { [Call]: unknown } {
    return !!value;
  }
  return isOptionsLike(value) && typeof value[Call] === "function";
}
