import {BasicVNodeRepresentation, isFragmentVNode, isVNode, VNode, VNodeRepresentationSource} from "./vnode";
import { isSourceReference } from "./source-reference";
import {
  asyncExtendedIterable,
  extendedIterable,
  isIterable,
  isIterableIterator,
  isPromise,
  TC39AsyncIteratorHelpers
} from "iterable";
import { UnionInput, union, UnionOptions } from "@virtualstate/union";
import type { CreateNodeFn } from "./create-node";
import { ChildrenSource, ChildrenSourceFunction } from "./source";


export interface VNodeChildren<N extends VNode = VNode> extends AsyncIterable<N[]> {
  /**
   * @experimental
   */
  [Symbol.iterator]?(): Iterator<N>;

  /**
   * @experimental
   */
  [Symbol.asyncIterator](): AsyncIterator<N[]> & Partial<TC39AsyncIteratorHelpers<N[]>>;

  /**
   * @experimental
   */
  [ChildrenSource]?: Iterable<VNodeRepresentationSource>;

  /**
   * @experimental
   */
  [ChildrenSourceFunction]?(): AsyncIterable<VNode[]>;

  /**
   * @experimental
   */
  [ChildrenOptions]?: ChildrenTransformOptions;

  /**
   * @experimental
   */
  then?: PromiseLike<VNode[]>["then"]
}


export interface ProxyNodeFn {
  <T extends VNode>(input: T): T | undefined;
  (input: VNode): VNode | undefined;
}

/**
 * @experimental
 */
export interface ChildrenTransformOptions extends UnionOptions {
  createNode: CreateNodeFn;
  /**
   * Allows replacement of children node instances
   *
   * Warning, usage can break expected types, source, options, and children structures
   * in typed contexts expect to be the same when returned.
   */
  proxyNode?: ProxyNodeFn;
}

/**
 * @experimental
 */
export const ChildrenOptions = Symbol.for("@virtualstate/fringe/ChildrenOptions");

export async function* childrenUnion<N extends VNode>(context: UnionOptions, childrenGroups: UnionInput<N[]>): AsyncIterable<N[]> {
  let yielded = false;
  for await (const parts of union(childrenGroups, context)) {
    yield parts.reduce(
      (updates: N[], part: N[]): N[] => part ? updates.concat(part.filter(Boolean)) : updates,
      []
    );
    yielded = true;
  }
  if (!yielded) {
    yield [];
  }
}

export async function *children(givenContext: ChildrenTransformOptions, ...source: VNodeRepresentationSource[]): AsyncIterable<VNode[]> {

  async function *eachSource(original: VNodeRepresentationSource): AsyncIterable<VNode[]> {
    let source: VNodeRepresentationSource = original;

    if (typeof source === "undefined") {
      return yield [];
    }

    const context = isChildrenOptions(source) ? source[ChildrenOptions] : givenContext;

    if (isVNode(source) && context.proxyNode) {
      source = context.proxyNode(source) ?? source;
    }

    if (isFragmentVNode(source)) {
      /**
       * If a fragment has no children, it will never yield a result
       */
      if (!source.children) {
        return yield [];
      }
      if (isIterable(source.children)) {
        return yield [...source.children];
      }
      /**
       * If we have internal documented source for the children, and it
       * is an iterable, we can use this sync source and pre-flatten it
       */
      if (isIterableChildrenSource(source.children)) {
        return yield * eachSource(source.children[ChildrenSource]);
      }
      let iterable: AsyncIterable<VNode[]> = source.children;
      if (isChildrenSourceFunction(source.children)) {
        iterable = source.children[ChildrenSourceFunction].call({
          [ChildrenOptions]: context
        });
      }
      let yielded = false;
      for await (const children of iterable) {
        yield * childrenUnion(
          context,
          children.map(eachSource)
        );
        yielded = true;
      }
      if (!yielded) {
        yield [];
      }
      return;
    }

    if (isVNode(source)) {
      return yield [
        source
      ];
    }

    // These need further processing through createVNodeWithContext
    if (isSourceReference(source) || isIterableIterator(source)) {
      return yield* eachSource(context.createNode(source));
    }

    if (isPromise(source)) {
      return yield* eachSource(await source);
    }

    if (isIterable(source)) {
      const initial = [...source];
      if (!initial.length) {
        return yield [];
      }
      const allChildren = [...flattenChildrenSource(context, initial)];
      if (!allChildren.length) {
        return yield [];
      }
      if (allChildren.every(isSyncChild)) {
        return yield [...allChildren];
      } else {
        return yield * childrenUnion(
          context,
          initial.map(eachSource)
        );
      }

    }

    return yield* childrenUnion(
      context,
      asyncExtendedIterable(source).map(eachSource)
    );
  }

  function isSyncChild(node: VNode): boolean {
    return (
      node.scalar ||
      (isFragmentVNode(node) ? isIterable(node.children) : true)
    )
  }

  if (source.length === 0) {
    return yield []; // Yield a single empty array to indicate these children are definitely empty
  } else if (source.length === 1) {
    return yield* eachSource(source[0]);
  } else {
    return yield* childrenUnion(givenContext, source.map(eachSource));
  }
}

/**
 * @internal
 * @experimental
 */
export function *flattenChildrenSourceRepresentation(source: Iterable<VNodeRepresentationSource>): Iterable<VNodeRepresentationSource> {
  if (typeof source === "string") {
    return yield source; // A string is iterable!
  }
  for (const item of source) {
    if (isSourceReference(item)) {
      yield item;
    } else if (isVNode(item)) {
      yield item;
    } else if (isIterable(item)) {
      yield *flattenChildrenSourceRepresentation(item)
    } else {
      // Async
      yield item;
    }
  }
}

/**
 * @experimental
 */
export function *flattenChildrenSource(context: ChildrenTransformOptions, source: Iterable<VNodeRepresentationSource>): Iterable<VNode> {
  for (const item of flattenChildrenSourceRepresentation(source)) {
    if (typeof item !== "string" && isIterable(item)) {
      yield * flattenChildrenSource(context, item);
    } else
      /**
       * If we have a fragment, and we have the source input for the children, then we can continue
       * flattening to bypass async resolution
       */
    if (isFragmentVNode(item) && isIterableChildren(item.children)) {
      yield * flattenChildrenSource(context, item.children);
    } else if (isFragmentVNode(item) && item.children && isIterableChildrenSource(item.children)) {
      yield * flattenChildrenSource(context, item.children[ChildrenSource]);
    } else if (isVNode(item)) {
      yield item;
    } else {
      yield context.createNode(item);
    }
  }
}

function isIterableChildrenSource(children: VNodeChildren): children is VNodeChildren & { [ChildrenSource]: Iterable<BasicVNodeRepresentation> } {
  return isIterable(children[ChildrenSource]);
}

function isIterableChildren(children: VNodeChildren): children is VNodeChildren & Iterable<BasicVNodeRepresentation> {
  return isIterable(children);
}


/**
 * @experimental
 */
export function isChildrenOptions(node: unknown): node is { [ChildrenOptions]: ChildrenTransformOptions } {
  function isChildrenOptionsLike(node: unknown): node is { [ChildrenOptions]?: { createNode: unknown }  } {
    return !!node;
  }
  return isChildrenOptionsLike(node) && typeof node[ChildrenOptions]?.createNode === "function";
}

function isChildrenSourceFunction(node: unknown): node is { [ChildrenSourceFunction](): AsyncIterable<VNode>[] } {
  function isChildrenSourceFunctionLike(node: unknown): node is { [ChildrenSourceFunction]: unknown } {
    return !!node;
  }
  return (
    isChildrenSourceFunctionLike(node) &&
    typeof node[ChildrenSourceFunction] === "function"
  );
}
