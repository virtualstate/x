import { hydrate, hydrateChildren } from "../hydrate.js";
import { h } from "../h.js";
// import { render } from "@virtualstate/dom";
async function render(node, unused) {
    const context = {
        async hydrate(node, tree) {
            await hydrateChildren(context, node, tree);
        }
    };
    await hydrate(context, node);
}
describe("Errors", function () {
    it("throws an error", async () => {
        const root = document.createElement("div");
        const errorMessage = `Expected Error: ${Math.random()}`;
        function Component() {
            throw new Error(errorMessage);
        }
        await expect(render(h(Component, null), root)).rejects.toThrow(errorMessage);
    });
    // TODO
    it.skip("throws an error from a generator", async () => {
        const root = document.createElement("div");
        const errorMessage = `Expected Error: ${Math.random()}`;
        function Throw() {
            throw new Error(errorMessage);
        }
        function* Component() {
            try {
                debugger;
                yield h(Throw, null);
            }
            catch (error) {
                yield undefined;
            }
        }
        await expect(render(h(Component, null), root)).resolves.toBeFalsy();
    });
});
//# sourceMappingURL=errors.spec.js.map