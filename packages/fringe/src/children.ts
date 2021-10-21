import { isFragmentVNode, isVNode, VNode, VNodeRepresentationSource } from "./vnode";
import { isSourceReference } from "./source-reference";
import {
  asyncExtendedIterable,
  isIterableIterator,
  isPromise
} from "iterable";
import { UnionInput, union, UnionOptions } from "@virtualstate/union";
import type { CreateNodeFn } from "./create-node";

export interface ProxyNodeFn {
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

export async function *children(context: ChildrenTransformOptions, ...source: VNodeRepresentationSource[]): AsyncIterable<VNode[]> {
  async function *eachSource(source: VNodeRepresentationSource): AsyncIterable<VNode[]> {
    if (typeof source === "undefined") {
      return;
    }

    if (isVNode(source) && context.proxyNode) {
      const next = context.proxyNode(source);
      if (next && next !== source) {
        return yield * eachSource(source);
      }
    }

    if (isFragmentVNode(source)) {
      if (!source.children) {
        return;
      }
      for await (const children of source.children) {
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
    return yield* childrenUnion(context, source.map(eachSource));
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
