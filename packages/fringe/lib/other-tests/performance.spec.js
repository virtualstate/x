import { WeakVContext } from "../vcontext-weak";
import { hydrate, hydrateChildren } from "../hydrate";
import { h } from "../h";
import { createNode } from "../create-node";
import { performance } from "perf_hooks";
class HydratingVContext extends WeakVContext {
    async hydrate(node, tree) {
        await hydrateChildren(this, node, tree);
    }
}
describe("Performance", function () {
    //
    // const obs = new PerformanceObserver((items) => {
    //   for (const { duration, name } of items.getEntries()) {
    //     const length = +name.split(":")[1];
    //     // console.log({ length, duration, individual: duration / length });
    //   }
    //   performance.clearMarks();
    // });
    // obs.observe({
    //   entryTypes: [
    //     "measure"
    //   ]
    // });
    const sampleSet = [
        [56],
        [56],
        [128],
        [128],
        [1024],
        [1024],
        [4096],
    ];
    async function test(length) {
        const context = new HydratingVContext();
        async function* Other() {
            yield 1;
        }
        function Component() {
            return Array.from({ length }, () => createNode(Other));
        }
        performance.mark("start");
        await hydrate(context, h(Component, null));
        performance.mark("end");
        performance.measure(`Start to End:${length}`, "start", "end");
    }
    it.each(sampleSet)("Series %p", test);
    if (process.env.PERFORMANCE_CONCURRENT_TESTS) {
        it.concurrent.each(sampleSet)("Concurrent %p", test);
    }
});
//# sourceMappingURL=performance.spec.js.map