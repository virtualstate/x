import {
    assertElement,
    assertText, getDocumentNode, isExpectedNode
} from "./document-node";
import { NativeOptionsVNode } from "./options";

describe("document node", function () {

    describe("assertElement", () => {

        it("asserts", () => {
            assertElement(document.createElement("div"));
            assertElement(document.createElement("p"));
            assertElement(document.createElement("select"));
        });

        it("doesn't allow text", () => {
            expect(() => assertElement(document.createTextNode("oops"))).toThrow();
        });

    });

    describe("assertText", () => {

        it("asserts", () => {
            assertText(document.createTextNode("yes"));
        });

        it("doesn't allow text", () => {
            expect(() => assertText(document.createElement("div"))).toThrow();
        });

    });

    describe("isExpectedNode", () => {

        it("returns false for given not provided", () => {
            expect(isExpectedNode(undefined, undefined)).toEqual(false);
        });

        it("return true for text", () => {
            const given = document.createTextNode("test");
            const node: NativeOptionsVNode = {
                reference: 1,
                options: {
                    type: "Text"
                },
                source: "test"
            };
            expect(isExpectedNode(node, given)).toEqual(true);
        });

        it("return false for text where was element", () => {
            const given = document.createElement("div");
            const node: NativeOptionsVNode = {
                reference: 1,
                options: {
                    type: "Text"
                },
                source: "test"
            };
            expect(isExpectedNode(node, given)).toEqual(false);
        });

        it("return true for element", () => {
            const given = document.createElement("div");
            const node: NativeOptionsVNode = {
                reference: 1,
                options: {
                    type: "Element"
                },
                source: "div"
            };
            expect(isExpectedNode(node, given)).toEqual(true);
        });

        it("throws an error if not received Text or Element", () => {
            const broken = ({ options: { type: "Something elese" } } as unknown) as NativeOptionsVNode;
            expect(() => isExpectedNode(broken, document.createTextNode("oops"))).toThrow();
        });

        it("returns false for element where it was Text", () => {
            const given = document.createTextNode("oops");
            const node: NativeOptionsVNode = {
                reference: 1,
                options: {
                    type: "Element"
                },
                source: "div"
            };
            expect(isExpectedNode(node, given)).toEqual(false);
        });

    });

    describe("getDocumentNode", () => {

        describe("provided", () => {

            it("returns text result", async () => {
                const root = document.createElement("div");
                root.id = "root";
                const expectedValue = `${Math.random()}`;
                const expected = document.createTextNode(expectedValue);
                const node: NativeOptionsVNode = {
                    reference: 1,
                    options: {
                        type: "Text",
                        getDocumentNode() {
                            return expected;
                        }
                    },
                    source: `${Math.random()}` // Should not be setting from this
                };
                const result = await getDocumentNode(root, node);
                expect(result).toEqual(expected);
            });

            it("returns async text result", async () => {
                const root = document.createElement("div");
                root.id = "root";
                const expectedValue = `${Math.random()}`;
                const expected = document.createTextNode(expectedValue);
                const node: NativeOptionsVNode = {
                    reference: 1,
                    options: {
                        type: "Text",
                        async getDocumentNode() {
                            return expected;
                        }
                    },
                    source: `${Math.random()}` // Should not be setting from this
                };
                const result = await getDocumentNode(root, node);
                expect(result).toEqual(expected);
                expect(result.nodeValue).toEqual(expectedValue);
            });

            it("returns element result", async () => {
                const root = document.createElement("div");
                root.id = "root";
                const expected = document.createElement("div");
                const node: NativeOptionsVNode = {
                    reference: 1,
                    options: {
                        type: "Element",
                        getDocumentNode() {
                            return expected;
                        }
                    },
                    source: "div"
                };
                const result = await getDocumentNode(root, node);
                expect(result).toEqual(expected);
            });

            it("throws if text given for element", async () => {
                const root = document.createElement("div");
                root.id = "root";
                const node: NativeOptionsVNode = {
                    reference: 1,
                    options: {
                        type: "Element",
                        getDocumentNode() {
                            return document.createTextNode("oops");
                        }
                    },
                    source: "div"
                };
                await expect(async () => {
                    await getDocumentNode(root, node);
                }).rejects.toThrow();
            });

            it("throws if element given for text", async () => {
                const root = document.createElement("div");
                root.id = "root";
                const node: NativeOptionsVNode = {
                    reference: 1,
                    options: {
                        type: "Text",
                        getDocumentNode() {
                            return document.createElement("div");
                        }
                    },
                    source: `${Math.random()}`
                };
                await expect(async () => {
                    await getDocumentNode(root, node);
                }).rejects.toThrow();
            });

            it("throws if element given for bad native type", async () => {
                const root = document.createElement("div");
                root.id = "root";
                const node = ({
                    reference: 1,
                    options: {
                        type: `${Math.random()}`,
                        getDocumentNode() {
                            return document.createElement("div");
                        }
                    },
                    source: `${Math.random()}`
                } as unknown) as NativeOptionsVNode;
                await expect(async () => {
                    await getDocumentNode(root, node);
                }).rejects.toThrow();
            });

        });

        describe("instance", () => {

            it("returns text instance", async () => {
                const root = document.createElement("div");
                root.id = "root";
                const expectedValue = `${Math.random()}`;
                const expected = document.createTextNode(expectedValue);
                const node: NativeOptionsVNode = {
                    reference: 1,
                    options: {
                        type: "Text",
                        instance: expected
                    },
                    source: `${Math.random()}` // Should not be setting from this
                };
                const result = await getDocumentNode(root, node);
                expect(result).toEqual(expected);
                expect(result.nodeValue).toEqual(expectedValue);

            });

            it("returns element instance", async () => {
                const root = document.createElement("div");
                root.id = "root";
                const expectedValue = `${Math.random()}`;
                const expected = document.createElement("div");
                expected.appendChild(document.createTextNode(expectedValue));
                const node: NativeOptionsVNode = {
                    reference: 1,
                    options: {
                        type: "Element",
                        instance: expected
                    },
                    source: `${Math.random()}` // Should not be setting from this
                };
                const result = await getDocumentNode(root, node);
                expect(result).toEqual(expected);
                assertElement(result);
                expect(result.innerHTML).toEqual(expectedValue);

            });

        });

        describe("whenDefined", () => {

            it("declares a new element type", async () => {
                const root = document.createElement("div");
                root.id = "root";
                const expectedName = "my-new-element";
                const node: NativeOptionsVNode = {
                    reference: 1,
                    options: {
                        type: "Element",
                        whenDefined: true
                    },
                    source: expectedName
                };
                const resultPromise = getDocumentNode(root, node);
                await Promise.all([
                    resultPromise,
                    (async () => {
                        await new Promise<void>(queueMicrotask);

                        class NewElement extends HTMLElement {
                            constructor() {
                                super();
                            }
                        }
                        customElements.define(expectedName, NewElement, { extends: "div" });
                    })()
                ]);
                const result = await resultPromise;
                assertElement(result);
                expect(result.tagName.toUpperCase()).toEqual(expectedName.toUpperCase());
            });
        });


        it.concurrent
            .each([
                ["div"],
                ["span"],
                ["form"],
                ["table"]
            ])
            ("declares a new element type %s", async (name) => {
                const root = document.createElement("div");
                root.id = "root";
                const expected = document.createElement(name);
                const node: NativeOptionsVNode = {
                    reference: 1,
                    options: {
                        type: "Element"
                    },
                    source: name
                };
                const result = await getDocumentNode(root, node);
                expect(result).toEqual(expected);
                assertElement(result);
                expect(result.tagName.toUpperCase()).toEqual(name.toUpperCase());
            });


    });

});
