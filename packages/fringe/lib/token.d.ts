import { SourceReference } from "./source-reference";
import { VNode, VNodeRepresentationSource } from "./vnode";
export declare const Token: unique symbol;
export declare const IsTokenOptions: unique symbol;
export declare type TokenOptionsRecord = Record<string | symbol | number, unknown>;
export interface TokenOptions extends TokenOptionsRecord {
    [IsTokenOptions]?(value: unknown): boolean;
}
export interface IsTokenSourceVNodeFn<T extends SourceReference = SourceReference> {
    (value: unknown): value is T;
}
export interface IsTokenOptionsVNodeFn<O extends object = object> {
    (value: unknown): value is O;
}
export interface IsTokenVNodeFn<T extends SourceReference = SourceReference, O extends object = object> {
    (value: unknown): value is TokenVNode<T, O>;
}
export interface IsTokenVNodeFnFn<T extends SourceReference = SourceReference, O extends object = object> {
    (value: unknown): value is TokenVNodeFn<T, O>;
}
export interface AssertTokenVNodeFn<T extends SourceReference = SourceReference, O extends object = object> {
    (value: unknown): asserts value is TokenVNode<T, O>;
}
export interface AssertTokenVNodeFnFn<T extends SourceReference = SourceReference, O extends object = object> {
    (value: unknown): value is TokenVNodeFn<T, O>;
}
export interface TokenVNodeBase<T extends SourceReference = SourceReference, O extends object = object> extends VNode {
    options: Partial<O & TokenOptions>;
    source: T;
    reference: typeof Token;
    isTokenSource: IsTokenSourceVNodeFn<T>;
    isTokenOptions: IsTokenOptionsVNodeFn<O>;
    is: IsTokenVNodeFn<T, O>;
    isFn: IsTokenVNodeFnFn<T, O>;
    assert: AssertTokenVNodeFn<T, O>;
    assertFn: AssertTokenVNodeFnFn<T, O>;
}
export interface TokenVNode<T extends SourceReference = SourceReference, O extends object = object> extends TokenVNodeBase<T, O> {
    options: O & TokenOptions;
}
export interface TokenVNodeFn<T extends SourceReference = SourceReference, O extends object = object> extends TokenVNodeBase<T, O> {
    <I extends O & Partial<TokenOptionsRecord>>(options?: I, child?: VNode): TokenVNode<T, I>;
}
export declare type TokenInitialOptions<O extends object, P extends Partial<O & TokenOptions>> = O extends never ? TokenOptions : P extends O ? Pick<O, Exclude<keyof O, keyof P>> & Partial<Pick<O, keyof P & keyof O>> : O;
export declare function createToken<T extends SourceReference, O extends object = object, P extends Partial<O & TokenOptions> = Partial<O & TokenOptions>>(source: T, options?: P, ...children: VNodeRepresentationSource[]): TokenVNodeFn<T, TokenInitialOptions<O, P>>;
export declare function isTokenVNode<T extends SourceReference = SourceReference, O extends object = object>(value: unknown, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O): value is TokenVNode<T, O>;
export declare function isTokenVNodeFn<T extends SourceReference = SourceReference, O extends object = object>(value: unknown, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O): value is TokenVNodeFn<T, O>;
export declare function assertTokenVNode<T extends SourceReference = SourceReference, O extends object = object>(value: unknown, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O): asserts value is TokenVNode<T, O>;
export declare function assertTokenVNodeFn<T extends SourceReference = SourceReference, O extends object = object>(value: unknown, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O): asserts value is TokenVNodeFn<T, O>;
//# sourceMappingURL=token.d.ts.map