import * as Primitive from "./primitive";
import * as Descendent from "./descendent";

export {
  Primitive,
  Descendent
}

export const OrderedNodeCreators = [
  ["Primitive", Primitive],
  ["Descendent", Descendent],
] as const;
