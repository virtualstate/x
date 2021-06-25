import {
  createNode,
  Fragment,
  FragmentVNode,
  hydrate, isFragmentVNode,
  VNode,
} from "@virtualstate/fringe";
import { Native } from "./native";
import { isElement } from "./document-node";
import { DOMVContext } from "./context";


export async function render(node: VNode | undefined, root: Element | DOMVContext): Promise<void> {
  if (!node) return;
  const context = isElement(root) ? new DOMVContext({ root }) : root;
  const fragment: FragmentVNode = isFragmentVNode(node) ? node : createNode(Fragment, {}, node);
  await hydrate(context, Native({}, fragment));

}

