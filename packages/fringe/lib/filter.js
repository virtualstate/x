import { childrenUnion } from "./children";
export async function* childrenFiltered(node, isNode, options = {}) {
    if (!node.children)
        return;
    for await (const children of node.children) {
        if (!children.length) {
            yield []; // Intentional empty yield
        }
        else if (children.every((node) => isNode(node))) {
            yield [...children];
        }
        else {
            yield* childrenUnion(options, children.map(sourcesChildren));
        }
    }
    function sourcesChildren(node) {
        return isNode(node) ? [[node]] : childrenFiltered(node, isNode, options);
    }
}
//# sourceMappingURL=filter.js.map