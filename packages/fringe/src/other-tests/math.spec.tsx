import { h, h as f } from "../h";
import { isScalarVNode, ScalarVNode, VNode } from "../vnode";
import { SourceReference } from "../source-reference";

describe("math", () => {

    describe("regions",  () => {

        interface NumberIdentityFn<T extends number[] = number[], O extends (number | VNode) = (number | VNode)> {
            (...args: T): O;
        }

        interface NumberOptions<T extends number[], O extends (number | VNode) = (number | VNode)> {
            identity: NumberIdentityFn<T, O>;
        }

        async function *Number<T extends number[], O extends (number | VNode) = (number | VNode)>(this: NumberIdentityFn<T, O>, { identity }: Partial<NumberOptions<T, O>>, state: VNode) {
            if (!state?.children) return;
            for await (const children of state.children) {
                assertNumbered(children);
                const numbers = children.map(child => child.source);
                const fn: NumberIdentityFn<number[], O> | undefined = identity || this;
                if (!fn) {
                    throw new Error("Unknown identity 🤔");
                }
                yield fn(...numbers);
            }
        }

        const n = Number.bind.bind(Number);
        function assertNumberBind(fn: unknown): asserts fn is (thisValue: NumberIdentityFn) => typeof Number {
            if (fn !== n) {
                throw new Error("Expected Number 🤔");
            }
        }
        assertNumberBind(n);

        const multiply = n((...numbers) => {
            return numbers.reduce((sum, x) => sum * x);
        });
        const divide = n((...numbers) => {
            return numbers.reduce((sum, x) => sum / x);
        });
        const add = n((...numbers) => {
            return numbers.reduce((sum, x) => sum + x);
        });
        const subtract = n((...numbers) => {
            return numbers.reduce((sum, x) => sum - x);
        });
        const x4 = n((x) => Math.pow(x, 4));
        const x3 = n((x) => Math.pow(x, 3));
        const x2 = n((x) => Math.pow(x, 2));
        function _6x3(o: unknown, state: VNode) {
            return f(multiply, {}, 6, f(x3, {}, state));
        }
        function _23x2(o: unknown, state: VNode) {
            return f(multiply, {}, 23, f(x2, {}, state));
        }
        function _18x(o: unknown, state: VNode) {
            return f(multiply, {}, 18, state);
        }

        const fns = {
            x4,
            x3,
            "6x3": _6x3,
            "23x2": _23x2,
            "18x": _18x,
        };

        it.each([
            [0, "x3", 0],
            [1, "x4", 1],
            [4, "x4", 256],
            [0, "x3", 0],
            [1, "x3", 1],
            [3, "x3", 27],
            [0, "6x3", 0],
            [3, "6x3", 162],
            [0, "23x2", 0],
            [3, "23x2", 207],
            [0, "23x2", 0],
            [3, "18x", 54]
        ])("should calculate x = %p, f(%s) = %p", async (input, fn: keyof typeof fns, expectedOutput) => {
            expect(Object.keys(fns)).toContain(fn);
            const identity = fns[fn];
            expect(typeof identity).toEqual("function");
            const state = f(identity, {}, input);
            expect(state.children).toBeTruthy();
            const iterator = state.children[Symbol.asyncIterator]();
            let result;
            let previousOutput;
            do {
                result = await iterator.next();
                if (result.done) break;
                const value = result.value;
                assertNumbered(value);
                const [output] = value.map(node => node.source);
                expect(typeof output).toEqual("number");
                previousOutput = output;
            } while (!result.done);
            expect(previousOutput).toEqual(expectedOutput);
        });

        function assertNumbered(nodes?: VNode[]): asserts nodes is ScalarVNode<number>[] {
            const every = nodes?.every(node => isScalarVNode(node, isNumber));
            if (!every) {
                throw new Error("Expected state to be numbers 🤔");
            }
            function isNumber(value: SourceReference): value is number {
                return typeof value === "number";
            }
        }

    });

});

function assertSymbols(nodes: VNode[]): asserts nodes is ScalarVNode<symbol>[] {
    const every = nodes?.every(node => isScalarVNode(node, isSymbol));
    if (!every && nodes?.length) {
        throw new Error("Expected state to be symbols 🤔");
    }
    function isSymbol(value: SourceReference): value is symbol {
        return typeof value === "symbol";
    }
}

function assertBooleans(nodes: VNode[]): asserts nodes is ScalarVNode<boolean>[] {
    const every = nodes?.every(node => isScalarVNode(node, isBoolean));
    if (!every && nodes?.length) {
        throw new Error("Expected state to be booleans 🤔");
    }
    function isBoolean(value: SourceReference): value is boolean {
        return typeof value === "boolean";
    }
}
