import {Domain, Graph, MainGraph, DomainToken} from "./main";
import {Store} from "../../examples/experiments/store";
import {h, VNode, Instance, createFragment} from "@virtualstate/fringe"
import {Quad, QuadToken} from "./tokens";
import * as rdf from "@opennetwork/rdf-data-model";
import {
  DefaultDataFactory,
  isQuadGraph, isQuadGraphLike,
  isQuadObjectLike,
  isQuadPredicateLike,
  isQuadSubject,
  isQuadSubjectLike, NamedNode,
  QuadLike
} from "@opennetwork/rdf-data-model";

export const _G0001_Graph = MainGraph;
export const _G0001_URL = import.meta.url;

export async function *_G0002_GraphStoreRead() {


  const store: VNode & { [Instance]?: Store<DomainToken> } = (
    <Store domain={Domain} visit={[Graph, Quad]}>
      {MainGraph}
    </Store>
  );

  await getState(store);

  yield await Promise.all(
    [...store[Instance]?.get(Quad)]
      .filter(Quad.is)
      .map(async token => (
        <>
          {JSON.stringify({
            ...(await quad(token, await parse(await getState(token))))
          })}
        </>
      ))
  );

}
export const _G0002_GraphStore = <_G0002_GraphStoreRead />
export const _G0002_URL = import.meta.url;


async function getState(node: VNode) {
  // Assume a node will complete and provide state as its final
  const iterator = node.children?.[Symbol.asyncIterator]?.();
  let final: VNode[] = [];
  let result: IteratorResult<VNode[]>;
  do {
    result = await iterator.next();
    final = result.value ?? final;
  } while(!result.done);
  return final;
}

type Parsed = (rdf.Quad | ReturnType<rdf.DataFactory["fromTerm"]>);

async function parse(state: VNode[]): Promise<Parsed[]> {
  return Promise.all(
    state.map(
      async (node): Promise<Parsed> => {
        if (Quad.is(node)) {
          return quad(node, await parse(await getState(node)))
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
  const options: Partial<QuadLike> = {
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
  return DefaultDataFactory.fromQuad(options);
}
