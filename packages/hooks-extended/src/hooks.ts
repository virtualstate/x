import { Hook as Basic, HookPair } from "@virtualstate/hooks";
import { createFragment, createNode, isSourceReference, VNode } from "@virtualstate/fringe";
import { Mutation, MutationIs, MutationToken } from "./mutation";
import { Reference, ReferenceIs, ReferenceToken } from "./reference";
import { Isolated, IsolatedToken } from "./isolated";

export type Target = MutationToken | ReferenceToken | IsolatedToken;
export function isTarget(node: VNode): node is Target {
  return Mutation.is(node) || Reference.is(node) || Isolated.is(node);
}

export interface HookedTarget<T = Target> {
  target: T;
  depth: number;
}

export interface HookOptions {
  targets?: HookedTarget[];
  depth?: number;
  mutate?: boolean;
}

export type HookExtendedOptions = HookOptions;

export const HookExtended = Hook;

export function Hook(options: HookOptions, child: VNode): VNode {

  return createNode(Basic, { ...options, hook: hook.bind(undefined, options) }, child);

  async function hook(options: HookOptions, node: VNode): Promise<HookPair> {
    const { targets = [], depth = 0 } = options;
    if (isTarget(node)) {
      return [
        createFragment({}, node.children),
        hook.bind(undefined, {
          ...options,
          depth: depth + 1,
          targets: targets.concat([{
            target: node,
            depth
          }])
        })
      ];
    } else {
      return [
        await run(node, targets),
        hook.bind(undefined, {
          ...options,
          depth: depth + 1
        })
      ];
    }
  }
}

async function run<V extends VNode = VNode>(node: V, targets: HookedTarget[] = []): Promise<VNode> {
  if (!targets.length) {
    return node;
  }

  const isolated = targets.filter(isIsolatedTarget);

  const isolatedDepth = isolated.reduce(
    (depth, descriptor) => Math.min(depth, descriptor.depth),
    Number.POSITIVE_INFINITY
  );

  function isAllowedDepth(descriptor: HookedTarget) {
    if (isolatedDepth === Number.POSITIVE_INFINITY) {
      return true;
    }
    return descriptor.depth >= isolatedDepth;
  }

  const mutators = targets
    .filter(isAllowedDepth)
    .filter(isMutationTarget);

  const references = targets
    .filter(isAllowedDepth)
    .filter(isReferenceTarget);

  // Reference before we mutate
  await reference(node, references);

  const mutated = await mutate(node, mutators);

  // If _any_ change is made then we will re-invoke our references
  // This is a very important point that we may invoke reference fragments multiple times with the same vnode
  //
  // The implementation will need to track whether the reference was found before
  //
  // Mutators should only be returning a new node instance if they have a change!
  if (mutated !== node) {
    await reference(mutated, references);
  }

  return mutated;

  function reference<V extends VNode>(node: V, targets: HookedTarget<ReferenceToken>[]) {
    // Invoke all at once
    return Promise.all(
      targets
        .map(descriptor => descriptor.target)
        .filter(target => isExpected(node, target.options))
        .map(target => target.options.on(node))
    );
  }

  async function mutate(node: VNode, targets: HookedTarget<MutationToken>[]): Promise<VNode> {
    if (!targets.length) {
      return node;
    }
    const currentMutators = targets.slice();
    const nextMutator = currentMutators.shift();
    if (isExpected(node, nextMutator.target.options)) {
      const nextValue = await nextMutator.target.options.mutate(node);
      return mutate(nextValue, currentMutators);
    } else {
      return mutate(node, currentMutators);
    }
  }

  function isExpected(node: VNode, { is: isValue }: { is?: ReferenceIs | MutationIs }): boolean {
    if (typeof isValue === "function") {
      return isValue(node);
    }
    if (isSourceReference(isValue)) {
      return node.reference === isValue;
    }
    return true;
  }
}

function isIsolatedTarget(hooked: HookedTarget<unknown>): hooked is HookedTarget<IsolatedToken> {
  return Isolated.is(hooked.target);
}

function isReferenceTarget(hooked: HookedTarget<unknown>): hooked is HookedTarget<ReferenceToken> {
  return Reference.is(hooked.target);
}

function isMutationTarget(hooked: HookedTarget<unknown>): hooked is HookedTarget<MutationToken> {
  return Mutation.is(hooked.target);
}
