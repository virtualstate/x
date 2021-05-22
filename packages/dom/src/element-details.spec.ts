import { assertElementDetails, createElementDetails, isElementDetails } from "./element-details";

describe("element details", () => {

  describe("createDocumentNodeDetails", () => {

    it("returns expected", () => {
      assertElementDetails(createElementDetails());
    });

  });

  describe("assertElementDetails", () => {

    it("asserts", () => {
      assertElementDetails(createElementDetails());
    });

    it("throws", () => {
      expect(() => assertElementDetails({})).toThrow();
    });

  });

  describe("isElementDetails", () => {

    it("returns true", () => {
      expect(isElementDetails(createElementDetails())).toEqual(true);
    });

    it("returns false", () => {
      expect(isElementDetails({})).toEqual(false);
    });

  });

});
