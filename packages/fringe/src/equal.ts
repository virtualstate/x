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
export async function equal(left: VNode, right: VNode) {
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
        if (leftChild.scalar !== rightChild.scalar) {
          return false;
        }
      }
      if (!compareOptions(leftChild, rightChild)) {
        return false;
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

  function compareOptions(left: VNode, right: VNode) {
    const leftOptionKeys = Object.keys(left.options ?? {});
    const rightOptionKeys = Object.keys(right.options ?? {});

    if (leftOptionKeys.length !== rightOptionKeys.length) {
      return false;
    }
    if (!leftOptionKeys.length) {
      return true;
    }

    return leftOptionKeys.findIndex(
      /**
       *
       * @param key
       * @returns true if key is not equal
       */
      (key) => {
        if (!rightOptionKeys.includes(key)) {
          return true;
        }
        if (!isSourceReference(left.options[key])) {
          // If not a source reference, do not compare, and instead ensure right is not a source reference
          return isSourceReference(right.options[key]);
        }
        return left.options[key] !== right.options[key];
      }
    ) === -1;
  }

  function compareSource(left: VNode, right: VNode) {
    if (isSourceReference(left.source) || isSourceReference(right.source)) {
      return right.source === left.source && left.scalar === right.scalar;
    }
    // No compare
    return true;
  }
}
