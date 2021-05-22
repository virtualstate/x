import { VNode } from "./vnode";
import {
  VContextChildrenEvent,
  VContextCreateVNodeEvent,
  VContextEvents,
  VContextHydrateEvent
} from "./vcontext-events";
import { Tree } from "./tree";

/**
 * A {@link VContext} is a way for an implementor to provide "global" functionality
 *
 * A {@link VContext} can be bound to a {@link VNode} using {@link withContext}, {@link createVNode}, or {@link createVNodeWithContext}
 *
 * Any {@link VContext} can hydrate {@link VNode} instances, irregardless of what {@link VContext} it was bound to during creation
 * this allows contexts to segregate based on the values provided by {@link VNode} directly
 */
export interface VContext<
  CreateEvent extends VContextCreateVNodeEvent = VContextCreateVNodeEvent,
  ChildrenEvent extends VContextChildrenEvent = VContextChildrenEvent,
  HydrateEvent extends VContextHydrateEvent = VContextHydrateEvent
  > {

  events?: VContextEvents<CreateEvent, ChildrenEvent, HydrateEvent>;

  weak?: WeakMap<object, unknown>;

  /**
   * This function is invoked by {@link hydrate}
   *
   * The functionality provided by this function is up to the implementation
   * @param node
   * @param tree
   */
  hydrate?: (node: VNode, tree?: Tree) => Promise<void>;

  /**
   * This function is invoked by a VContext consumer, it allows the VContext to perform any
   * clean up tasks that are required
   */
  close?: () => Promise<void>;

  catch?: (error: unknown, node: VNode, tree?: Tree) => void | Promise<void>;

}
