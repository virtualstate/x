import {VNode} from "@virtualstate/fringe";

export async function * read(node, seen = new WeakSet()): AsyncIterable<VNode> {
  if (!node.children) return;
  // console.log("children", node);
  for await (const children of node.children) {
    // console.log("children", children);
    for (const child of children) {
      if (!seen.has(child)) {
        yield child;
        seen.add(child);
      }
      yield * read(child, seen);
    }
  }
  // console.log("done", node);
}

export async function readAllDrain<T>(input: AsyncIterable<T>): Promise<void> {
  for await (const node of read(input)) {
    console.log({ node });
  }
}
