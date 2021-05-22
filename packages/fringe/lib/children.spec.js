import { createFragment } from "./fragment";
import { createNode } from "./create-node";
import { isScalarVNode } from "./vnode";
describe("children", () => {
    describe("fragments", () => {
        it("should flatten", async () => {
            const expectedValue = Math.random();
            function F({ depth, value }) {
                if (depth === 0) {
                    return value;
                }
                else {
                    return createFragment({}, createNode(F, { depth: depth - 1, value }));
                }
            }
            const node = createNode(F, { depth: 3, value: expectedValue });
            const { value: [scalar] } = await node.children[Symbol.asyncIterator]().next();
            assertScalar(scalar);
            expect(scalar.source).toEqual(expectedValue);
            function assertScalar(node) {
                expect(isScalarVNode(node)).toBeTruthy();
            }
        });
    });
});
//# sourceMappingURL=children.spec.js.map