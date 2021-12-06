import { isFragmentVNode, isVNode, VNode, VNodeRepresentationSource } from "./vnode";
import { isSourceReference } from "./source-reference";
import {
  asyncExtendedIterable,
  extendedIterable,
  isIterable,
  isIterableIterator,
  isPromise
} from "iterable";
import { UnionInput, union, UnionOptions } from "@virtualstate/union";
import type { CreateNodeFn } from "./create-node";
import { ChildrenSource, ChildrenSourceFunction } from "./source";


export interface VNodeChildren<N extends VNode = VNode> extends AsyncIterable<N[]> {
  /**
   * @experiment
   */
  [Symbol.iterator]?(): Iterator<N>;

  /**
   * @experiment
   */
  [ChildrenSource]?: VNodeRepresentationSource[];

  /**
   * @experiment
   */
  [ChildrenSourceFunction]?: unknown;

  /**
   * @experiment
   */
  [ChildrenOptions]?: unknown;
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
  for await (const parts of union(childrenGroups, context)) {
    yield parts.reduce(
      (updates: N[], part: N[]): N[] => part ? updates.concat(part.filter(Boolean)) : updates,
      []
    );
  }
}

function *flat(iterable: Iterable<VNodeRepresentationSource>): Iterable<VNodeRepresentationSource> {
  for (const item of iterable) {
    if (typeof item !== "string" && isIterable(item)) {
      yield * flat(item);
    } else {
      yield item;
    }
  }
}

export async function *children(givenContext: ChildrenTransformOptions, ...source: VNodeRepresentationSource[]): AsyncIterable<VNode[]> {

  function isIterableChildrenSource(value: unknown): value is VNodeRepresentationSource & Iterable<unknown> {
    return isIterable(value);
  }

  /**
   * This allows a sync iterable source to bypass async resolution until it hits a defined node
   */
  function *flatSource(context: ChildrenTransformOptions, iterable: Iterable<VNodeRepresentationSource>): Iterable<VNode> {
    for (const item of iterable) {
      if (typeof item !== "string" && isIterable(item)) {
        yield * flatSource(context, item);
      } else
      /**
       * If we have a fragment, and we have the source input for the children, then we can continue
       * flattening to bypass async resolution
       */
      if (isFragmentVNode(item) && isIterable(item.children)) {
        yield * flatSource(context, item.children);
      } else if (isFragmentVNode(item) && item.children && isIterableChildrenSource(item.children[ChildrenSource])) {
        yield * flatSource(context, item.children[ChildrenSource]);
      } else if (isVNode(item)) {
        yield item;
      } else {
        yield givenContext.createNode(item);
      }
    }
  }

  async function *eachSource(original: VNodeRepresentationSource): AsyncIterable<VNode[]> {
    let source: VNodeRepresentationSource = original;

    if (typeof source === "undefined") {
      return;
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
        return;
      }
      /**
       * If we have internal documented source for the children, and it
       * is an iterable, we can use this sync source and pre-flatten it
       */
      const childrenSource = source.children[ChildrenSource];
      if (isIterableChildrenSource(childrenSource)) {
        return yield * eachSource(childrenSource);
      }
      let iterable: AsyncIterable<VNode[]> = source.children;
      if (isChildrenSourceFunction(source.children)) {
        iterable = source.children[ChildrenSourceFunction].call({
          [ChildrenOptions]: context
        });
      }
      for await (const children of iterable) {
        yield * childrenUnion(
          context,
          children.map(eachSource)
        );
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
        return;
      }
      const allChildren = [...flatSource(context, initial)];
      if (!allChildren.length) {
        return;
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
    return node.scalar || !node.children || !!node.children[Symbol.iterator];
  }

  if (source.length === 1) {
    return yield* eachSource(source[0]);
  } else {
    return yield* childrenUnion(givenContext, source.map(eachSource));
  }
}

export function flattenChildrenSource(source: Iterable<VNodeRepresentationSource>) {

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
