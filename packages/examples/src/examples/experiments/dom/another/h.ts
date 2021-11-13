import {Element} from "./element";
import {f, VNode} from "@virtualstate/fringe";

export function h(tag: string, attributes: Record<string, unknown>, ...children: unknown[]) {
  return f(Element, {
    tag,
    attributes
  }, ...children);
}
