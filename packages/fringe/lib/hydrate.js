/**
 * Hydrates a group of children obtained from {@link VNode.children}
 *
 * Children are hydrated in parallel, this means we aren't blocking sibling children from hydrating
 *
 * @param context
 * @param node
 * @param tree
 * @param children
 */
export async function hydrateChildrenGroup(context, node, tree, children) {
    /**
     * Create a tree so that hydrators can "figure out" where they are
     *
     * We want this information to be as simple as possible, which means only
     * recording the references being used
     * rather than passing vnode references around
     *
     * We want those vnodes to be as weakly referenced as possible because
     * they're just a state snapshot
     */
    const nextTree = Object.freeze({
        children: Object.freeze(children.map(child => child ? child.reference : undefined)),
        parent: tree,
        reference: node.reference
    });
    /**
     * Wait for all children to hydrate
     */
    await Promise.all(children.map(hydrateChild));
    async function hydrateChild(child) {
        try {
            await hydrate(context, child, nextTree);
        }
        catch (error) {
            if (context.catch) {
                await context.catch(error, child, nextTree);
            }
            else {
                throw error;
            }
        }
    }
}
/**
 * This will continue until there are no more generated children for the given {@link VNode}
 *
 * This allows values to be hydrated every time there is a new group of children instances
 *
 * At a top level this means that if we still have children being generated, we're still
 * going to be waiting for it to complete, if you need only one group of children to be hydrated then
 * use {@link hydrateChildrenGroup}
 *
 * @param context
 * @param node
 * @param tree
 */
export async function hydrateChildren(context, node, tree) {
    if (!node.children) {
        return;
    }
    try {
        for await (const nextChildren of node.children) {
            await hydrateChildrenGroup(context, node, tree, nextChildren);
        }
    }
    catch (error) {
        if (context.catch) {
            await context.catch(error, node, tree);
        }
        else {
            throw error;
        }
    }
}
/**
 * If available, invokes {@link VContext.hydrate} with the given {@link VNode} and {@link Tree}
 *
 * The {@link VContext} is expected to hydrate the associated {@link VNode.children} when required
 *
 * @param context
 * @param node
 * @param tree
 */
export async function hydrate(context, node, tree) {
    if (!context.hydrate || !node) {
        return;
    }
    try {
        return await context.hydrate(node, tree);
    }
    catch (error) {
        if (context.catch) {
            await context.catch(error, node, tree);
        }
        else {
            throw error;
        }
    }
}
//# sourceMappingURL=hydrate.js.map