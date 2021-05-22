import { Collector } from "microtask-collector";
export function createVContextEvents() {
    const target = {
        createNode: new Collector({
            eagerCollection: true
        }),
        children: new Collector({
            eagerCollection: true
        }),
        hydrate: new Collector({
            eagerCollection: true
        })
    };
    return {
        target,
        events: target
    };
}
//# sourceMappingURL=vcontext-events.js.map