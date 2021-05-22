import { Source } from "./source";
import { VNode, VNodeRepresentationSource } from "./vnode";
import { Tree } from "./tree";
import { Collector } from "microtask-collector";

export interface VContextHydrateEvent<TVNode extends VNode = VNode, TTree extends Tree = Tree> {
  node: TVNode;
  tree?: TTree;
}

export interface VContextCreateVNodeEvent<O extends object = object, S = Source<O>> {
  source: S;
  options: O;
}

export interface VContextChildrenEvent<C extends VNodeRepresentationSource = VNodeRepresentationSource> {
  children: C[];
}

export interface VContextEvents<
  CreateEvent extends VContextCreateVNodeEvent = VContextCreateVNodeEvent,
  ChildrenEvent extends VContextChildrenEvent = VContextChildrenEvent,
  HydrateEvent extends VContextHydrateEvent = VContextHydrateEvent
  > {
  createNode?: AsyncIterable<CreateEvent[]>;
  children?: AsyncIterable<ChildrenEvent[]>;
  hydrate?: AsyncIterable<HydrateEvent[]>;
}

export interface VContextEventsTarget<
  CreateEvent extends VContextCreateVNodeEvent = VContextCreateVNodeEvent,
  ChildrenEvent extends VContextChildrenEvent = VContextChildrenEvent,
  HydrateEvent extends VContextHydrateEvent = VContextHydrateEvent
  > extends VContextEvents<CreateEvent, ChildrenEvent, HydrateEvent> {
  createNode?: Collector<CreateEvent>;
  children?: Collector<ChildrenEvent>;
  hydrate?: Collector<HydrateEvent>;
}

export interface VContextEventsPair<
  CreateEvent extends VContextCreateVNodeEvent = VContextCreateVNodeEvent,
  ChildrenEvent extends VContextChildrenEvent = VContextChildrenEvent,
  HydrateEvent extends VContextHydrateEvent = VContextHydrateEvent
  > {
  target: VContextEventsTarget<CreateEvent, ChildrenEvent, HydrateEvent>;
  events: VContextEvents<CreateEvent, ChildrenEvent, HydrateEvent>;
}

export function createVContextEvents<
  CreateEvent extends VContextCreateVNodeEvent = VContextCreateVNodeEvent,
  ChildrenEvent extends VContextChildrenEvent = VContextChildrenEvent,
  HydrateEvent extends VContextHydrateEvent = VContextHydrateEvent
  >(): VContextEventsPair<CreateEvent, ChildrenEvent, HydrateEvent> {
  const target: VContextEventsTarget<CreateEvent, ChildrenEvent, HydrateEvent> = {
    createNode: new Collector<CreateEvent>({
      eagerCollection: true
    }),
    children: new Collector<ChildrenEvent>({
      eagerCollection: true
    }),
    hydrate: new Collector<HydrateEvent>({
      eagerCollection: true
    })
  };
  return {
    target,
    events: target
  };
}
