import { WeakVContext } from "../vcontext-weak.js";
import { hydrate } from "../hydrate.js";
import { h } from "../h.js";
import { isVNode } from "../vnode.js";
import { isSourceReference } from "../source-reference.js";
import { childrenFiltered } from "../filter.js";
class HydratingVContext extends WeakVContext {
    hydrate(node, tree) {
        return super.hydrate(node, tree);
    }
}
describe("Basic", function () {
    it("works & hydrates", async () => {
        const context = new HydratingVContext();
        function Component() {
            return true;
        }
        await hydrate(context, h(Component, null));
    });
    it("returns the source", async () => {
        const expected = Math.random();
        function Component() {
            return expected;
        }
        const iterator = sources(h(Component, null))[Symbol.asyncIterator]();
        const { done, value: children } = await iterator.next();
        expect(done).toBeFalsy();
        expect(Array.isArray(children)).toBeTruthy();
        expect(children.length).toEqual(1);
        const [result] = children;
        expect(result).toBeTruthy();
        expect(isVNode(result)).toBeTruthy();
        expect(result.source).toEqual(expected);
    });
    it("returns the inner yielded source", async () => {
        const initial = Math.random();
        const expected = Math.random();
        async function* Yielding() {
            yield initial;
            yield expected;
        }
        function Component() {
            return (h(Yielding, null));
        }
        const results = [
            initial,
            expected
        ];
        for await (const [{ source: result }] of sources(h(Component, null))) {
            const nextExpected = results.shift();
            expect(result).toEqual(nextExpected);
        }
        expect(results.length).toEqual(0);
    });
});
function sources(node) {
    return childrenFiltered(node, isSourceVNode);
    function isSourceVNode(node) {
        return isSourceReference(node.source) && node.source !== node.reference;
    }
}
//# sourceMappingURL=basic.spec.js.map