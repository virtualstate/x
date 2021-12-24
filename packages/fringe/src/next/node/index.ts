import { OrderedNodeCreators } from "./nodes";
import { NodeSymbol, Node } from "./node";

export const NodeFunctionsSymbol = Symbol.for("@virtualstate/fringe/NodeFunctions");


export function createNode(this: unknown, value: unknown, ...args: unknown[]): Node {
  const that = this;
  let node: Node = {
    [NodeSymbol]: true
  };
  const createContext = {
    [NodeFunctionsSymbol]: new Set([node])
  };
  for (const [name, module] of OrderedNodeCreators) {
    node = populateNode(node, name, module, value, ...args);
  }
  return node;
  function populateNode<M extends object>(node: Node, name: string, module: M, value: unknown, ...args: unknown[]): Node {
    const isFnName = `is${name}`;
    const createFnName = `create${name}Node`;
    if (!(isFnAvailable(module, isFnName))) return node;
    const is: typeof module[typeof isFnName] = module[isFnName].bind(that ?? module)
    if (!is(value, ...args)) return node;
    if (!(isCreateAvailable(module, createFnName))) return node;
    const createNode: typeof module[typeof createFnName] = module[createFnName].bind(that ?? module)
    const populated = createNode(value, ...args, createContext);
    if (typeof populated === "function") {
      createContext[NodeFunctionsSymbol].add(populated);
    }
    return Object.assign(node, populated);
    function isFnAvailable<T, N extends string>(module: T, name: N): module is T & { [P in N]: (value: unknown, ...args: unknown[]) => boolean } {
      return name in module
    }
    function isCreateAvailable<T, N extends string>(module: T, name: N): module is T & { [P in N]: (value: unknown, ...args: unknown[]) => Node } {
      return name in module
    }
  }
}
