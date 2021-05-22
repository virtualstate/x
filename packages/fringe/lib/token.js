import { isSourceReference } from "./source-reference.js";
import { isVNode } from "./vnode.js";
import { assert } from "./assert.js";
import { createFragment } from "./fragment.js";
export const Token = Symbol.for("@virtualstate/fringe/token");
export const IsTokenOptions = Symbol.for("@virtualstate/fringe/token/isTokenOptions");
export function createToken(source, options, ...children) {
    let tokenized;
    const isOptionsOptions = isOptionsIsOptions(options) ? options : undefined;
    function token(partialOptions, child) {
        const node = isTokenVNode(this) ? this : tokenized;
        let nextNode = node;
        if (partialOptions && hasOwnPropertyAvailable(partialOptions)) {
            nextNode = {
                ...nextNode,
                options: {
                    ...nextNode.options,
                    ...partialOptions
                }
            };
        }
        if (child) {
            nextNode = {
                ...nextNode,
                children: createFragment(undefined, child).children
            };
        }
        assertTokenVNode(nextNode, node.isTokenSource, isCompleteOptions);
        // Terminates the node, will no longer be a function if it still was one
        return {
            ...nextNode
        };
        function isCompleteOptions(value) {
            if (isOptionsOptions?.[IsTokenOptions]) {
                return isOptionsOptions[IsTokenOptions](value);
            }
            return value === nextNode.options;
        }
    }
    Object.assign(token, {
        reference: Token,
        source,
        options,
        isTokenSource,
        isTokenOptions,
        assert,
        assertFn,
        is,
        isFn,
        children: children.length ? createFragment(undefined, ...children).children : undefined
    });
    const almost = token;
    // Even though we can provide partial options as per the type, if there are minimum requirements
    // then IsTokenOptions will verify this
    assertTokenVNodeFn(almost, isTokenSource, isPartialOptions);
    tokenized = almost;
    return tokenized;
    function isPartialOptions(value) {
        return Object.is(value, options);
    }
    function is(value) {
        return isTokenVNode(value, isTokenSource, isTokenOptions);
    }
    function isFn(value) {
        return isTokenVNodeFn(value, isTokenSource, isTokenOptions);
    }
    function assert(value) {
        return assertTokenVNode(value, isTokenSource, isTokenOptions);
    }
    function assertFn(value) {
        return assertTokenVNodeFn(value, isTokenSource, isTokenOptions);
    }
    function isTokenSource(value) {
        return Object.is(value, source);
    }
    function isTokenOptions(value) {
        return isOptionsOptions?.[IsTokenOptions]?.(value) ?? true;
    }
    function isOptionsIsOptions(value) {
        function isOptionsIsOptionsLike(value) {
            return !!value;
        }
        return options === value && isOptionsIsOptionsLike(value) && typeof value[IsTokenOptions] === "function";
    }
}
export function isTokenVNode(value, isTokenSource, isTokenOptions) {
    return isVNode(value) && (typeof isTokenSource === "function" ? isTokenSource : isSourceReference)(value.source) && value.reference === Token && (typeof isTokenOptions === "function" ? isTokenOptions(value.options) : true);
}
export function isTokenVNodeFn(value, isTokenSource, isTokenOptions) {
    return typeof value === "function" && isTokenVNode(value, isTokenSource, isTokenOptions);
}
export function assertTokenVNode(value, isTokenSource, isTokenOptions) {
    return assert(value, {
        is(value) {
            return isTokenVNode(value, isTokenSource, isTokenOptions);
        },
        message: "Expected TokenVNode"
    });
}
export function assertTokenVNodeFn(value, isTokenSource, isTokenOptions) {
    return assert(value, {
        is(value) {
            return isTokenVNodeFn(value, isTokenSource, isTokenOptions);
        },
        message: "Expected TokenVNode function"
    });
}
function hasOwnPropertyAvailable(object) {
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=token.js.map