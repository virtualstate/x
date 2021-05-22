import {
  getNativeOptions,
  isAttributesOptions, isGetDocumentNodeOptions,
  isNativeAttributesObject,
  isNativeAttributeValue, isNativeOptions,
  isOnBeforeRenderOptions
} from "./options";
import { h, createFragment } from "@virtualstate/fringe";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      p: Record<string, unknown>;
    }
  }
}

describe("options", () => {

  it
    .concurrent
    .each([
      // tslint:disable-next-line:no-null-keyword
      [null, false],
      [undefined, true],
      [1, true],
      [Math.random(), true],
      [true, true],
      ["Yes", true],
      ["", true],
      [() => undefined, false],
    ])
    ("isNativeAttribute %p %p", async (input, output) => expect(isNativeAttributeValue(input)).toEqual(output));

  describe("isNativeAttributesObject", () => {

    it("returns false for undefined", () => {
      expect(isNativeAttributesObject(undefined)).toEqual(false);
    });

    it("returns true for an empty object", () => {
      expect(isNativeAttributesObject({})).toEqual(true);
    });

    it("returns true for values", () => {
      expect(isNativeAttributesObject({ key: 1, foo: "aaa", faa: true })).toEqual(true);
    });

    it("returns false if it contains a bad egg", () => {
      expect(isNativeAttributesObject({ key: () => "🍳" })).toEqual(false);
    });

  });

  describe("isAttributesOptions", () => {

    it("returns false if no attributes", () => {
      expect(isAttributesOptions({})).toEqual(false);
    });

    it("returns true for attributes", () => {
      expect(isAttributesOptions({ attributes: {} })).toEqual(true);
    });

  });

  describe("isOnBeforeRenderOptions", () => {

    it("returns false if no onBeforeRender", () => {
      expect(isOnBeforeRenderOptions({})).toEqual(false);
    });

    it("returns true for onBeforeRender", () => {
      expect(isOnBeforeRenderOptions({ onBeforeRender: () => {} })).toEqual(true);
    });

  });

  describe("isGetDocumentNodeOptions", () => {

    it("returns false if no getDocumentNode", () => {
      expect(isGetDocumentNodeOptions({})).toEqual(false);
    });

    it("returns true for getDocumentNode", () => {
      expect(isGetDocumentNodeOptions({ getDocumentNode: () => {} })).toEqual(true);
    });

  });

  describe("isNativeOptions", () => {

    it("returns false for undefined", () => {
      expect(isNativeOptions(undefined)).toEqual(false);
    });

    it("returns false if type not given", () => {
      expect(isNativeOptions({  })).toEqual(false);
    });

    it("returns false if type not a string", () => {
      expect(isNativeOptions({ type: 1 })).toEqual(false);
    });

    it("returns false if attributes invalid", () => {
      expect(isNativeOptions({ type: "Element", attributes: { key: () => "🍳" } })).toEqual(false);
    });

    it("returns false if onBeforeRender invalid", () => {
      expect(isNativeOptions({ type: "Element", onBeforeRender: "🍳" })).toEqual(false);
    });

    it("returns false if getDocumentNode invalid", () => {
      expect(isNativeOptions({ type: "Element", getDocumentNode: "🍳" })).toEqual(false);
    });

    it("returns false if 'is' is invalid", () => {
      expect(isNativeOptions({ type: "Element", is: 42 })).toEqual(false);
    });

    it("returns false if 'instance' is invalid", () => {
      expect(isNativeOptions({ type: "Element", instance: 42 })).toEqual(false);
    });

    it("true false if 'instance' is valid element", () => {
      expect(isNativeOptions({ type: "Element", instance: document.createElement("div") })).toEqual(true);
    });

    it("true false if 'instance' is valid text", () => {
      expect(isNativeOptions({ type: "Text", instance: document.createTextNode("test") })).toEqual(true);
    });

    it("returns true if 'is' is invalid", () => {
      expect(isNativeOptions({ type: "Element", is: "form" })).toEqual(true);
    });

    it("returns false if 'whenDefined' is invalid", () => {
      expect(isNativeOptions({ type: "Element", whenDefined: 42 })).toEqual(false);
    });

    it("returns true if 'whenDefined' is valid", () => {
      expect(isNativeOptions({ type: "Element", whenDefined: true })).toEqual(true);
    });

    it("returns true for Element", () => {
      expect(isNativeOptions({ type: "Element" })).toEqual(true);
    });

    it("returns true for Text", () => {
      expect(isNativeOptions({ type: "Text" })).toEqual(true);
    });

  });

  describe("getNativeOptions", () => {

    it("returns undefined if fragment", () => {
      expect(getNativeOptions(<><p></p></>)).toBeFalsy();
    });

    it("returns options if type options, Text", () => {
      const options = {
        type: "Text"
      };
      const result = getNativeOptions(h("hello", options));
      expect(result).toEqual(options);
    });

    it("returns text options for text source", () => {
      const result = getNativeOptions(h("hello"));
      expect(result.type).toEqual("Text");
    });

    it("returns undefined if source not a string", () => {
      const result = getNativeOptions({
        reference: 1,
        source: () => {}
      });
      expect(result).toBeFalsy();
    });

    it("returns options for element", () => {
      const options = {
        type: "Element"
      };
      const result = getNativeOptions(h("div", options));
      expect(result).toEqual(options);
    });

    it("returns options for element, is", () => {
      const options = {
        type: "Element",
        is: "form"
      };
      const result = getNativeOptions(h("div", options));
      expect(result).toEqual(options);
    });

  });

});
