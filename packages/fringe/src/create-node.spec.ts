import { Fragment } from "./fragment";
import { createNode } from "./create-node";
import { FragmentVNode, isFragmentVNode, isScalarVNode, ScalarVNode, VNode } from "./vnode";
import { SourceReference } from "./source-reference";
import {CreateNodeResult, CreateNodeResultOp6, Source} from "./source";

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

    it.concurrent.each<[Source]>([
      [() => 1],
      [Promise.resolve(1)],
      [Fragment],
    ])("%p should produce a fragment node", async (input) => {
      const output = createNode(input);
      expect(isFragmentVNode(output)).toEqual(true);
    });

    it.concurrent.each<[VNode]>([
      [createNode("source")],
      [createNode(Fragment)]
    ])("%p should return itself", async <I extends VNode>(input: I) => {
      const output = createNode(input);
      expect(output).toEqual(input);
    });

    it.concurrent.each<[SourceReference]>([
      [Symbol("Unique Symbol")],
      [true],
      [false],
      [1],
      [0],
      [1n],
      [0n],
      [""],
      ["Hello!"],
    ])("%p should produce a scalar node", async <I extends SourceReference>(input: I ) => {
      const output = createNode<I>(input);
      expect(isScalarVNode(output)).toEqual(true);
      const source = output.source;
      expect(source).toEqual(input);
    });

    async function *asyncGenerator() {

    }
    function *generator() {

    }

    it.concurrent.each<[Source]>([
      [asyncGenerator()],
      [generator()],
      [undefined],
      [
        // tslint:disable-next-line:no-null-keyword
        null
      ],
      [[]], // Iterable,
      [{ async *[Symbol.asyncIterator]() { }}] // AsyncIterable
    ])("%p should produce a fragment node", async (input) => {
      const output = createNode(input);
      expect(isFragmentVNode(output)).toEqual(true);
    });

    it("Should throw for a random object", () => {
      const node: unknown = { key: 1 };
      // pls no
      expect(() => createNode(node as VNode)).toThrow();
    });

  });

});
