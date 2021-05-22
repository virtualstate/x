import { h } from "../h.js";
import { childrenFiltered } from "../filter.js";
import { createToken, isTokenVNode } from "../token.js";
import { createFragment } from "../fragment.js";
import { URL } from "url";
import { isIterable } from "iterable";
describe("Tokens", () => {
    it("works", async () => {
        const FirstNameInputSymbol = Symbol("FirstNameInput");
        const LastNameInputSymbol = Symbol("LastNameInput");
        const FirstNameInput = createToken(FirstNameInputSymbol);
        const LastNameInput = createToken(LastNameInputSymbol);
        function Component() {
            return (h(createFragment, null,
                h(FirstNameInput, null),
                h(LastNameInput, null)));
        }
        const tokens = await last(childrenFiltered(h(Component, null), isTokenVNode));
        expect(tokens).toBeTruthy();
        expect(tokens.length).toEqual(2);
        const [firstName, lastName] = tokens;
        FirstNameInput.assert(firstName);
        LastNameInput.assert(lastName);
    });
    const InputChildrenSymbol = Symbol("InputChildren");
    const InputChildren = createToken(InputChildrenSymbol);
    const defaultInputChildOption = Math.random();
    const InputSymbol = Symbol("Input");
    const defaultInputOptions = {
        type: "text"
    };
    const Input = createToken(InputSymbol, defaultInputOptions, 
    // Default children
    h(InputChildren, { option: defaultInputChildOption }));
    it("allows default options", async () => {
        const defaultType = `${Math.random()}`;
        const defaultOptions = {
            type: defaultType
        };
        const Input = createToken(InputSymbol, defaultOptions);
        const tokens = await last(childrenFiltered(h(Input, null), isTokenVNode));
        expect(tokens).toBeTruthy();
        expect(tokens).toHaveLength(1);
        const [token] = tokens;
        Input.assert(token);
        expect(token.options.type).toEqual(defaultType);
    });
    it("allows options", async () => {
        const expectedType = `${Math.random()}`;
        const tokens = await last(childrenFiltered(h(Input, { type: expectedType }), isTokenVNode));
        expect(tokens).toBeTruthy();
        expect(tokens).toHaveLength(1);
        const [token] = tokens;
        Input.assert(token);
        expect(token.options.type).toEqual(expectedType);
    });
    it("allows default children", async () => {
        const tokens = await last(childrenFiltered(h(Input, null), isTokenVNode));
        expect(tokens).toBeTruthy();
        expect(tokens).toHaveLength(1);
        const [input] = tokens;
        Input.assert(input);
        const inputChildrenTokens = await last(childrenFiltered(input, InputChildren.is));
        expect(inputChildrenTokens).toBeTruthy();
        expect(inputChildrenTokens).toHaveLength(1);
        const [childToken] = inputChildrenTokens;
        InputChildren.is(childToken);
        expect(childToken.options.option).toEqual(defaultInputChildOption);
    });
    it("allows given children", async () => {
        const expected = Math.random();
        const tokens = await last(childrenFiltered((h(Input, null,
            h(InputChildren, { option: expected }))), isTokenVNode));
        expect(tokens).toBeTruthy();
        expect(tokens).toHaveLength(1);
        const [input] = tokens;
        Input.assert(input);
        const inputChildrenTokens = await last(childrenFiltered(input, InputChildren.is));
        expect(inputChildrenTokens).toBeTruthy();
        expect(inputChildrenTokens).toHaveLength(1);
        const [childToken] = inputChildrenTokens;
        InputChildren.is(childToken);
        expect(childToken.options.option).toEqual(expected);
    });
    it("allows multiple children", async () => {
        const inputChild1Option = Math.random();
        const inputChild2Option = Math.random();
        expect(inputChild1Option).not.toEqual(inputChild2Option);
        const tokens = await last(childrenFiltered((h(Input, null,
            h(InputChildren, { option: inputChild1Option }),
            h(InputChildren, { option: inputChild2Option }))), isTokenVNode));
        expect(tokens).toBeTruthy();
        expect(tokens).toHaveLength(1);
        const [input] = tokens;
        Input.assert(input);
        const inputChildrenTokens = await last(childrenFiltered(input, InputChildren.is));
        expect(inputChildrenTokens).toBeTruthy();
        expect(inputChildrenTokens).toHaveLength(2);
        const [childToken1, childToken2] = inputChildrenTokens;
        InputChildren.is(childToken1);
        InputChildren.is(childToken2);
        expect(childToken1.options.option).toEqual(inputChild1Option);
        expect(childToken2.options.option).toEqual(inputChild2Option);
    });
    describe("models", () => {
        const ThingSymbol = Symbol("Thing");
        const Thing = createToken(ThingSymbol);
        const PersonSymbol = Symbol("Person");
        const Person = createToken(PersonSymbol);
        const OrganizationSymbol = Symbol("Organization");
        const Organization = createToken(OrganizationSymbol);
        it("models", async () => {
            const origin = "https://example.com";
            const thing = h(Thing, { url: new URL("/thing/1", origin) });
            const firstPerson = h(Person, { url: new URL("/person/first", origin), name: "First Person", knows: {
                    *[Symbol.iterator]() {
                        yield secondPerson;
                    }
                }, memberOf: {
                    *[Symbol.iterator]() {
                        yield firstOrganization;
                    }
                } });
            const secondPerson = h(Person, { url: new URL("/person/second", origin), name: "Second Person", knows: {
                    *[Symbol.iterator]() {
                        yield firstPerson;
                    }
                } });
            const firstOrganization = h(Organization, { url: new URL("/organization/first", origin), name: "First Organization", member: {
                    *[Symbol.iterator]() {
                        yield firstPerson;
                        yield secondOrganization;
                    }
                } });
            const secondOrganization = h(Organization, { url: new URL("/organization/first", origin), name: "Second Organization", member: {
                    *[Symbol.iterator]() {
                        yield secondPerson;
                    }
                }, memberOf: {
                    *[Symbol.iterator]() {
                        yield firstOrganization;
                    }
                } });
            const things = h(createFragment, null, [
                thing,
                firstPerson,
                secondPerson,
                firstOrganization,
                secondOrganization
            ]);
            const tokens = await last(childrenFiltered(things, (node) => (Thing.is(node) ||
                Person.is(node) ||
                Organization.is(node))));
            expect(tokens).toHaveLength(5);
            const [, person, , organization] = tokens;
            const members = isIterable(organization.options.member) ?
                Array.from(organization.options.member) :
                [];
            const found = members.find(member => member.options.url.toString() === person.options.url.toString());
            expect(found.options.url.toString()).toEqual(person.options.url.toString());
        });
    });
});
async function last(iterable) {
    let last = undefined;
    for await (const next of iterable) {
        last = next;
    }
    return last;
}
//# sourceMappingURL=token.spec.js.map