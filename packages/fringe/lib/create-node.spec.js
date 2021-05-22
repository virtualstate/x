import { Fragment } from "./fragment";
import { createNode } from "./create-node";
import { isFragmentVNode, isScalarVNode } from "./vnode";
describe("createNode", () => {
    describe("types", () => {
        /*
    
    export type CreateNodeFragmentSourceFirstStage =
      | Function
      | Promise<unknown>
      | typeof Fragment;
    
    export type CreateNodeFragmentSourceSecondStage =
      | AsyncIterable<unknown>
      | Iterable<unknown>
      | IterableIterator<unknown>
      | undefined
      | null;
         */
        it.concurrent.each([
            [() => 1],
            [Promise.resolve(1)],
            [Fragment],
        ])("%p should produce a fragment node", async (input) => {
            const output = createNode(input);
            expect(isFragmentVNode(output)).toEqual(true);
        });
        it.concurrent.each([
            [createNode("source")],
            [createNode(Fragment)]
        ])("%p should return itself", async (input) => {
            const output = createNode(input);
            expect(output).toEqual(input);
        });
        it.concurrent.each([
            [Symbol("Unique Symbol")],
            [true],
            [false],
            [1],
            [0],
            [1n],
            [0n],
            [""],
            ["Hello!"],
        ])("%p should produce a scalar node", async (input) => {
            const output = createNode(input);
            expect(isScalarVNode(output)).toEqual(true);
            const source = output.source;
            expect(source).toEqual(input);
        });
        async function* asyncGenerator() {
        }
        function* generator() {
        }
        it.concurrent.each([
            [asyncGenerator()],
            [generator()],
            [undefined],
            [
                // tslint:disable-next-line:no-null-keyword
                null
            ],
            [[]],
            [{ async *[Symbol.asyncIterator]() { } }] // AsyncIterable
        ])("%p should produce a fragment node", async (input) => {
            const output = createNode(input);
            expect(isFragmentVNode(output)).toEqual(true);
        });
        it("Should throw for a random object", () => {
            const node = { key: 1 };
            // pls no
            expect(() => createNode(node)).toThrow();
        });
    });
});
//# sourceMappingURL=create-node.spec.js.map