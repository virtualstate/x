import { VContext } from "./vcontext";
import { VContextEvents, VContextEventsTarget, VContextEventsPair, VContextCreateVNodeEvent, VContextChildrenEvent, VContextHydrateEvent } from "./vcontext-events";
export declare class WeakVContext<CreateEvent extends VContextCreateVNodeEvent = VContextCreateVNodeEvent, ChildrenEvent extends VContextChildrenEvent = VContextChildrenEvent, HydrateEvent extends VContextHydrateEvent = VContextHydrateEvent> implements VContext<CreateEvent, ChildrenEvent, HydrateEvent> {
    readonly weak: WeakMap<object, unknown>;
    readonly events: VContextEvents<CreateEvent, ChildrenEvent, HydrateEvent>;
    protected readonly eventsTarget: VContextEventsTarget<CreateEvent, ChildrenEvent, HydrateEvent>;
    constructor(weak?: WeakMap<object, unknown>, { events, target }?: VContextEventsPair<CreateEvent, ChildrenEvent, HydrateEvent>);
    hydrate(node: HydrateEvent["node"], tree?: HydrateEvent["tree"]): Promise<void>;
    close(): Promise<void>;
}
//# sourceMappingURL=vcontext-weak.d.ts.map