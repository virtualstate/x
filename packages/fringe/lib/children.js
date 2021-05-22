import { isFragmentVNode, isMarshalledVNode, isVNode } from "./vnode";
import { isSourceReference } from "./source-reference";
import { asyncExtendedIterable, isIterableIterator, isPromise } from "iterable";
import { union } from "@virtualstate/union";
export async function* childrenUnion(context, childrenGroups) {
    for await (const parts of union(childrenGroups, context)) {
        yield parts.reduce((updates, part) => part ? updates.concat(part.filter(Boolean)) : updates, []);
    }
}
export async function* children(context, ...source) {
    async function* eachSource(source) {
        if (typeof source === "undefined") {
            return;
        }
        if (isPromise(source)) {
            return yield* eachSource(await source);
        }
        if (isFragmentVNode(source)) {
            if (!source.children) {
                return;
            }
            for await (const children of source.children) {
                yield* childrenUnion(context, children.map(eachSource));
            }
            return;
        }
        if (isVNode(source)) {
            return yield [
                source
            ];
        }
        // These need further processing through createVNodeWithContext
        if (isSourceReference(source) || isMarshalledVNode(source) || isIterableIterator(source)) {
            return yield* eachSource(context.createNode(source));
        }
        return yield* childrenUnion(context, asyncExtendedIterable(source).map(eachSource));
    }
    if (source.length === 1) {
        return yield* eachSource(source[0]);
    }
    else {
        return yield* childrenUnion(context, source.map(eachSource));
    }
}
//# sourceMappingURL=children.js.map