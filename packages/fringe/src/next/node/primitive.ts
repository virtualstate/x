import { FringeError } from "../errors";
import { NodeSymbol, Node, isNode } from "./node";

export type PrimitiveValue = string | number | boolean | BigInt | symbol;

export const PrimitiveSymbol = Symbol.for("@virtualstate/fringe/Primitive");

export interface PrimitiveNode extends Node {
  [PrimitiveSymbol]: PrimitiveValue;
}

export function isPrimitiveValue(value: unknown): value is PrimitiveValue {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint" ||
    typeof value === "symbol"
  );
}

export function isPrimitiveNode(value: unknown): value is PrimitiveNode {
  return (
    isNode(value) &&
    PrimitiveSymbol in value &&
    value[PrimitiveSymbol] === true
  );
}

export function isPrimitive(value: unknown): value is PrimitiveValue {
  return isPrimitiveValue(value) || isPrimitiveNode(value);
}

export class PrimitiveError extends FringeError {
  constructor() {
    super("Expected Primitive");
  }
}

export function assertPrimitiveValue(value: unknown): asserts value is PrimitiveValue {
  if (!isPrimitiveValue(value)) {
    throw new PrimitiveError();
  }
}

export function createPrimitiveNode(value: PrimitiveValue | PrimitiveNode): PrimitiveNode {
  if (isPrimitiveNode(value)) {
    return value;
  }
  return {
    [NodeSymbol]: true,
    [PrimitiveSymbol]: value
  };
}
