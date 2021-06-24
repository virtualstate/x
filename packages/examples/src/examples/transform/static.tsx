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
import {source} from "iterable";

type VNodeWithChildren = VNode & { children: AsyncIterable<VNode[]> }

/**
 * @experimental
 */
export const IsStaticSymbol = Symbol("Is Static");

export interface StaticOptions {
  reference?: boolean;
  source?: boolean;
  yieldAllChildren?: boolean
}

/**
 * @experimental
 */
export class Static {

  readonly #weakTree = new WeakMap<VNode, VNode>();
  readonly #referenceTree = new Map<SourceReference, VNode>();
  readonly #sourceTree = new Map<unknown, VNode>();
  readonly #weakChildrenRecording = new WeakMap<VNode, VNode[][]>();
  readonly #weakChildrenRecordingInProgress = new WeakSet<VNode>();
  readonly #state: VNode = createNode();
  readonly #options: StaticOptions = {};

  constructor(options: StaticOptions, state: VNode) {
    this.#state = state;
    this.#options = options;
  }

  async *[Symbol.asyncIterator]() {
    const weakTree = this.#weakTree;
    const referenceTree = this.#referenceTree;
    const sourceTree = this.#sourceTree;
    const weakChildrenRecording = this.#weakChildrenRecording;
    const weakChildrenRecordingInProgress = this.#weakChildrenRecordingInProgress;
    const options = this.#options;

    yield mutate(this.#state);

    // We have a static copy of this.#state from here on

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
          if (typeof p === "symbol" && p === IsStaticSymbol) {
            return true;
          }
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
      if (options.reference) {
        referenceTree.set(value.reference, proxied);
      }
      if (options.source) {
        sourceTree.set(value.source, proxied);
      }
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
        if (!options.yieldAllChildren) {
          recording[0] = mapped;
        } else {
          recording.push(mapped);
        }
      }
      weakChildrenRecording.set(node, recording);
      weakChildrenRecordingInProgress.delete(node);
    }

    function getExisting(value: VNode): VNode | undefined {
      const weakExisting = weakTree.get(value);
      if (weakExisting) {
        return weakExisting;
      }
      const referenceExisting = options.reference && referenceTree.get(value.reference);
      if (referenceExisting) {
        return referenceExisting;
      }
      const sourceExisting = options.source && sourceTree.get(value.source);
      if (sourceExisting) {
        return sourceExisting;
      }
      return undefined;
    }
  }

}

function Component({ meta }) {
  return (
    <innerContainer>
      {meta} ❤️
    </innerContainer>
  );
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
