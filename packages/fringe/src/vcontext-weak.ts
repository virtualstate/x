import { VContext } from "./vcontext";
import {
  VContextEvents,
  VContextEventsTarget,
  createVContextEvents,
  VContextEventsPair,
  VContextCreateVNodeEvent, VContextChildrenEvent, VContextHydrateEvent
} from "./vcontext-events";

export class WeakVContext<
  CreateEvent extends VContextCreateVNodeEvent = VContextCreateVNodeEvent,
  ChildrenEvent extends VContextChildrenEvent = VContextChildrenEvent,
  HydrateEvent extends VContextHydrateEvent = VContextHydrateEvent
  > implements VContext<CreateEvent, ChildrenEvent, HydrateEvent> {

  public readonly weak: WeakMap<object, unknown>;
  public readonly events: VContextEvents<CreateEvent, ChildrenEvent, HydrateEvent>;
  protected readonly eventsTarget: VContextEventsTarget<CreateEvent, ChildrenEvent, HydrateEvent>;

  constructor(weak?: WeakMap<object, unknown>, { events, target }: VContextEventsPair<CreateEvent, ChildrenEvent, HydrateEvent> = createVContextEvents()) {
    this.weak = weak || new WeakMap<object, unknown>();
    this.events = events;
    this.eventsTarget = target;
  }

  hydrate(node: HydrateEvent["node"], tree?: HydrateEvent["tree"]): Promise<void> {
    const event = {
      node,
      tree
    };
    assertHydrateEvent(event);
    this.eventsTarget.hydrate.add(event);
    return Promise.resolve();
    function assertHydrateEvent(event: unknown): asserts event is HydrateEvent {
      function isHydrateEventLike(event: unknown): event is { node: unknown, tree: unknown } {
        return !!event;
      }
      if (!(isHydrateEventLike(event) && event.node === node && event.tree === tree)) {
        throw new Error("Expected HydrateEvent");
      }
    }
  }

  close(): Promise<void> {
    this.eventsTarget.children.close();
    this.eventsTarget.hydrate.close();
    this.eventsTarget.createNode.close();
    return Promise.resolve();
  }


}
