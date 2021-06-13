import { isSourceReference, SourceReference } from "./source-reference";
import { isVNode, VNode, VNodeRepresentationSource } from "./vnode";
import { assert } from "./assert";
import { createFragment, Fragment } from "./fragment";

export const Token = Symbol.for("@virtualstate/fringe/token");

export const IsTokenOptions = Symbol.for("@virtualstate/fringe/token/isTokenOptions");

export type TokenOptionsRecord = Record<string | symbol | number, unknown>;

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

export type TokenInitialOptions<O extends object, P extends Partial<O & TokenOptions>> =
  O extends never ?
    TokenOptions :
    P extends O ?
      Pick<O, Exclude<keyof O, keyof P>> & Partial<Pick<O, keyof P & keyof O>> :
      O;

export function createToken<T extends SourceReference, O extends object = object, P extends Partial<O & TokenOptions> = Partial<O & TokenOptions>>(source: T, options?: P, ...children: VNodeRepresentationSource[]): TokenVNodeFn<T, TokenInitialOptions<O, P>> {
  type Token = TokenVNodeBase<T, TokenInitialOptions<O, P>>;
  let tokenized: TokenVNodeFn<T, TokenInitialOptions<O, P>>;
  const isOptionsOptions = isOptionsIsOptions(options) ? options : undefined;

  let frozen: Token | undefined = undefined;
  const isOptionsFrozen = !!options && Object.isFrozen(options);
  const optionsKeyLength = isOptionsFrozen ? Object.keys(options).length : 0;

  function token<I extends O & Partial<TokenOptionsRecord>>(this: unknown, partialOptions?: I, child?: VNode): Token {
    const node: Token = isTokenVNode<T, TokenInitialOptions<O, P>>(this) ? this : tokenized;
    const previousNode: Pick<Token, keyof Token> = node;
    let nextOptions = node.options;
    let nextChildren = node.children;
    if (partialOptions && hasOwnPropertyAvailable(partialOptions) && !(isOptionsFrozen && !child)) {
      nextOptions = {
        ...previousNode.options,
        ...partialOptions
      };
    }
    if (child) {
      nextChildren = createFragment(undefined, child).children;
    }
    // Terminates the node, will no longer be a function if it still was one
    const instance = {
      ...previousNode
    };
    defineProperties(instance, nextOptions, nextChildren);
    if (isOptionsFrozen && !child) {
      frozen = Object.freeze(instance);
      return frozen;
    } else {
      assertTokenVNode<T, I & O>(instance, isTokenSource, isCompleteOptions);
    }
    return instance;

    function isCompleteOptions(value: unknown): value is I & O {
      if (isOptionsOptions?.[IsTokenOptions]) {
        return isOptionsOptions[IsTokenOptions](value);
      }
      return value === instance.options;
    }
  }
  defineProperties(token, options, children ? createFragment({}, ...children).children : undefined);
  const almost: unknown = token;
  // Even though we can provide partial options as per the type, if there are minimum requirements
  // then IsTokenOptions will verify this
  assertTokenVNodeFn<T, TokenInitialOptions<O, P>>(
    almost,
    isTokenSource,
    isPartialOptions
  );
  tokenized = almost;
  return tokenized;

  function defineProperties(token: object, options?: object, children?: AsyncIterable<VNode[]>) {
    const accessOnly: PropertyDescriptor = {
      enumerable: false,
      writable: false,
      configurable: true
    }
    Object.defineProperties(token, {
      reference: {
        ...accessOnly,
        value: Token,
        enumerable: !isOptionsFrozen
      },
      source: {
        ...accessOnly,
        value: source,
        enumerable: true,
      },
      options: {
        ...accessOnly,
        value: options,
        enumerable: !(isOptionsFrozen && optionsKeyLength === 0)
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
        value: children,
        enumerable: !!children
      }
    });
  }

  function isPartialOptions(value: unknown): value is TokenInitialOptions<O, P> {
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
}

export function isTokenVNode<T extends SourceReference = SourceReference, O extends object = object>(value: unknown, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O): value is TokenVNode<T, O> {
  return isVNode(value) && (typeof isTokenSource === "function" ? isTokenSource : isSourceReference)(value.source) && value.reference === Token && (typeof isTokenOptions === "function" ? isTokenOptions(value.options) : true);
}

export function isTokenVNodeFn<T extends SourceReference = SourceReference, O extends object = object>(value: unknown, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O): value is TokenVNodeFn<T, O> {
  return typeof value === "function" && isTokenVNode(value, isTokenSource, isTokenOptions);
}

export function assertTokenVNode<T extends SourceReference = SourceReference, O extends object = object>(value: unknown, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O): asserts value is TokenVNode<T, O> {
  return assert(value, {
    is(value): value is TokenVNode<T, O> {
      return isTokenVNode(value, isTokenSource, isTokenOptions);
    },
    message: "Expected TokenVNode"
  });
}

export function assertTokenVNodeFn<T extends SourceReference = SourceReference, O extends object = object>(value: unknown, isTokenSource?: (value: unknown) => value is T, isTokenOptions?: (value: unknown) => value is O): asserts value is TokenVNodeFn<T, O> {
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
