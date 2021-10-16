import {
  CreateNodeResult,
  Source,
} from "./source";
import {
  SourceReference,
} from "./source-reference";
import {
  FragmentVNode,
  VNode
} from "./vnode";
import {
  TokenRequiredOptions,
  TokenResolvedOptions,
  TokenVNodeFn
} from "./token";

/**
 * Generates instances of {@link FragmentVNode} based on the provided source
 *
 * See {@link Source} for an explanation on each type and how they are represented as a {@link VNode}
 *
 * The special case to point out here is if the source is an `IterableIterator` (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Is_a_generator_object_an_iterator_or_an_iterable})
 * then each iteration will result in a new {@link VNode} being created
 */

export interface CreateNodeFn {
  <TT extends SourceReference,
    O extends object,
    InitialOptions extends Partial<O>,
    T extends TokenVNodeFn<TT, O, InitialOptions>>(source: T): T & TokenVNodeFn<TT, O, InitialOptions>;
  <TT extends SourceReference,
    O extends object,
    InitialOptions extends Partial<O>,
    T extends TokenVNodeFn<TT, O, InitialOptions>,
    PassedOptions extends TokenRequiredOptions<O, InitialOptions>,
    >(source: T, options: PassedOptions, ...children: unknown[]): T & TokenVNodeFn<TT, O, TokenResolvedOptions<O, InitialOptions, PassedOptions>>;
  <T extends Source,
    O extends Record<string, unknown> | object,
    C extends unknown[]>(source: T, options: O, ...children: C): CreateNodeResult<T, O, C>;
  <T extends Source,
    O extends Record<string, unknown> | object>(source: T, options: O): CreateNodeResult<T, O>;
  <T extends Source>(source: T): CreateNodeResult<T>;
  (source: Source, options?: Record<string, unknown> | object, ...children: unknown[]): VNode;
  (source?: unknown, options?: Record<string, unknown> | object, ...children: unknown[]): VNode;
}

function noImplementation() {
  return void 0;
}

export const createNode: CreateNodeFn = (noImplementation as unknown) as CreateNodeFn;
export const h: CreateNodeFn = (noImplementation as unknown) as CreateNodeFn;
export const f: CreateNodeFn = (noImplementation as unknown) as CreateNodeFn;
