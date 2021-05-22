import { assertDOMNativeVNode, createVNode, isDOMNativeCompatibleVNode } from "./node";
import { Native } from "./native";

describe("node", () => {

  describe("isDOMNativeCompatibleVNode", () => {

    it
      .concurrent
      .each([
        ["div", true],
        [1, true],
        [true, true],
        [false, true],
        [0, true],
        [[], false],
        [{}, false],
        [() => {}, false]
      ])
      ("%p returns %p", async (source, output) => expect(isDOMNativeCompatibleVNode({
        reference: 1,
        source
      })).toEqual(output));

  });

  describe("assertDOMNativeVNode", () => {

    it
      .concurrent
      .each([
        ["div", true],
        [() => {}, false]
      ])
      ("%p should return? %p", async (source, output) => {
        if (output) {
          test();
        } else {
          expect(test).toThrow();
        }
        function test() {
          assertDOMNativeVNode(Native({}, {
            reference: 1,
            options: {},
            source
          }));
        }
      });

  });

  describe("createVNode", function () {

    it("returns reference if given", () => {
      const reference = `${Math.random()}`;
      // Native will return `createVNode` for us with the correct options
      const node = Native({}, {
        reference,
        source: "div",
        options: {}
      });
      assertDOMNativeVNode(node);
      const result = createVNode(node);
      expect(result.reference).toEqual(reference);
    });

    it("returns a default reference for us", () => {
      const node = Native({}, {
        reference: undefined,
        source: "div",
        options: {}
      });
      assertDOMNativeVNode(node);
      const result = createVNode({
        ...node,
        reference: undefined
      });
      expect(result.reference).toBeTruthy();
      expect(typeof result.reference).toEqual("symbol");
      expect(typeof result.reference === "symbol" && result.reference.toString())
        .toEqual("Symbol(@virtualstate/dom/native)");
    });


  });

});
