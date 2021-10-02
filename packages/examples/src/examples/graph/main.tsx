import {h, createToken} from "@virtualstate/fringe";
import { NamedNode, Quad, Literal, DefaultGraph, Variable, DefaultGraphToken, LiteralToken, QuadToken, VariableToken, NamedNodeToken, BlankNodeToken, Triple } from "./tokens";

export const GraphSymbol = Symbol("Graph");
export const Graph = createToken(GraphSymbol);


const domainMap = {
  Graph,
  NamedNode,
  Quad,
  Triple,
  Literal,
  DefaultGraph,
  Variable
}

type DomainTokenMap = typeof domainMap;
export type DomainToken =
  | DomainTokenMap[keyof DomainTokenMap]
  | DefaultGraphToken
  | VariableToken
  | NamedNodeToken
  | LiteralToken
  | QuadToken
  | BlankNodeToken;

export const Domain: DomainToken[] = [
  ...Object.values(domainMap)
];

export const MainGraph = (
  <Graph>
    <Quad>
      <NamedNode value="value" />
      <NamedNode value="name" />
      <Literal value="main" />
    </Quad>
    <Quad>
      <NamedNode value="value" />
      <NamedNode value="version" />
      <Literal value="1.0.0" />
    </Quad>
  </Graph>
)
