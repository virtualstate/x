import { VContext } from "./vcontext";
import {
  ChildrenSource,
  CreateNodeOp1Function,
  CreateNodeResult,
  Source, VNodeWithChildrenFromSource
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
import { children as childrenGenerator, ChildrenContext } from "./children";
import { Fragment } from "./fragment";

// Access to re-assign a functional vnode child between children reads
export const Child = Symbol("Function VNode Child");

const childrenContext: ChildrenContext = {
  createNode
};

export interface CreateNodeFn {
  <
    T extends Source,
    O extends Record<string, unknown>,
    C extends unknown[]
    >(source: T, options: O, ...children: C): CreateNodeResult<T, O, C>;
  <
    T extends Source,
    O extends Record<string, unknown>,
    >(source: T, options: O): CreateNodeResult<T, O>;
  <T extends Source>(source: T): CreateNodeResult<T>;
  (source: Source, options?: Record<string, unknown>, ...children: unknown[]): VNode;
  (source: unknown, options?: Record<string, unknown>, ...children: unknown[]): VNode;
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
  T extends Source,
  O extends Record<string, unknown>,
  C extends unknown[]
  >(source: T, options: O, ...children: C): CreateNodeResult<T, O, C>;
export function createNode<
  T extends Source,
  O extends Record<string, unknown>
  >(source: T, options: O): CreateNodeResult<T, O>;
export function createNode<T extends Source>(source: T): CreateNodeResult<T>;
export function createNode(source: Source, options?: Record<string, unknown>, ...children: unknown[]): VNode;
export function createNode(source: unknown, options?: Record<string, unknown>, ...children: unknown[]): VNode;
export function createNode(source: Source, options?: Record<string, unknown>, ...children: VNodeRepresentationSource[]): VNode {
  /**
   * If the source is a function we're going to invoke it as soon as possible with the provided options
   *
   * The function _may_ return any other kind of source, so we need to start our process again
   */
  if (source instanceof Function) {
    return functionVNode(source);
  }

  /**
   * Only if the source is a promise we want to await it
   *
   * This may be wasteful, but the idea is that we wouldn't cause a next tick for no reason
   * Maybe this isn't the case if the value isn't a promise to start with ¯\_(ツ)_/¯
   */
  if (source && isPromise(source)) {
    return {
      source,
      reference: Fragment,
      children: replay(() => promiseGenerator(source))
    };
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
        children: replay(() => childrenGenerator(childrenContext, ...children), children)
      };
    }
    return nextSource;
  }

  /**
   * If we already have a {@link MarshalledVNode} then we need to turn its children into an async iterable
   * and ensure they're unmarshalled
   */
  if (source && isMarshalledVNode(source)) {
    return unmarshal(source);
  }

  const reference = getReference(options);

  /**
   * A source reference may be in reference to a context we don't know about, this can be resolved from
   * external contexts by rolling through the {@link VNode} state, or watching context events
   *
   * This could be used by analytics tracking for tags that show up
   *
   * Either way, if we have a source reference, we have a primitive value that we can look up later on
   */
  if (isSourceReference(source)) {
    return sourceReferenceVNode(reference, source, options, ...children);
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
    return {
      source,
      reference: Fragment,
      options,
      children: generator(Symbol("Iterable Iterator"), source)
    };
  }

  /**
   * This will cover `Array`, `Set`, `Map`, and anything else implementing `Iterable` or `AsyncIterable`
   *
   * We will create a `Fragment` that holds our node state to grab later
   */
  if (source && (isIterable(source) || isAsyncIterable(source))) {
    const childrenInstance = childrenGenerator(childrenContext, ...children);
    return {
      source,
      reference: Fragment,
      options,
      children: replay(() => childrenGenerator(childrenContext, asyncExtendedIterable(source).map(value => createNode(value, options, childrenInstance))))
    };
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

  async function *promiseGenerator(promise: Source & Promise<unknown>): AsyncIterable<VNode[]> {
    const result = await promise;
    yield [
      createNode(result, options, ...children)
    ];
  }

  function functionVNode(source: CreateNodeOp1Function): VNode {
    const defaultOptions = {};
    const resolvedOptions = isDefaultOptionsO(defaultOptions) ? defaultOptions : options;

    const node: VNode & {
      [Child]?: VNode,
      source: typeof source,
      options: typeof resolvedOptions
    } = {
      reference: Fragment,
      source,
      options: resolvedOptions,
      children: replay(() => functionAsChildren()),
    };
    return node;

    async function *functionAsChildren(): AsyncIterable<VNode[]> {
      // Referencing node here allows for external to update the nodes implementation on the fly...
      const options = node.options;
      const source = node.source;

      // Lazy create the children when the function is first invoked
      // This allows children to be a bit more dynamic
      //
      // We will only provide a child to node.source if we have at least one child provided
      const child = node[Child] = node[Child] ?? children.length ? createNode(Fragment, {}, ...children) : undefined;

      // If the possibleMatchingSource is the same as node.source, then we should finish here, it will always return itself
      // If node.source returns a promise, vnode, or "container" of some kind then we can safely assume this
      // was intentional as a "loop" around
      //
      // A function can also return an iterator (async or sync) that returns itself too
      //
      // This is to only detect hard loops
      // We will also reference the different dependency here, as they might have been re-assigned,
      // meaning the possible return from this function has changed, meaning the return value could be different\
      const possibleMatchingSource: unknown = source(options, child);
      if (
        possibleMatchingSource !== source ||
        source !== node.source ||
        options !== node.options ||
        child !== node[Child]
      ) {
        yield * childrenGenerator(childrenContext, createNode(possibleMatchingSource));
      }
    }

    function isDefaultOptionsO(value: unknown): value is Record<string, unknown> {
      return value === defaultOptions && !options;
    }
  }

  function unmarshal(source: MarshalledVNode): VNode {
    if (isSourceReference(source)) {
      return sourceReferenceVNode(getReference(), source);
    }
    return {
      ...source,
      // Replace our reference if required
      reference: isSourceReference(source.reference) ? getMarshalledReference(source.reference) : getReference(source.options),
      children: source.children ? replay(() => asyncExtendedIterable(source.children).map(children => [...children].map(unmarshal))) : undefined
    };
  }

  function sourceReferenceVNode(reference: SourceReference, source: SourceReference, options?: object, ...children: VNodeRepresentationSource[]): VNode {
    return {
      reference: reference ?? getReference(options),
      scalar: !children.length,
      source,
      options,
      children: children.length ? replay(() => childrenGenerator(childrenContext, ...children), children) : undefined
    };
  }

  function replay<T>(fn: () => AsyncIterable<T>, source?: unknown): AsyncIterable<T> & { [ChildrenSource]?: unknown } {
    return {
      [Symbol.asyncIterator]: () => fn()[Symbol.asyncIterator](),
      [ChildrenSource]: source
    };
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
