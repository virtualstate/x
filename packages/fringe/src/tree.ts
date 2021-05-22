import { SourceReference } from "./source-reference";

/**
 * A tree representing a {@link VNode}'s location in a tree
 *
 * This is generated in {@link hydrateChildrenGroup}
 *
 * A tree may be fragmented by a {@link VContext}, in which case the {@link VContext} should track this itself
 */
export interface Tree {
  reference: SourceReference;
  children: ReadonlyArray<SourceReference>;
  parent?: Tree;
}
