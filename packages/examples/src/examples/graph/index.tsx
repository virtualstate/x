import {Domain, Graph, MainGraph, DomainToken} from "./main";
import {Store} from "../../examples/experiments/store";
import {h, VNode, Instance, PromiseVNode} from "@virtualstate/fringe"
import {
  assertQuadInstanceToken,
  BlankNode,
  DefaultGraph,
  Literal,
  NamedNode,
  Quad,
  QuadInstanceToken,
  QuadToken,
  Variable
} from "./tokens";
import * as rdf from "@opennetwork/rdf-data-model";
import {
  DefaultDataFactory,
  isQuadGraphLike,
  isQuadLike,
  isQuadObjectLike,
  isQuadPredicateLike,
  isQuadSubjectLike,
  QuadLike
} from "@opennetwork/rdf-data-model";
import {then} from "@virtualstate/fringe";

export const _G0001_Graph = MainGraph;
export const _G0001_URL = import.meta.url;

export async function *_G0002_GraphStoreRead(): AsyncIterable<QuadInstanceToken[]> {
  const store: VNode & { [Instance]?: Store<DomainToken> } = (
    <Store domain={Domain} visit={[Graph, Quad]}>
      {MainGraph}
    </Store>
  );

  await getState(store);

  yield await Promise.all(
    [...store[Instance]?.get(Quad)]
      .filter(Quad.is)
      .map(async (input): Promise<QuadInstanceToken> => {
        const instance: rdf.Quad = await quad(input, await parse(await getState(input)));
        const frozen: Readonly<rdf.Quad> = Object.freeze(instance);
        const token = Quad(frozen);
        assertQuadInstanceToken(token);
        return token;
      })
  );
}
export const _G0002_GraphStore = <_G0002_GraphStoreRead />
export const _G0002_URL = import.meta.url;

async function getState(node: VNode) {
  return new Promise<VNode[]>(then.bind(node));
}

type Parsed = (rdf.Quad | ReturnType<rdf.DataFactory["fromTerm"]>);

async function parse(state: VNode[]): Promise<Parsed[]> {
  return Promise.all(
    state.map(
      async (node): Promise<Parsed> => {
        if (Quad.is(node)) {
          return quad(node, await parse(await getState(node)))
        }
        if (NamedNode.is(node)) {
          return DefaultDataFactory.namedNode(node.options.value);
        }
        if (BlankNode.is(node)) {
          return DefaultDataFactory.blankNode(node.options.value);
        }
        if (DefaultGraph.is(node)) {
          return DefaultDataFactory.defaultGraph();
        }
        if (Literal.is(node)) {
          return new rdf.Literal(
            node.options.value,
            node.options.language,
            DefaultDataFactory.fromTerm(node.options.datatype)
          );
        }
        if (Variable.is(node)) {
          return DefaultDataFactory.variable(node.options.value);
        }
        return rdf.DefaultDataFactory.fromTerm(node.options);
      }
    )
  )
}
async function quad(token: QuadToken, terms: Parsed[]): Promise<rdf.Quad> {
  const [
    subject,
    predicate,
    object,
    graph
  ] = terms;
  const options: Partial<Record<keyof QuadLike, unknown>> = {
    termType: "Quad",
    value: "",
    graph: new rdf.DefaultGraph(),
    ...token.options
  };
  if (isQuadSubjectLike(subject)) {
    options.subject = subject;
    if (isQuadPredicateLike(predicate)) {
      options.predicate = predicate;
      if (isQuadObjectLike(object)) {
        options.object = object;
        if (isQuadGraphLike(graph)) {
          options.graph = graph;
        } else if (graph) {
          throw new Error("Graph is not valid");
        }
      } else if (object) {
        throw new Error("Object is not valid");
      }
    } else if (predicate) {
      throw new Error("Predicate is not valid");
    }
  } else if (subject) {
    throw new Error("Subject is not valid");
  }
  if (!isQuadLike(options)) {
    throw new Error("Quad is not valid");
  }
  return DefaultDataFactory.fromTerm(options);
}
