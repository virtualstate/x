import {
  createNode,
  Fragment,
  hydrate,
  VNode,
} from "@virtualstate/fringe";
import { Native } from "./native";
import { isElement } from "./document-node";
import { DOMVContext } from "./context";


export async function render(node: VNode | undefined, root: Element | DOMVContext): Promise<void> {
  if (!node) return;
  const context = isElement(root) ? new DOMVContext({ root }) : root;
  await hydrate(context, Native({}, createNode(Fragment, {}, node)));
}

