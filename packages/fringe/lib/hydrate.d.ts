import { VContext } from "./vcontext";
import { VNode } from "./vnode";
import { Tree } from "./tree";
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
export declare function hydrateChildrenGroup(context: VContext, node: VNode, tree: Tree | undefined, children: ReadonlyArray<VNode>): Promise<void>;
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
export declare function hydrateChildren(context: VContext, node: VNode, tree?: Tree): Promise<void>;
/**
 * If available, invokes {@link VContext.hydrate} with the given {@link VNode} and {@link Tree}
 *
 * The {@link VContext} is expected to hydrate the associated {@link VNode.children} when required
 *
 * @param context
 * @param node
 * @param tree
 */
export declare function hydrate(context: VContext, node: VNode, tree?: Tree): Promise<void>;
//# sourceMappingURL=hydrate.d.ts.map