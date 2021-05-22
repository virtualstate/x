import { h } from "../h";
import { isVNode } from "../vnode";
import { isSourceReference } from "../source-reference";
import { childrenFiltered } from "../filter";
async function* Is({ map, match }, input) {
    let yielded = false;
    for await (const children of (map ?? sources)(input)) {
        yield match(children);
        yielded = true;
    }
    if (!yielded)
        return false;
}
export function Every({ map, match }, input) {
    return h(Is, { map: map, match: nodes => nodes.every(match ?? isValue) }, input);
    function isValue(vnode) {
        return vnode.source;
    }
}
function Some({ map, match }, input) {
    return h(Is, { map: map, match: nodes => nodes.some(match ?? isValue) }, input);
    function isValue(vnode) {
        return vnode.source;
    }
}
async function* Eventually({ match, flush, output }, input) {
    const matched = await eventually(input, match, flush);
    if (!matched)
        return;
    yield output;
}
async function* If({ flush, true: trueOutput, false: falseOutput }, input) {
    const matched = await eventually(h(Every, null, input), true, flush);
    if (matched) {
        yield trueOutput;
    }
    else {
        yield falseOutput;
    }
}
describe("Logic", function () {
    it("every", async () => {
        function* Thing() {
            yield h(Every, null, 0);
            yield h(Every, null,
                0,
                1);
            yield h(Every, null,
                1,
                0);
            yield h(Every, null,
                1,
                1);
        }
        await assertEventually(h(Thing, null), true, true);
    });
    it("some", async () => {
        function* Thing() {
            yield h(Some, null, 0);
            yield h(Some, null,
                0,
                1);
            yield h(Some, null,
                1,
                0);
            yield h(Some, null,
                1,
                1);
        }
        await assertEventually(h(Thing, null), true, true);
    });
    describe("if", function () {
        it("true", async function () {
            const expected = Math.random();
            await assertEventually(h(If, { true: expected }, true), expected, true);
        });
        it("false", async function () {
            const expected = Math.random();
            await assertEventually(h(If, { false: expected }, false), expected, true);
        });
    });
    async function assertEventually(node, match, flush = false) {
        expect(await eventually(node, match, flush)).toBeTruthy();
    }
});
async function eventually(node, match, flush = false) {
    let value = undefined, yielded = false;
    for await (const [result] of sources(node)) {
        expect(isVNode(result)).toBeTruthy();
        const { source } = result;
        value = source;
        if (!flush && value === match) {
            return true;
        }
        yielded = true;
    }
    if (!yielded) {
        // If no yield and match is undefined we still want to return false
        return false;
    }
    return value === match;
}
function sources(node) {
    return childrenFiltered(node, isSourceVNode);
    function isSourceVNode(node) {
        return isSourceReference(node.source) && node.source !== node.reference;
    }
}
//# sourceMappingURL=logic.spec.js.map