import { isFragmentVNode, isVNode, VNode, VNodeRepresentationSource } from "./vnode";
import { isSourceReference } from "./source-reference";
import {
  asyncExtendedIterable,
  isIterableIterator,
  isPromise
} from "iterable";
import { UnionInput, union, UnionOptions } from "@virtualstate/union";
import type { CreateNodeFn } from "./create-node";
import { ChildrenSource, ChildrenSourceFunction } from "./source";

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

export async function *children(givenContext: ChildrenTransformOptions, ...source: VNodeRepresentationSource[]): AsyncIterable<VNode[]> {
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
      if (!source.children) {
        return;
      }
      const childrenSource = source.children[ChildrenSource];
      if (Array.isArray(childrenSource)) {
        return yield * childrenUnion(
          context,
          childrenSource.map(eachSource)
        );
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

    return yield* childrenUnion(
      context,
      asyncExtendedIterable(source).map(eachSource)
    );
  }

  if (source.length === 1) {
    return yield* eachSource(source[0]);
  } else {
    return yield* childrenUnion(givenContext, source.map(eachSource));
  }
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
