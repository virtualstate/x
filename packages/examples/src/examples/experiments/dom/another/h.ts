import {f} from "@virtualstate/fringe";

export function h(tag: string, options: Record<string, unknown>, ...children: unknown[]) {
  return f(tag, options, ...children);
}
