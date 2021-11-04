import { isSourceReference, SourceReference } from "./source-reference";
import { isVNode, VNode, VNodeRepresentationSource } from "./vnode";
import { assert } from "./assert";
import { createFragment } from "./fragment";

export const Token = Symbol.for("@virtualstate/fringe/token");

export const IsTokenOptions = Symbol.for("@virtualstate/fringe/token/isTokenOptions");
export const Scalar = Symbol.for("@virtualstate/fringe/token/Scalar");

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

export function createToken<T extends SourceReference, O extends object>(source: T): TokenVNodeFn<T, O>
export function createToken<T extends SourceReference, O extends object, Initial extends Partial<O>>(source: T, options?: Initial, ...children: VNodeRepresentationSource[]): TokenVNodeFn<T, O, Initial>
export function createToken<T extends SourceReference, O extends object, Initial extends Partial<O>>(source: T, options?: Initial, ...children: VNodeRepresentationSource[]): TokenVNodeFn<T, O, Initial> {
  type Token = TokenVNodeFn<T, O | Initial>;
  let tokenized: TokenVNodeFn<T, O, Initial>;
  const isOptionsOptions = isOptionsIsOptions(options) ? options : undefined;

  const isOptionsFrozenStatic = !!options && Object.isFrozen(options);
  const optionsKeyLength = options ? isOptionsFrozenStatic ? Object.keys(options).length : 0 : 0;

  function TokenConstructor<I extends Partial<TokenOptionsRecord>>(this: unknown, partialOptions?: I, child?: VNode): TokenVNodeFn<T, O, O> {
    const node = isTokenVNode<T, O>(this) ? this : tokenized;
    const previousNode: Pick<Token, keyof Token> = node;
    let nextOptions: TokenOptionsRecord = node.options;
    let nextChildren = node.scalar ? undefined : node.children;
    if (partialOptions && hasOwnPropertyAvailable(partialOptions) && !(isOptionsFrozenStatic && !child)) {
      nextOptions = {
        ...previousNode.options,
        ...partialOptions
      };
    }
    if (child) {
      nextChildren = createFragment(undefined, child).children;
    }
    // Terminates the node, will no longer be a function if it still was one
    function TokenInstance(this: unknown, innerPartialOptions?: I, innerChild?: VNode) {
      return TokenConstructor.call(
        this,
        innerPartialOptions ?
         (partialOptions ? { ...partialOptions, ...innerPartialOptions } : innerPartialOptions) :
          partialOptions,
        innerChild ?? child
      );
    }
    const almost: object = TokenInstance;
    defineProperties(almost, nextOptions, nextChildren, isTokenSource, isTokenOptions);
    if (isFrozenOptionsToken(almost) && !child) {
      return Object.freeze(almost);
    }
    return almost;
  }
  const almost: object = TokenConstructor;
  defineProperties<T, O, Initial>(
    almost,
    options,
    children ? createFragment({}, ...children).children : undefined,
    isTokenSource,
    isInitialOptions
  );
  tokenized = almost;
  return almost;

  function isFrozenOptionsToken(instance: TokenVNodeFn<T, O | Initial>): instance is TokenVNodeFn<T, O, O> {
    return isOptionsFrozenStatic && isTokenVNode(instance, isTokenSource);
  }

  function defineProperties<T extends SourceReference = SourceReference, O extends object = TokenOptionsRecord, Initial extends Partial<O> = Partial<O>>(token: object, options?: object, children?: AsyncIterable<VNode[]>, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O | Initial): asserts token is TokenVNodeFn<T, O, Initial> {
    const accessOnly: PropertyDescriptor = {
      enumerable: false,
      writable: false,
      configurable: true
    }
    Object.defineProperties(token, {
      reference: {
        ...accessOnly,
        value: Token,
        enumerable: !isOptionsFrozenStatic
      },
      source: {
        ...accessOnly,
        value: source,
        enumerable: true,
      },
      options: {
        ...accessOnly,
        value: options,
        enumerable: isOptionsFrozenStatic ? optionsKeyLength !== 0 : !!options
      },
      isTokenSource: {
        ...accessOnly,
        value: isTokenSource
      },
      isTokenOptions: {
        ...accessOnly,
        value: isTokenOptions
      },
      assert: {
        ...accessOnly,
        value: assert
      },
      assertFn: {
        ...accessOnly,
        value: assertFn
      },
      is: {
        ...accessOnly,
        value: is
      },
      isFn: {
        ...accessOnly,
        value: isFn
      },
      children: {
        ...accessOnly,
        value: isOptionsScalar(options) ? undefined : children,
        enumerable: !isOptionsScalar(options) && !!children
      },
      ...(isOptionsScalar(options) || !children ? {
        scalar:  {
          writable: true,
          enumerable: true,
          configurable: true,
          value: true
        }
      } : {})
    });
    assertTokenVNodeFn<T, O, Initial>(token, isTokenSource, isTokenOptions);
  }

  function isInitialOptions(value: unknown): value is Initial {
    return Object.is(value, options);
  }

  function is(value: unknown): value is TokenVNode<T, O> {
    return isTokenVNode(value, isTokenSource, isTokenOptions);
  }

  function isFn(value: unknown): value is TokenVNode<T, O> {
    return isTokenVNodeFn(value, isTokenSource, isTokenOptions);
  }

  function assert(value: unknown): asserts value is TokenVNode<T, O> {
    return assertTokenVNode(value, isTokenSource, isTokenOptions);
  }

  function assertFn(value: unknown): asserts value is TokenVNode<T, O> {
    return assertTokenVNodeFn(value, isTokenSource, isTokenOptions);
  }

  function isTokenSource(value: unknown): value is T {
    return Object.is(value, source);
  }

  function isTokenOptions(value: unknown): value is O {
    return isOptionsOptions?.[IsTokenOptions]?.(value) ?? true;
  }

  function isOptionsIsOptions(value: unknown): value is { [IsTokenOptions](value: unknown): value is O } {
    function isOptionsIsOptionsLike(value: unknown): value is { [IsTokenOptions]: unknown } {
      return !!value;
    }
    return options === value && isOptionsIsOptionsLike(value) && typeof value[IsTokenOptions] === "function";
  }

  function isOptionsScalar(value: unknown): value is { [Scalar]: true } {
    function isOptionsScalarLike(value: unknown): value is { [Scalar]: unknown } {
      return !!value;
    }
    return options === value && isOptionsScalarLike(value) && value[Scalar] === true;
  }
}

export function isTokenVNode<T extends SourceReference = SourceReference, O extends object = TokenOptionsRecord>(value: unknown, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O): value is TokenVNode<T, O> {
  return isVNode(value) && (typeof isTokenSource === "function" ? isTokenSource : isSourceReference)(value.source) && value.reference === Token && (typeof isTokenOptions === "function" ? isTokenOptions(value.options) : true);
}

export function isTokenVNodeFn<T extends SourceReference = SourceReference, O extends object = TokenOptionsRecord>(value: unknown, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O): value is TokenVNodeFn<T, O> {
  return typeof value === "function" && isTokenVNode(value, isTokenSource, isTokenOptions);
}

export function assertTokenVNode<T extends SourceReference = SourceReference, O extends object = TokenOptionsRecord>(value: unknown, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O): asserts value is TokenVNode<T, O> {
  return assert(value, {
    is(value): value is TokenVNode<T, O> {
      return isTokenVNode(value, isTokenSource, isTokenOptions);
    },
    message: "Expected TokenVNode"
  });
}

export function assertTokenVNodeFn<T extends SourceReference = SourceReference, O extends object = TokenOptionsRecord, Initial extends Partial<O> = Partial<O>>(value: unknown, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O | Initial): asserts value is TokenVNodeFn<T, O, Initial> {
  return assert(value, {
    is(value): value is TokenVNodeFn<T, O> {
      return isTokenVNodeFn(value, isTokenSource, isTokenOptions);
    },
    message: "Expected TokenVNode function"
  });
}

function hasOwnPropertyAvailable(object: object) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      return true;
    }
  }
  return false;
}
