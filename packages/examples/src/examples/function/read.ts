export async function * read(node) {
  if (!node.children) return;
  for await (const children of node.children) {
    yield * children;
    for (const child of children) {
      yield * read(child);
    }
  }
}
