import {createFragment, isScalarVNode, ScalarVNode, SourceReference, VNode} from "@virtualstate/fringe";
import { h } from "../../jsx";

type VectorMap = Map<SourceReference, VectorMap>;

export interface CompactOptions {
  min?: number
  shouldBreak?(scalars: ScalarVNode[], vector: SourceReference[], known: VectorMap): boolean;
}

export async function *Compact({ min = 1, shouldBreak }: CompactOptions, state?: VNode) {
  const children = state?.children;
  if (!children) return;
  const known: VectorMap = new Map();
  const seen = new WeakSet();
  for await (const scalars of children) {

    assertScalars(scalars);


    if (scalars.every(node => seen.has(node))) {
      continue;
    }

    for (const scalar of scalars) {
      seen.add(scalar);
    }

    const vector = scalars.map(node => node.source);
    if (vector.length < min) {
      continue;
    }
    if (hasVector(vector)) {
      if (shouldBreak) {
        if (shouldBreak(scalars, vector, known)) {
          break;
        }
      } else {
        break;
      }
    }
    yield createFragment(undefined, scalars);
    addVector(vector);
  }

  function addVector(vector: SourceReference[], map = known) {
    const currentVectorMap = map.get(vector[0]);
    const vectorMap: VectorMap = currentVectorMap ?? new Map();
    if (!currentVectorMap) {
      map.set(vector[0], vectorMap);
    }
    if (vector.length === 1) {
      return;
    }
    return addVector(vector.slice(1), vectorMap);
  }

  function hasVector(vector: SourceReference[], map = known) {
    if (!map.has(vector[0])) {
      return false;
    }
    if (vector.length === 1) {
      return true;
    }
    return hasVector(vector.slice(1), map.get(vector[0]));
  }

  function assertScalars(nodes: VNode[]): asserts nodes is ScalarVNode[] {
    for (const node of nodes) {
      assertScalar(node);
    }
  }

  function assertScalar(node: VNode): asserts node is ScalarVNode {
    if (!isScalarVNode(node)) {
      throw new Error("Expected scalar children");
    }
  }
}

const StaticThing1 = Symbol("Thing1");
const StaticThing2 = Symbol("Thing2");
const StaticThing3 = Symbol("Thing3");
const StaticThing4 = Symbol("Thing4");

function *Loop() {
  yield createFragment({}, [StaticThing1, StaticThing2, StaticThing3]);
  yield createFragment({}, [StaticThing2, StaticThing3, StaticThing1]);
  yield createFragment({}, [StaticThing3, StaticThing1, StaticThing2]);
  yield createFragment({}, [StaticThing4, StaticThing1, StaticThing2]);
  yield createFragment({}, [StaticThing4, StaticThing1, StaticThing3]);
  yield createFragment({}, [StaticThing4, StaticThing3, StaticThing2]);
  yield <Loop />
}

export const _E0001_Compact = (
  <container>
    <Compact min={3}>
      <Loop />
    </Compact>
  </container>
)
