export async function * read(node, seen = new WeakSet()) {
  if (!node.children) return;
  for await (const children of node.children) {
    for (const child of children) {
      if (!seen.has(child)) {
        yield child;
        seen.add(child);
      }
      yield * read(child, seen);
    }
  }
}
