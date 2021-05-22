import { h } from "../h";
import { childrenFiltered } from "../filter";
import { createToken, isTokenVNode, TokenInitialOptions, TokenVNode, TokenVNodeBase, TokenVNodeFn } from "../token";
import { createFragment } from "../fragment";
import { createNode } from "../create-node";
import { URL } from "url";
import { VNode } from "../vnode";
import { isIterable } from "iterable";

describe("Tokens", () => {

    it("works", async () => {
        const FirstNameInputSymbol = Symbol("FirstNameInput");
        const LastNameInputSymbol = Symbol("LastNameInput");
        type FirstNameInputNode = TokenVNodeFn<typeof FirstNameInputSymbol>;
        type LastNameInputNode = TokenVNodeFn<typeof LastNameInputSymbol>;

        const FirstNameInput: FirstNameInputNode = createToken(FirstNameInputSymbol);
        const LastNameInput: LastNameInputNode = createToken(LastNameInputSymbol);

        function Component() {
            return (
                <>
                    <FirstNameInput />
                    <LastNameInput />
                </>
            );
        }

        const tokens = await last(childrenFiltered(<Component />, isTokenVNode));
        expect(tokens).toBeTruthy();
        expect(tokens.length).toEqual(2);
        const [firstName, lastName] = tokens;
        FirstNameInput.assert(firstName);
        LastNameInput.assert(lastName);
    });

    interface InputChildrenOptions {
        option?: number | string;
    }

    const InputChildrenSymbol = Symbol("InputChildren");
    type InputChildrenNode = TokenVNodeFn<typeof InputChildrenSymbol, InputChildrenOptions>;
    const InputChildren: InputChildrenNode = createToken(InputChildrenSymbol);

    interface InputOptions {
        type: string;
    }

    const defaultInputChildOption = Math.random();

    const InputSymbol = Symbol("Input");
    type InputNode = TokenVNodeBase<typeof InputSymbol, InputOptions>;
    const defaultInputOptions = {
        type: "text"
    };
    type InputNodeFn = TokenVNodeFn<typeof InputSymbol, TokenInitialOptions<InputOptions, typeof defaultInputOptions>>;
    const Input: InputNodeFn = createToken<typeof InputSymbol, InputOptions, typeof defaultInputOptions>(
        InputSymbol,
        defaultInputOptions,
        // Default children
        <InputChildren option={defaultInputChildOption} />
    );

    it("allows default options", async () => {
        const defaultType = `${Math.random()}`;
        const defaultOptions = {
            type: defaultType
        };
        const Input: InputNodeFn = createToken<typeof InputSymbol, InputOptions, typeof defaultOptions>(InputSymbol, defaultOptions);
        const tokens = await last(childrenFiltered(<Input />, isTokenVNode));
        expect(tokens).toBeTruthy();
        expect(tokens).toHaveLength(1);
        const [token] = tokens;
        Input.assert(token);
        expect(token.options.type).toEqual(defaultType);
    });

    it("allows options", async () => {
        const expectedType = `${Math.random()}`;
        const tokens = await last(childrenFiltered(<Input type={expectedType} />, isTokenVNode));
        expect(tokens).toBeTruthy();
        expect(tokens).toHaveLength(1);
        const [token] = tokens;
        Input.assert(token);
        expect(token.options.type).toEqual(expectedType);
    });

    it("allows default children", async () => {

        const tokens = await last(childrenFiltered(<Input />, isTokenVNode));

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

        const tokens = await last(
            childrenFiltered((
                <Input>
                    <InputChildren option={expected} />
                </Input>
            ), isTokenVNode)
        );

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

        const tokens = await last(
            childrenFiltered((
                <Input>
                    <InputChildren option={inputChild1Option} />
                    <InputChildren option={inputChild2Option} />
                </Input>
            ), isTokenVNode)
        );

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
        interface ThingOptions {
            url: URL;
            sameAs?: URL | Iterable<URL>;
            name?: string;
            description?: string;
            identifier?: string | URL;
        }
        type ThingToken = TokenVNode<typeof ThingSymbol, ThingOptions>;
        type ThingTokenFn = TokenVNodeFn<typeof ThingSymbol, ThingOptions>;
        const Thing: ThingTokenFn = createToken<typeof ThingSymbol, ThingOptions>(ThingSymbol);

        const PersonSymbol = Symbol("Person");
        interface PersonOptions extends ThingOptions {
            knows?: PersonToken | Iterable<PersonToken>;
            memberOf?: PartyToken | Iterable<PartyToken>;
        }
        type PersonToken = TokenVNode<typeof PersonSymbol, PersonOptions>;
        type PersonTokenFn = TokenVNodeFn<typeof PersonSymbol, PersonOptions>;
        const Person: PersonTokenFn = createToken<typeof PersonSymbol, PersonOptions>(PersonSymbol);

        type PartyToken = PersonToken | OrganizationToken;

        const OrganizationSymbol = Symbol("Organization");
        interface OrganizationOptions extends ThingOptions {
            member?: PartyToken | Iterable<PartyToken>;
            memberOf?: PartyToken | Iterable<PartyToken>;
        }
        type OrganizationToken = TokenVNode<typeof OrganizationSymbol, OrganizationOptions>;
        type OrganizationTokenFn = TokenVNodeFn<typeof OrganizationSymbol, OrganizationOptions>;
        const Organization: OrganizationTokenFn = createToken<typeof OrganizationSymbol, OrganizationOptions>(OrganizationSymbol);

        it("models", async () => {
            const origin = "https://example.com";

            const thing: ThingToken = <Thing
                url={new URL("/thing/1", origin)}
            />;

            const firstPerson: PersonToken = <Person
                url={new URL("/person/first", origin)}
                name="First Person"
                knows={{
                    *[Symbol.iterator]() {
                        yield secondPerson;
                    }
                }}
                memberOf={{
                    *[Symbol.iterator]() {
                        yield firstOrganization;
                    }
                }}
            />;

            const secondPerson: PersonToken = <Person
                url={new URL("/person/second", origin)}
                name="Second Person"
                knows={{
                    *[Symbol.iterator]() {
                        yield firstPerson;
                    }
                }}
            />;

            const firstOrganization: OrganizationToken = <Organization
                url={new URL("/organization/first", origin)}
                name="First Organization"
                member={{
                    *[Symbol.iterator]() {
                        yield firstPerson;
                        yield secondOrganization;
                    }
                }}
            />;

            const secondOrganization: OrganizationToken = <Organization
                url={new URL("/organization/first", origin)}
                name="Second Organization"
                member={{
                    *[Symbol.iterator]() {
                        yield secondPerson;
                    }
                }}
                memberOf={{
                    *[Symbol.iterator]() {
                        yield firstOrganization;
                    }
                }}
            />;

            const things = <>
                {[
                    thing,
                    firstPerson,
                    secondPerson,
                    firstOrganization,
                    secondOrganization
                ]}
            </>;

            const tokens = await last(childrenFiltered(things, (node: VNode): node is ThingToken | PersonToken | OrganizationToken => (
                Thing.is(node) ||
                Person.is(node) ||
                Organization.is(node)
            )));

            expect(tokens).toHaveLength(5);
            const [, person, , organization] = tokens;

            const members: PartyToken[] = isIterable<PartyToken>(organization.options.member) ?
                Array.from<PartyToken>(organization.options.member) :
                [];

            const found = members.find(member => member.options.url.toString() === person.options.url.toString());
            expect(found.options.url.toString()).toEqual(person.options.url.toString());

        });

    });

});

async function last<T>(iterable: AsyncIterable<T>): Promise<T | undefined> {
    let last: T | undefined = undefined;
    for await (const next of iterable) {
        last = next;
    }
    return last;
}
