import { SourceReference, Tree } from "@virtualstate/fringe";
import { ElementDetails } from "./element-details";
import { DocumentNode } from "./document-node";


export interface Position {
  left?(): DocumentNode | undefined;
  right?(): DocumentNode | undefined;
}

export function position(elementDetails: ElementDetails, tree: Tree, reference: SourceReference): Position {
  const treeIndex = tree.children.indexOf(reference);
  return {
    right() {
      const rightSiblings = tree.children.slice(treeIndex + 1);
      const reference = rightSiblings.find(isRendered.bind(undefined, elementDetails));
      return reference ? elementDetails.rendered.get(reference) : undefined;
    },
    left(): DocumentNode | undefined {
      const leftSiblings = tree.children.slice(0, treeIndex).reverse();
      const reference = leftSiblings.find(isRendered.bind(undefined, elementDetails));
      return reference ? elementDetails.rendered.get(reference) : undefined;
    }
  };
}

function isRendered(elementDetails: ElementDetails, reference: SourceReference) {
  return elementDetails.rendered.has(reference);
}
