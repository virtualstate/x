import { SourceReference } from "./source-reference";
import { VNode, VNodeRepresentationSource } from "./vnode";

export const Token = Symbol.for("@virtualstate/fringe/token");

export const IsTokenOptions = Symbol.for("@virtualstate/fringe/token/isTokenOptions");

export type TokenOptionsRecord = Record<string | symbol | number, unknown>;

export interface TokenOptions {
  [IsTokenOptions]?(value: unknown): boolean;
}

export interface IsTokenSourceVNodeFn<T extends SourceReference = SourceReference> {
  (value: unknown): value is T;
}

export interface IsTokenOptionsVNodeFn<O extends object = TokenOptionsRecord> {
  (value: unknown): value is O;
}

export interface IsTokenVNodeFn<T extends SourceReference = SourceReference, O extends object = TokenOptionsRecord> {
  (value: unknown): value is TokenVNode<T, O>;
}

export interface IsTokenVNodeFnFn<T extends SourceReference = SourceReference, O extends object = TokenOptionsRecord, Initial extends Partial<O> = Partial<O>> {
  (value: unknown): value is TokenVNodeFn<T, O, Initial>;
}

export interface AssertTokenVNodeFn<T extends SourceReference = SourceReference, O extends object = TokenOptionsRecord> {
  (value: unknown): asserts value is TokenVNode<T, O>;
}

export interface AssertTokenVNodeFnFn<T extends SourceReference = SourceReference, O extends object = TokenOptionsRecord, Initial extends Partial<O> = Partial<O>> {
  (value: unknown): value is TokenVNodeFn<T, O, Initial>;
}

export interface TokenVNodeBase<T extends SourceReference = SourceReference, O extends object = TokenOptionsRecord, Initial extends Partial<O> = Partial<O>> extends VNode {
  options: Initial & Partial<O & TokenOptions & TokenOptionsRecord>;
  source: T;
  reference: typeof Token;
  isTokenSource: IsTokenSourceVNodeFn<T>;
  isTokenOptions: IsTokenOptionsVNodeFn<O>;
  is: IsTokenVNodeFn<T, O>;
  isFn: IsTokenVNodeFnFn<T, O, Initial>;
  assert: AssertTokenVNodeFn<T, O>;
  assertFn: AssertTokenVNodeFnFn<T, O, Initial>;
}

export interface TokenVNode<T extends SourceReference = SourceReference, O extends object = TokenOptionsRecord> extends TokenVNodeBase<T, O> {
  options: O & TokenOptions & TokenOptionsRecord;
}

export type TokenRequiredOptions<O extends object, InitialOptions extends Partial<O>> = Partial<O> & Omit<O, keyof InitialOptions>;
export type TokenResolvedOptions<O extends object, InitialOptions extends Partial<O>, PassedOptions extends TokenRequiredOptions<O, InitialOptions>> =
  Omit<InitialOptions, keyof PassedOptions> & PassedOptions;

export interface TokenVNodeFn<T extends SourceReference = SourceReference, O extends object = TokenOptionsRecord, InitialOptions extends Partial<O> = Partial<O>> extends TokenVNodeBase<T, O, InitialOptions> {
  (): TokenVNodeFn<T, O & Partial<TokenOptions>, O & Partial<TokenOptions>>;
  <PassedOptions extends TokenRequiredOptions<O, InitialOptions> & TokenOptions>(options: PassedOptions , child?: VNode): TokenVNodeFn<T, TokenResolvedOptions<O, InitialOptions, PassedOptions>, TokenResolvedOptions<O, InitialOptions, PassedOptions>>;
}

export interface CreateTokenFn {
  <T extends SourceReference, O extends object>(source: T): TokenVNodeFn<T, O>
  <T extends SourceReference, O extends object, Initial extends Partial<O>>(source: T, options?: Initial, ...children: VNodeRepresentationSource[]): TokenVNodeFn<T, O, Initial>
}
