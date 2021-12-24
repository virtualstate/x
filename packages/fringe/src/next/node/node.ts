
export const NodeSymbol = Symbol.for("@virtualstate/fringe/Node");
export interface Node {
  [NodeSymbol]: true
}

export function isNode(value: unknown): value is Node {
  return (
    (typeof value === "object" || typeof value === "function") &&
    NodeSymbol in value &&
    value[NodeSymbol] === true
  );
}
