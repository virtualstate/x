import { isSourceReference } from "./source-reference.js";
import { isAsyncIterable, isIterable } from "iterable";
import { Fragment } from "./fragment.js";
function isVNodeLike(value) {
    return typeof value === "object" || typeof value === "function";
}
/**
 * Indicates if a value is a {@link VNode}
 * @param value
 */
export function isVNode(value) {
    return !!(isVNodeLike(value) &&
        isSourceReference(value.reference) &&
        (!value.children ||
            isAsyncIterable(value.children)) &&
        (!value.options ||
            typeof value.options === "object"));
}
/**
 * Indicates if a value is a {@link NativeVNode}
 * @param value
 */
export function isNativeVNode(value) {
    function isNativeVNodeLike(value) {
        return isVNode(value);
    }
    return (isNativeVNodeLike(value) &&
        value.native === true);
}
export function isScalarVNode(value, isSource) {
    function isScalarVNodeLike(value) {
        return isVNode(value);
    }
    return (isScalarVNodeLike(value) &&
        isSourceReference(value.source) &&
        value.scalar === true &&
        (typeof isSource === "function" ? isSource(value.source) : true));
}
/**
 * Indicates if a value is a {@link FragmentVNode}
 * @param value
 */
export function isFragmentVNode(value) {
    return (isVNode(value) &&
        value.reference === Fragment);
}
/**
 * Indicates if a valid is a {@link MarshalledVNode}
 * @param value
 */
export function isMarshalledVNode(value) {
    return (isVNodeLike(value) &&
        (!value.reference ||
            isSourceReference(value.reference)) &&
        // If we don't have children, then we have a normal VNode
        isIterable(value.children) &&
        (!value.options ||
            typeof value.options === "object"));
}
//# sourceMappingURL=vnode.js.map