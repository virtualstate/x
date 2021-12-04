import {performCached} from "./perform-cached";
import {VNode, h, createFragment, Instance, isVNode, TokenConstructor} from "@virtualstate/fringe";
import {document} from "dom-lite";
import {isPromise} from "iterable";

const moduleCache = new WeakMap<object, unknown>();

export interface CacheOptions {
  cache?: WeakMap<object, unknown> | Map<object, unknown>
  fn?(node: VNode): Promise<VNode> | VNode
}

export async function *Cache({ cache = moduleCache, fn }: CacheOptions, input?: VNode) {
  if (!input?.children) return;
  yield * mapChildren(input);

  async function ProxyChildren({ child }: { child: VNode }) {
    if (!isVNode(child)) return;
    return new Proxy(child, {
      get(target, p) {
        if (p === 'children') {
          if (!child.children) return undefined;
          return {
            async *[Symbol.asyncIterator]() {
              yield * mapChildren(child);
            }
          }
        }
        return target[p];
      }
    });
  }

  async function *mapChildren(child: VNode) {
    yield * performCached(
      [cache],
      true,
      getKey(child),
      proxyChildren()
    );

    function getKey(node: VNode): object {
      const source = node.source;
      if (typeof source === "function" || typeof source === "object") {
        return source;
      }
      if (node[TokenConstructor]) {
        return node[TokenConstructor];
      }
      return node;
    }

    async function *proxyChildren() {
      for await (const children of child.children) {
        yield await Promise.all(
          children
            .map((child) => fn(child))
            .map(async child => <ProxyChildren child={isPromise(child) ? await child : child} />)
        )
      }
    }
  }
}
