import { VContext } from "./vcontext";
import {
  ChildrenSource,
  CreateNodeOp1Function,
  CreateNodeResult,
  Source,
  Instance,
  ChildrenSourceFunction,
} from "./source";
import {
  isSourceReference,
  SourceReference,
  MarshalledSourceReference
} from "./source-reference";
import {
  FragmentVNode,
  isFragmentVNode,
  isMarshalledVNode,
  isVNode,
  MarshalledVNode,
  SyncVNodeRepresentation,
  VNode,
  VNodeRepresentationSource
} from "./vnode";
import {
  isAsyncIterable,
  isIterable,
  isPromise,
  asyncExtendedIterable,
  isIterableIterator,
  getNext
} from "iterable";
import {
  children as childrenGenerator,
  ChildrenTransformOptions,
  ChildrenOptions,
  isChildrenOptions,
  VNodeChildren,
  flattenChildrenSource,
  flattenChildrenSourceRepresentation
} from "./children";
import { createFragment, Fragment } from "./fragment";
import {
  createToken,
  isTokenVNodeFn,
  Scalar,
  TokenRequiredOptions,
  TokenResolvedOptions,
  TokenVNodeFn
} from "./token";
import { isEnableThen, then } from "./then";

const nonConstructable = new WeakSet();

// Access to re-assign a functional vnode child between children reads
export const Child = Symbol.for("@virtualstate/fringe/function/child");

export interface CreateNodeFn {
  <
    TT extends SourceReference,
    O extends object,
    InitialOptions extends Partial<O>,
    T extends TokenVNodeFn<TT, O, InitialOptions>
    >(source: T): T & TokenVNodeFn<TT, O, InitialOptions>;
  <
    TT extends SourceReference,
    O extends object,
    InitialOptions extends Partial<O>,
    T extends TokenVNodeFn<TT, O, InitialOptions>,
    PassedOptions extends TokenRequiredOptions<O, InitialOptions>,
    >(source: T, options: PassedOptions, ...children: unknown[]): T & TokenVNodeFn<TT, O, TokenResolvedOptions<O, InitialOptions, PassedOptions>>;
  <
    T extends Source,
    O extends Record<string, unknown> | object,
    C extends unknown[]
    >(source: T, options: O, ...children: C): CreateNodeResult<T, O, C>;
  <
    T extends Source,
    O extends Record<string, unknown> | object
    >(source: T, options: O): CreateNodeResult<T, O>;
  <T extends Source>(source: T): CreateNodeResult<T>;
  (source: Source, options?: Record<string, unknown> | object, ...children: unknown[]): VNode;
  (source?: unknown, options?: Record<string, unknown> | object, ...children: unknown[]): VNode;
}


/**
 * Generates instances of {@link FragmentVNode} based on the provided source
 *
 * See {@link Source} for an explanation on each type and how they are represented as a {@link VNode}
 *
 * The provided {@link VContext} may override this functionality, possibly resulting in a {@link NativeVNode}
 *
 * The special case to point out here is if the source is an `IterableIterator` (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Is_a_generator_object_an_iterator_or_an_iterable})
 * then each iteration will result in a new {@link VNode} being created
 */
export function createNode<
  TT extends SourceReference,
  O extends object,
  InitialOptions extends Partial<O>,
  T extends TokenVNodeFn<TT, O, InitialOptions>
>(source: T): T & TokenVNodeFn<TT, O, InitialOptions>;
export function createNode<
  TT extends SourceReference,
  O extends object,
  InitialOptions extends Partial<O>,
  T extends TokenVNodeFn<TT, O, InitialOptions>,
  PassedOptions extends TokenRequiredOptions<O, InitialOptions>,
>(source: T, options: PassedOptions, ...children: unknown[]): T & TokenVNodeFn<TT, O, TokenResolvedOptions<O, InitialOptions, PassedOptions>>;
export function createNode<
  T extends Source,
  O extends Record<string, unknown> | object,
  C extends unknown[]
  >(source: T, options: O, ...children: C): CreateNodeResult<T, O, C>;
export function createNode<
  T extends Source,
  O extends Record<string, unknown> | object
  >(source: T, options: O): CreateNodeResult<T, O>;
export function createNode<T extends Source>(source: T): CreateNodeResult<T>;
export function createNode(source: Source, options?: Record<string, unknown> | object, ...children: unknown[]): VNode;
export function createNode(source?: unknown, options?: Record<string, unknown> | object, ...children: unknown[]): VNode;
export function createNode(source?: Source, options?: Record<string, unknown> | object, ...children: VNodeRepresentationSource[]): VNode {
  /**
   * Allows a compiler to use <></> for <createFragment></createFragment> and treat both paths the same
   */
  if (source === createFragment) {
    return createNode(Fragment, options, ...children);
  }

  /**
   * Shortcut a functional token, this will allow the node to be directly created here
   */
  if (isTokenVNodeFn(source)) {
    const node = source(options, children.length ? createFragment({}, ...children) : undefined);
    enableThen(node, source);
    return node;
  }

  /**
   * If the source is a function we're going to invoke it as soon as possible with the provided options
   *
   * The function _may_ return any other kind of source, so we need to start our process again
   */
  if (source instanceof Function) {
    return functionVNode(source);
  }

  /**
   * If we have a fragment then we want to pass it back through our function so the next
   * statement is invoked to handle fragments with children
   */
  if (source === Fragment) {
    return createNode({ reference: Fragment, source }, options, ...children);
  }
  /**
   * If we already have a {@link VNode} then we don't and can't do any more
   */
  if (source && isVNode(source)) {
    let nextSource: VNode = source;
    /**
     * Extend our vnode options if we have been provided them
     * Each property that is not passed will match the initial property
     */
    if (options && source.options !== options) {
      nextSource = {
        ...nextSource,
        options: {
          ...nextSource.options,
          ...options
        }
      };
    }
    /**
     * Replace children if they have been given and the source doesn't already have children
     */
    if (children.length && !nextSource.children) {
      nextSource = {
        ...nextSource,
        children: replay(function(this: unknown) {
          const childrenOptions = getChildrenOptions(nextSource, nextSource.options, isChildrenOptions(this) ? this[ChildrenOptions] : undefined);
          return childrenGenerator(childrenOptions, ...children);
        }, children)
      };
    }
    enableThen(nextSource, source);
    return nextSource;
  }

  /**
   * Only if the source is a promise we want to await it
   *
   * This may be wasteful, but the idea is that we wouldn't cause a next tick for no reason
   * Maybe this isn't the case if the value isn't a promise to start with ¯\_(ツ)_/¯
   */
  if (source && isPromise<SyncVNodeRepresentation>(source)) {
    const node = {
      source,
      reference: Fragment,
      children: replay(function(this: unknown) {
        const childrenOptions = getChildrenOptions(source, source, isChildrenOptions(this) ? this[ChildrenOptions] : undefined);
        return promiseGenerator(childrenOptions, source);
      }, [source])
    };
    enableThen(node, source);
    return node;
  }

  /**
   * If we already have a {@link MarshalledVNode} then we need to turn its children into an async iterable
   * and ensure they're unmarshalled
   */
  if (source && isMarshalledVNode(source)) {
    return unmarshal(source);
  }

  /**
   * A source reference may be in reference to a context we don't know about, this can be resolved from
   * external contexts by rolling through the {@link VNode} state, or watching context events
   *
   * This could be used by analytics tracking for tags that show up
   *
   * Either way, if we have a source reference, we have a primitive value that we can look up later on
   */
  if (isSourceReference(source)) {
    if (!children.length) {
      const node = createToken(source, options);
      // Use direct write on the new node to avoid modifying options
      node.scalar = true;
      enableThen(node, source);
      return node;
    } else {
      const node = createToken(source, options, ...children);
      enableThen(node, source);
      return node;
    }
  }

  /**
   * Here is our nice `IterableIterator` that allows us to produce multiple versions for the same source
   *
   * This specifically cannot be re-run twice, but this is expected to be returned from a function, where
   * functions can be run twice
   *
   * See {@link generator} for details
   */
  if (source && isIterableIterator(source)) {
    const node: VNode = {
      source,
      reference: Fragment,
      children: generator(Symbol("Iterable Iterator"), source)
    };
    if (options) {
      node.options = options;
    }
    enableThen(node, source);
    return node;
  }

  /**
   * This will cover `Array`, `Set`, `Map`, and anything else implementing `Iterable` or `AsyncIterable`
   *
   * We will create a `Fragment` that holds our node state to grab later
   */
  if (source && (isIterable(source) || isAsyncIterable(source))) {
    const node: VNode = {
      source,
      reference: Fragment,
      children: replay(function(this: unknown) {
        const childrenOptions = getChildrenOptions(source, source, isChildrenOptions(this) ? this[ChildrenOptions] : undefined);
        return childrenGenerator(childrenOptions, asyncExtendedIterable(source).map(value => {
          const node = childrenOptions.createNode(value, options, ...children);
          return childrenOptions.proxyNode?.(node) ?? node;
        }))
      }, children)
    };
    if (options) {
      node.options = options;
    }
    enableThen(node, source);
    return node;
  }

  /**
   * Allows for `undefined`, an empty `VNode`
   */
  if (!source) {
    return { reference: Fragment, source };
  }

  /**
   * We _shouldn't_ get here AFAIK, each kind of source should have been dealt with by the time we get here
   */
  throw new Error("Unexpected VNode source provided");

  /**
   * Iterates through an `IterableIterator` to generate new {@link VNode} instances
   *
   * This allows an implementor to decide when their node returns state, including pushing new values _as they arrive_
   *
   * {@link getNext} provides an error boundary if the `IterableIterator` provides a `throw` function
   *
   * @param newReference
   * @param reference
   */
  async function *generator(newReference: SourceReference, reference: IterableIterator<unknown> | AsyncIterableIterator<unknown>): AsyncIterable<VNode[]> {
    let next: IteratorResult<unknown>;
    do {
      next = await getNext(reference, newReference);
      if (next.done) {
        continue;
      }
      const value: unknown = next.value;
      const nextNode = createNode(value);
      if (isFragmentVNode(nextNode)) {
        yield* nextNode.children ?? [];
      }
      yield [nextNode];
    } while (!next.done);
  }

  async function *promiseGenerator(context: ChildrenTransformOptions, promise: Source & Promise<unknown>): AsyncIterable<VNode[]> {
    const result = await promise;
    const node = context.createNode(result, options, ...children);
    yield [context.proxyNode?.(node) ?? node];
  }

  function getChildrenOptions(source: unknown, options: unknown, defaultOptions?: ChildrenTransformOptions): ChildrenTransformOptions {
    return (
      getChildrenOptionsFromUnknown(source) ??
      getChildrenOptionsFromUnknown(options) ??
      defaultOptions ??
      {
        createNode
      }
    );
  }

  function getChildrenOptionsFromUnknown(source: unknown) {
    if (isChildrenOptions(source)) {
      return source[ChildrenOptions];
    }
    return undefined;
  }

  function enableThen(node: VNode, source: unknown) {
    inner(source);
    inner(node.options);

    function inner(source: unknown) {
      if (isEnableThen(source)) {
        Object.defineProperty(node, "then", {
          value: then,
          enumerable: false,
          configurable: true,
          writable: true
        })
      }
    }
  }

  function functionVNode(source: CreateNodeOp1Function): VNode {
    let forceConstruction = false;

    const defaultOptions = {};
    const resolvedOptions = isDefaultOptionsO(defaultOptions) ? defaultOptions : options;

    const node: VNode & {
      [Child]?: VNode,
      source: typeof source,
      options: typeof resolvedOptions,
      [ChildrenOptions]?: ChildrenTransformOptions,
      [Instance]: unknown
    } = {
      reference: Fragment,
      source,
      options: resolvedOptions,
      children: replay(childrenFn),
      [Instance]: undefined,
      [ChildrenOptions]: undefined,
    };
    enableThen(node, source);
    return node;

    function construct(source: unknown) {
      if (!isConstructableLike(source)) {
        return undefined;
      }
      if (nonConstructable.has(source)) {
        return undefined;
      }
      if (node[Instance]) {
        return node[Instance];
      }
      const options = node.options;
      const currentChild = child();
      try {
        return node[Instance] = node[Instance] || new source(options, currentChild);
      } catch {
        nonConstructable.add(source);
        return undefined;
      }

      function isConstructableLike(value: unknown): value is { new(options: typeof node.options, child?: VNode): unknown } {
        if (forceConstruction) {
          return true;
        }
        return (
          typeof value === "function" &&
          value.prototype &&
          typeof value.prototype[Symbol.asyncIterator] === "function"
        );
      }
    }

    async function *classAsChildren(): AsyncIterable<VNode[]> {
      const instance = node[Instance];
      if (!instance) {
        throw new Error("What happened to the instance!");
      }
      const context = (
        getChildrenOptionsFromUnknown(instance) ??
        getFunctionChildrenOptions()
      )
      if (isIterable(instance) || isAsyncIterable(instance)) {
        for await (const next of instance) {
          const node = context.createNode(next);
          yield * childrenGenerator(context, context.proxyNode?.(node) ?? node);
        }
      } else {
        const node = context.createNode(instance);
        yield [context.proxyNode?.(node) ?? node];
      }
    }

    function child(): VNode | undefined {
      // Lazy create the children when the function is first invoked
      // This allows children to be a bit more dynamic
      //
      // We will only provide a child to node.source if we have at least one child provided
      const context = getFunctionChildrenOptions();
      if (node[Child]) {
        return node[Child];
      }
      if (!children.length) {
        return undefined;
      }
      // Possible improvement
      // if (children.length === 1 && isVNode(children[0]) && isSourceReference(children[0].source)) {
      //   return children[0];
      // }
      const childrenNode = context.createNode(Fragment, {}, ...children);
      return context.proxyNode?.(childrenNode) ?? childrenNode;
    }

    async function *functionAsChildren(this: unknown): AsyncIterable<VNode[]> {
      const context = getFunctionChildrenOptions(
        (isChildrenOptions(this) ? this[ChildrenOptions] : undefined)
      );
      const proxied = context.proxyNode?.(node) ?? node;

      // Referencing node here allows for external to update the nodes implementation on the fly...
      const options = proxied.options;
      const source = proxied.source;

      const currentChild = child();

      // If the possibleMatchingSource is the same as node.source, then we should finish here, it will always return itself
      // If node.source returns a promise, vnode, or "container" of some kind then we can safely assume this
      // was intentional as a "loop" around
      //
      // A function can also return an iterator (async or sync) that returns itself too
      //
      // This is to only detect hard loops
      // We will also reference the different dependency here, as they might have been re-assigned,
      // meaning the possible return from this function has changed, meaning the return value could be different\
      let possibleMatchingSource: unknown;

      try {
        possibleMatchingSource = source(options, currentChild);
      } catch (error) {
        if (error instanceof TypeError && error.message.includes("cannot be invoked without 'new'")) {
          forceConstruction = true;
          node[Instance] = construct(source);
          if (node[Instance]) {
            return yield * classAsChildren();
          }
          forceConstruction = false;
        }
        await Promise.reject(error);
        throw error; // We don't expect to pass the above Promise.reject!
      }
      if (
        isVNodeRepresentationSource(possibleMatchingSource)
      ) {
        yield * childrenGenerator(context, possibleMatchingSource);
      }

      function isVNodeRepresentationSource(possibleMatchingSource: unknown): possibleMatchingSource is VNodeRepresentationSource {
        return (
          possibleMatchingSource !== source ||
          source !== node.source ||
          options !== node.options ||
          currentChild !== node[Child]
        )
      }
    }

    function getFunctionChildrenOptions(defaultOptions?: ChildrenTransformOptions): ChildrenTransformOptions {
      return (
        getChildrenOptionsFromUnknown(node) ??
        getChildrenOptionsFromUnknown(node.source) ??
        getChildrenOptionsFromUnknown(node.options) ??
        getChildrenOptions(source, options, defaultOptions)
      );
    }

    async function *childrenFn(this: unknown): AsyncIterable<VNode[]> {
      if (forceConstruction) {
        return yield * classAsChildren.call(this);
      }
      return yield * functionAsChildren.call(this);
    }

    function isDefaultOptionsO(value: unknown): value is Record<string, unknown> {
      return value === defaultOptions && !options;
    }
  }

  function unmarshal(source: MarshalledVNode): VNode {
    if (isSourceReference(source)) {
      return createToken(source, {
        [Scalar]: true
      });
    }
    const { children, ...rest } = source;
    if (isSourceReference(rest.source)) {
      const token = createToken(rest.source);
      Object.assign(token, rest);
      if (children && Array.isArray(children) && children.length) {
        token.children = replay(() => asyncExtendedIterable(children).map(children => [...children].map(unmarshal)))
      }
      return token;
    }
    const node: VNode = {
      ...rest,
      // Replace our reference if required
      reference: isSourceReference(source.reference) ? getMarshalledReference(source.reference) : getReference(source.options)
    };
    if (children) {
      node.children = replay(() => asyncExtendedIterable(children).map(children => [...children].map(unmarshal)))
    }
    return node;
  }

  function replay(fn: (options: ChildrenTransformOptions) => AsyncIterable<VNode[]>, source?: VNodeRepresentationSource[], getOptions: () => ChildrenTransformOptions = getChildrenOptions.bind(undefined, source, options)): VNodeChildren {
    // We will use this variable to store a static snapshot of our children, if they are available
    let flattened: VNode[];
    return {
      [Symbol.asyncIterator]() {
        return fn(getOptions?.())[Symbol.asyncIterator]();
      },
      [ChildrenSource]: source,
      [ChildrenSourceFunction]: fn,
      get [Symbol.iterator]() {
        if (!flattened) {
          if (!isIterable(source)) {
            flattened = [];
            return undefined;
          }

          const initial = [...flattenChildrenSourceRepresentation(source)]
          /**
           * TODO find a scenario where flattenChildrenSourceRepresentation actually helps
           *
           * Below is the previous code that ignored non flat iterables
           * The goal is either way, we want to know we have a set of values that have already passed through
           * createNode
           *
           *
           const previous = isSourceReference(source) ? [source] : [...source];
           const previousA = previous.every(node => isVNode(node) || isSourceReference(node));
           const initialA = initial.every(node => isVNode(node) || isSourceReference(node));
           if (previousA !== initialA) {
            console.log("HUHHH!!!!");
          } else {
            console.log("SAME!");
          }
           */
          // All nodes need to be already resolved, or source
          if (!initial.every(node => isVNode(node) || isSourceReference(node))) {
            flattened = [];
            return undefined;
          }
          const options = getOptions?.() ?? { createNode };
          flattened = [...flattenChildrenSource(options, initial)]
          if (!flattened.every(isSyncItem)) {
            flattened = [];
            return undefined;
          }
        }
        if (!flattened.length) {
          return undefined;
        }
        return flattened[Symbol.iterator].bind(flattened)
      }
    };

    function isSyncItem(item): item is VNode {
      return isVNode(item) && (
        item.scalar ||
        (isFragmentVNode(item) ? isIterable(item.children) : true)
      );
    }
   }

}

function getMarshalledReference(reference: MarshalledSourceReference): SourceReference {
  return getReference({
    reference
  });
}

function getReference(options?: object) {
  return getReferenceFromOptions(options) ?? Symbol("@virtualstate/fringe");
}

function isReferenceOptions(options: object): options is object & { reference: SourceReference } {
  function isReferenceOptionsLike(options: object): options is object & { reference?: unknown } {
    return options && options.hasOwnProperty("reference");
  }
  return (
    isReferenceOptionsLike(options) &&
    isSourceReference(options.reference)
  );
}

function getReferenceFromOptions(options: object | undefined): SourceReference {
  if (!isReferenceOptions(options)) {
    return undefined;
  }
  return options.reference;
}
