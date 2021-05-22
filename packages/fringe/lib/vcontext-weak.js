import { createVContextEvents } from "./vcontext-events";
export class WeakVContext {
    constructor(weak, { events, target } = createVContextEvents()) {
        this.weak = weak || new WeakMap();
        this.events = events;
        this.eventsTarget = target;
    }
    hydrate(node, tree) {
        const event = {
            node,
            tree
        };
        assertHydrateEvent(event);
        this.eventsTarget.hydrate.add(event);
        return Promise.resolve();
        function assertHydrateEvent(event) {
            function isHydrateEventLike(event) {
                return !!event;
            }
            if (!(isHydrateEventLike(event) && event.node === node && event.tree === tree)) {
                throw new Error("Expected HydrateEvent");
            }
        }
    }
    close() {
        this.eventsTarget.children.close();
        this.eventsTarget.hydrate.close();
        this.eventsTarget.createNode.close();
        return Promise.resolve();
    }
}
//# sourceMappingURL=vcontext-weak.js.map