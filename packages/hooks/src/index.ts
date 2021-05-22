import { VNode, createNode } from "@virtualstate/fringe";

export type HookPair = [VNode, HookFn];
export type HookTriple = [...HookPair, HookChildrenFn];

export type HookFnReturn = VNode | HookPair | HookTriple;

export interface HookFn {
  (node: VNode): HookFnReturn | Promise<HookFnReturn>;
}

export interface HookChildrenFn {
  (node: VNode): AsyncIterable<VNode[]>;
}

export interface HookOptions {
  hook?: HookFn;
  hookChildren?: HookChildrenFn;
  depth?: number;
  mutate?: boolean;
}

export async function Hook({ hook, depth, mutate, hookChildren, ...options }: HookOptions, node: VNode): Promise<VNode> {
  if (!(hook ?? hookChildren)) {
    throw new Error("Expected hook or hookChildren");
  }
  const [hooked, nextHook, nextChildrenHook] = await getResult();
  if (!hooked.children) {
    return hooked;
  } else if (mutate) {
    return {
      ...hooked,
      children: {
        async *[Symbol.asyncIterator]() {
          yield * hookChildrenGenerator(hooked);
        }
      }
    };
  } else {
    return new Proxy(hooked, {
      get(target, prop: keyof VNode) {
        if (prop === "children") {
          return hookChildrenGenerator(target);
        }
        return target[prop];
      }
    });
  }
  async function *hookChildrenGenerator(hooked: VNode): AsyncIterable<VNode[]> {
    const hookedChildren = nextChildrenHook ? nextChildrenHook(hooked) : hooked.children;
    for await (const children of hookedChildren) {
      yield children.map(child => (
        createNode(
          Hook(
            {
              hook: nextHook,
              hookChildren: nextChildrenHook,
              depth: (depth || 0) + 1,
              mutate
            },
            child
          )
        )
      ));
    }
  }

  async function getResult(): Promise<HookTriple> {
    const result = hook ? await hook(node) : node;
    if (isHookTriple(result)) {
      return result;
    } else if (isHookPair(result)) {
      return [...result, hookChildren];
    } else {
      return [result, hook, hookChildren];
    }

    function isHookPair(value: unknown): value is HookPair {
      return value === result && Array.isArray(value) && value.length === 2;
    }

    function isHookTriple(value: unknown): value is HookTriple {
      return value === result && Array.isArray(value) && value.length === 3;
    }
  }
}
