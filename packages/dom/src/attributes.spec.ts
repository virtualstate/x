import { setAttributes } from "./attributes";
import { NativeOptionsVNode } from "./options";

describe("setAttributes", () => {

  it("returns if no attributes given", () => {
    const element = document.createElement("div");
    const node: NativeOptionsVNode = {
      reference: 1,
      options: {
        type: "Element"
      },
      source: "div"
    };
    setAttributes(node, element);
  });

  it("returns if empty attributes given", () => {
    const element = document.createElement("div");
    const node: NativeOptionsVNode = {
      reference: 1,
      options: {
        type: "Element",
        attributes: {}
      },
      source: "div"
    };
    setAttributes(node, element);
  });

  it("throws on duplicate", () => {
    const element = document.createElement("div");
    const node: NativeOptionsVNode = {
      reference: 1,
      options: {
        type: "Element",
        attributes: {
          a: 1,
          A: 2
        }
      },
      source: "div"
    };
    expect(() => setAttributes(node, element)).toThrow();
  });

  it("sets expected", () => {
    const element = document.createElement("div");
    const expectedValue = `${Math.random()}`;
    const expectedName = "attributeName";
    const node: NativeOptionsVNode = {
      reference: 1,
      options: {
        type: "Element",
        attributes: {
          [expectedName]: expectedValue
        }
      },
      source: "div"
    };
    setAttributes(node, element);
    expect(element.getAttribute(expectedName)).toEqual(expectedValue);
  });

  it
    .concurrent
    .each([
      [undefined],
      [false]
    ])
  ("unsets expected %p", async (input: unknown) => {
    const element = document.createElement("div");
    const unExpectedValue = `${Math.random()}`;
    const expectedName = "attributeName";
    element.setAttribute(expectedName, unExpectedValue);
    expect(element.getAttribute(expectedName)).toEqual(unExpectedValue);
    const node: NativeOptionsVNode = {
      reference: 1,
      options: {
        type: "Element",
        attributes: {
          [expectedName]: input as undefined
        }
      },
      source: "div"
    };
    setAttributes(node, element);
    expect(element.hasAttribute(expectedName)).toEqual(false);
  });

  it("unsets multiple",  () => {
    const element = document.createElement("div");
    const unExpectedValue = `${Math.random()}`;
    const expectedName = "attributeName";
    element.setAttribute(`${expectedName}1`, unExpectedValue);
    element.setAttribute(`${expectedName}2`, unExpectedValue);
    element.setAttribute(`${expectedName}3`, unExpectedValue);
    const node: NativeOptionsVNode = {
      reference: 1,
      options: {
        type: "Element",
        attributes: {
          [`${expectedName}1`]: undefined,
          [`${expectedName}2`]: undefined,
          [`${expectedName}3`]: undefined
        }
      },
      source: "div"
    };
    setAttributes(node, element);
    expect(element.hasAttribute(`${expectedName}1`)).toEqual(false);
    expect(element.hasAttribute(`${expectedName}1`)).toEqual(false);
    expect(element.hasAttribute(`${expectedName}1`)).toEqual(false);
  });

  it("unsets unexpected attribute",  () => {
    const element = document.createElement("div");
    const unExpectedValue = `${Math.random()}`;
    element.setAttribute("Unexpected", unExpectedValue);
    const node: NativeOptionsVNode = {
      reference: 1,
      options: {
        type: "Element",
        attributes: {
        }
      },
      source: "div"
    };
    setAttributes(node, element);
    expect(element.hasAttribute("Unexpected")).toEqual(false);
  });



  it("sets empty for true", () => {
    const element = document.createElement("div");
    const unExpectedValue = `${Math.random()}`;
    const expectedName = "attributeName";
    element.setAttribute(expectedName, unExpectedValue);
    expect(element.getAttribute(expectedName)).toEqual(unExpectedValue);
    const node: NativeOptionsVNode = {
      reference: 1,
      options: {
        type: "Element",
        attributes: {
          [expectedName]: true
        }
      },
      source: "div"
    };
    setAttributes(node, element);
    expect(element.hasAttribute(expectedName)).toEqual(true);
    expect(element.getAttribute(expectedName)).toEqual("");

  });


});
