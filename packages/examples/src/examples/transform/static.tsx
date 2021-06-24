import {h} from "@virtualstate/examples";
import { Hook, Mutation } from "@virtualstate/hooks-extended";
import {
  ChildrenSource,
  createNode,
  Fragment,
  Instance,
  isScalarVNode, isVNode,
  SourceReference,
  VNode
} from "@virtualstate/fringe";
import { readAllDrain } from "./read";

type VNodeWithChildren = VNode & { children: AsyncIterable<VNode[]> }

/**
 * @experimental
 */
export const IsStaticSymbol = Symbol("Is Static");

/**
 * @experimental
 */
export class Static {

  readonly #weakTree = new WeakMap<VNode, VNode>();
  readonly #referenceTree = new Map<SourceReference, VNode>();
  readonly #sourceTree = new Map<unknown, VNode>();
  readonly #weakChildrenRecording = new WeakMap<VNode, VNode[][]>();
  readonly #weakChildrenRecordingInProgress = new WeakSet<VNode>();
  readonly #state: VNode = createNode(undefined);

  constructor(options: unknown, state: VNode) {
    this.#state = state;
  }

  async *[Symbol.asyncIterator]() {
    const weakTree = this.#weakTree;
    const referenceTree = this.#referenceTree;
    const sourceTree = this.#sourceTree;
    const weakChildrenRecording = this.#weakChildrenRecording;
    const weakChildrenRecordingInProgress = this.#weakChildrenRecordingInProgress;

    yield mutate(this.#state);

    function mutate(value: VNode): VNode {
      const existing = getExisting(value);
      if (existing) return existing;
      return make(value);
    }

    function make(value: VNode): VNode {
      if (isScalarVNode(value) || value[IsStaticSymbol] || !value.children) {
        return value;
      }
      const proxied = new Proxy(value, {
        get(target: VNode, p: keyof VNode) {
          if (p !== "children") {
            return target[p];
          }
          if (!isVNodeWithChildren(target)) {
            return target.children;
          }
          const asyncIterable = replayChildrenViaRecording(target);
          const recording = weakChildrenRecording.get(target);
          if (recording?.length) {
            asyncIterable[ChildrenSource] = recording[recording.length - 1];
          }
          return asyncIterable;
        }
      });
      weakTree.set(value, proxied);
      return proxied;
    }

    function isVNodeWithChildren(node: VNode): node is VNodeWithChildren {
      return !!node.children;
    }

    async function *replayChildrenViaRecording(node: VNodeWithChildren): AsyncIterable<VNode[]> {
      const existingRecording = weakChildrenRecording.get(node);
      if (existingRecording) {
        return yield * existingRecording;
      }
      if (weakChildrenRecordingInProgress.has(node)) {
        throw new Error("Initial children recording in progress, pre-record if multiple consumers are required");
      }
      weakChildrenRecordingInProgress.add(node);
      const recording: VNode[][] = [];
      for await (const children of node.children) {
        const mapped = children.map(mutate)
        yield mapped;
        recording.push(mapped);
      }
      weakChildrenRecording.set(node, recording);
      weakChildrenRecordingInProgress.delete(node);
    }

    function getExisting(value: VNode): VNode | undefined {
      const weakExisting = weakTree.get(value);
      if (weakExisting) {
        return weakExisting;
      }
      const referenceExisting = referenceTree.get(value.reference);
      if (referenceExisting) {
        return referenceExisting;
      }
      const sourceExisting = sourceTree.get(value.source);
      if (sourceExisting) {
        return sourceExisting;
      }
    }
  }

}

function Component({ meta }) {
  return `${meta} ❤️`;
}

const instance = (
  <Static>
    <Component meta="🦿" />
  </Static>
);

await readAllDrain(instance);
await readAllDrain(instance); // We are static now

export const _903_TransformStatic = (
  <container>
    {instance}
  </container>
)
export const _903_URL = import.meta.url;
