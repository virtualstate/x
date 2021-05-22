import { assertFragmentDOMNativeVNode, isFragmentDOMNativeVNode } from "./fragment";
import { Native } from "./native";
import { Fragment } from "@virtualstate/fringe";
import { NativeOptions } from "./options";

describe("fragment", () => {

  describe("isFragmentDOMNativeVNode", () => {

    it("returns false for vnode", () => {
      expect(isFragmentDOMNativeVNode({ reference: 1 })).toEqual(false);
    });

    it("returns true for fragment", () => {
      expect(isFragmentDOMNativeVNode(Native({}, { reference: Fragment }))).toEqual(true);
    });

  });

  describe("assertFragmentDOMNativeVNode", () => {

    it("throws for vnode", () => {
      expect(() => assertFragmentDOMNativeVNode({ reference: 1 })).toThrow();
    });

    it("returns for fragment", () => {
      assertFragmentDOMNativeVNode(Native({}, { reference: Fragment }));
    });

  });

  describe("FragmentDOMNative", () => {

    it("returns", () => {
      const node = Native({}, { reference: Fragment });
      assertFragmentDOMNativeVNode(node);
    });

    it("returns options", () => {
      const options: Partial<NativeOptions> = {};
      const node = Native(options, { reference: Fragment, options });
      assertFragmentDOMNativeVNode(node);
    });

  });

});
