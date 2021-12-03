import {performCached} from "./perform-cached";
import {VNode, h, createFragment, Instance, isVNode} from "@virtualstate/fringe";
import {document} from "dom-lite";

async function *Do({ cache = new WeakMap<object, unknown>(), fn = async (node: VNode): Promise<VNode> => undefined }, input: VNode) {
  if (!input?.children) return;
  yield * mapChildren(input);

  async function CaptureChildren({ child }: { child: VNode }) {
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
    yield * performCached([cache], true, child, captureChildren())

    async function *captureChildren() {
      for await (const children of child.children) {
        yield await Promise.all(
          children
            .map(async (child): Promise<VNode> => fn(child))
            .map(async child => <CaptureChildren child={await child} />)
        )
      }
    }
  }
}

async function *Cached() {
  const cache = new WeakMap<object, unknown>();
  const node = (
    <Do
      cache={cache}
      fn={async (node): Promise<VNode> => {
        if (typeof node.source !== "string") {
          return node;
        }
        let element;
        return new Proxy(node, {
          get(target, p) {
            if (p === Instance) {
              if (element) {
                return element;
              }
              const options: ElementCreationOptions = {
                ...node.options
              };
              element = document.createElement(node.source, options);
              return element;
            }
            return target[p];
          }
        })
      }}
    >
      <tr>
        <td>1</td>
        <td>2</td>
      </tr>
    </Do>
  )

  for await (const children of node.children) {
    yield children;
  }
}

export const _ECACHE0001_Render = <Cached />
export const _ECACHE0001_URL = import.meta.url;
