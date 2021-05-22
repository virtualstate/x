import { assertNativeVNode, isNativeCompatible, isNativeVNode, Native } from "./native";
import { assertDOMNativeVNode } from "./node";
import { Fragment } from "@virtualstate/fringe";
import { assertFragmentDOMNativeVNode } from "./fragment";
import { NativeOptions } from "./options";

describe("native", () => {

  describe("isNativeVNode", () => {

    it("returns false for vnode", () => {
      expect(isNativeVNode({ reference: 1 })).toEqual(false);
    });

    it("returns true for element", () => {
      const node = Native({ type: "Element" }, { reference: 1, source: "text" });
      assertDOMNativeVNode(node);
      expect(isNativeVNode(node)).toEqual(true);
    });

    it("returns true for fragment", () => {
      const node = Native({}, { reference: Fragment });
      assertFragmentDOMNativeVNode(node);
      expect(isNativeVNode(node)).toEqual(true);
    });

  });

  describe("assertNativeVNode", () => {

    it("throws for vnode", () => {
      expect(() => assertNativeVNode({ reference: 1 })).toThrow();
    });

    it("returns for element", () => {
      const node = Native({ type: "Element" }, { reference: 1, source: "text" });
      assertDOMNativeVNode(node);
      assertNativeVNode(node);
    });

    it("returns for fragment", () => {
      const node = Native({}, { reference: Fragment });
      assertFragmentDOMNativeVNode(node);
      assertNativeVNode(node);
    });

  });

  describe("isNativeCompatible", () => {

    it("returns false for vnode", () => {
      expect(isNativeCompatible({ reference: 1 })).toEqual(false);
    });

    it("returns true for element", () => {
      const node = Native({ type: "Element" }, { reference: 1, source: "text" });
      assertDOMNativeVNode(node);
      expect(isNativeCompatible(node)).toEqual(true);
    });

    it("returns false for fragment", () => {
      const node = Native({}, { reference: Fragment });
      assertFragmentDOMNativeVNode(node);
      expect(isNativeCompatible(node)).toEqual(false);
    });

  });

  describe("Native", () => {

    it("returns element", () => {
      const node = Native({ type: "Element" }, { reference: 1, source: "text" });
      assertDOMNativeVNode(node);
    });

    it("returns element options", () => {
      const options: Partial<NativeOptions> = { type: "Element" };
      const node = Native(options, { reference: 1, source: "text", options });
      assertDOMNativeVNode(node);
      expect(node.options).toEqual(options);
    });

    it("returns fragment", () => {
      const node = Native({}, { reference: Fragment });
      assertFragmentDOMNativeVNode(node);
    });

    it("returns element instance", () => {
      const node = Native({ type: "Element" }, { reference: 1, source: "text" });
      assertDOMNativeVNode(node);
      expect(Native(node.options, node)).toEqual(node);
    });

    it("returns fragment instance", () => {
      const node = Native({}, { reference: Fragment });
      assertFragmentDOMNativeVNode(node);
      expect(Native(node.options, node)).toEqual(node);
    });

  });

});
