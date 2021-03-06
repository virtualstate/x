import {createToken, TokenVNodeBase, TokenVNodeFn, createToken as h} from "@virtualstate/fringe";
import {
  NamedNodeLike,
  BlankNodeLike,
  LiteralLike,
  QuadLike,
  DefaultGraphLike,
  VariableLike,
  DefaultDataFactory, isQuad, isQuadLike
} from "@opennetwork/rdf-data-model";
import * as rdf from "@opennetwork/rdf-data-model";

export const NamedNodeSymbol = Symbol.for("NamedNode");
export type NamedNodeTokenFn = TokenVNodeFn<typeof NamedNodeSymbol, NamedNodeLike, Pick<NamedNodeLike, "termType">>;
export type NamedNodeToken = TokenVNodeBase<typeof NamedNodeSymbol, NamedNodeLike>;
export const NamedNode: NamedNodeTokenFn = createToken(NamedNodeSymbol, {
  termType: "NamedNode"
});

export const BlankNodeSymbol = Symbol.for("BlankNode");
export type BlankNodeTokenFn = TokenVNodeFn<typeof BlankNodeSymbol, BlankNodeLike, Pick<BlankNodeLike, "termType">>;
export type BlankNodeToken = TokenVNodeBase<typeof BlankNodeSymbol, BlankNodeLike>;
export const BlankNode: BlankNodeTokenFn = createToken(BlankNodeSymbol, {
  termType: "BlankNode"
});

export const LiteralSymbol = Symbol.for("Literal");
export type LiteralTokenFn = TokenVNodeFn<typeof LiteralSymbol, LiteralLike, Pick<LiteralLike, "termType" | "language" | "datatype">>;
export type LiteralToken = TokenVNodeBase<typeof LiteralSymbol, LiteralLike>;
export const Literal: LiteralTokenFn = createToken(LiteralSymbol, {
  termType: "Literal",
  ...DefaultDataFactory.literal("")
});

export const QuadSymbol = Symbol.for("Quad");
export type QuadTokenFn = TokenVNodeFn<typeof QuadSymbol, QuadLike>;
export type QuadToken = TokenVNodeBase<typeof QuadSymbol, QuadLike>;
export type QuadInstanceToken = TokenVNodeBase<typeof QuadSymbol, QuadLike, QuadLike>;
export const Quad: QuadTokenFn = createToken(QuadSymbol, {});
export const Triple: QuadTokenFn = createToken(QuadSymbol, {
  termType: "Quad",
  value: "",
});

export function isQuadInstanceToken(token: QuadToken): token is QuadInstanceToken {
  return isQuadLike(token.options);
}

export function assertQuadInstanceToken(token: QuadToken): asserts token is QuadInstanceToken {
  if (!isQuadInstanceToken(token)) {
    throw new Error("Expected QuadInstanceToken");
  }
}

export const DefaultGraphSymbol = Symbol.for("@virtualstate/examples/DefaultGraph");
export type DefaultGraphTokenFn = TokenVNodeFn<typeof DefaultGraphSymbol, DefaultGraphLike, Pick<DefaultGraphLike, "termType" | "value">>;
export type DefaultGraphToken = TokenVNodeBase<typeof DefaultGraphSymbol, DefaultGraphLike>;
export const DefaultGraph: DefaultGraphTokenFn = createToken(DefaultGraphSymbol, {
  termType: "DefaultGraph",
  value: ""
});

export const VariableSymbol = Symbol.for("@virtualstate/examples/Variable");
export type VariableTokenFn = TokenVNodeFn<typeof VariableSymbol, VariableLike, Pick<VariableLike, "termType">>;
export type VariableToken = TokenVNodeBase<typeof VariableSymbol, VariableLike>;
export const Variable: VariableTokenFn = createToken(VariableSymbol, {
  termType: "Variable"
});
