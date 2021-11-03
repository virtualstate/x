import {isFragmentVNode, VNode} from "./vnode";
import {then} from "./then";
import {isSourceReference} from "./source-reference";
import {isTokenVNode} from "./token";

async function getChildren(node: VNode) {
  return await new Promise<VNode[]>(then.bind(node));
}

/**
 * @experimental
 */
export async function compare(left: VNode, right: VNode) {
  return compareChildren(await getAsChildren(left), await getAsChildren(right));
  async function compareChildren(left: VNode[], right: VNode[]) {
    if (left.length !== right.length) return false;
    // This could all be done in parallel, but, leave that for later to optimise
    for (let index = 0; index < left.length; index += 1) {
      const leftChild = left[index];
      const rightChild = right[index];
      if (isSourceReference(leftChild.source)) {
        if (isTokenVNode(leftChild)) {
          if (!leftChild.is(rightChild)) {
            return false;
          }
        } else if (!compareSource(leftChild, rightChild)) {
          return false;
        }
        if (leftChild.scalar !== rightChild.scalar) return false;
      }
      if (leftChild.children || rightChild.children) {
        if (!await compareChildren(await getChildren(leftChild), await getChildren(rightChild))) {
          return false;
        }
      }
    }
    return true;
  }

  async function getAsChildren(node: VNode): Promise<VNode[]> {
    if (isSourceReference(node.source) && !isFragmentVNode(node)) return [node];
    return getChildren(node);
  }

  function compareSource(left: VNode, right: VNode) {
    if (isSourceReference(left.source) || isSourceReference(right.source)) {
      return right.source === left.source && left.scalar === right.scalar;
    }
    // No compare
    return true;
  }
}
