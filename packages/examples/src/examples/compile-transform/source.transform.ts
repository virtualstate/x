import {Context, SourceVNode, State} from "./source.interface";
import {VNode} from "@virtualstate/fringe";

export const SourceURLSymbol = Symbol("Source URL");
export const SourceSymbol = Symbol("Source");
export const StateSymbol = Symbol("State");

export function isStateVNode(value: VNode): value is SourceVNode<State> {
  return value?.reference === StateSymbol;
}

function createState(source: State): SourceVNode<State> {
  return {
    reference: StateSymbol,
    source
  };
}

export interface TransformContext extends Context {
  [SourceURLSymbol]: string;
  [SourceSymbol]: string;
}

export async function *Transform(context: TransformContext, container?: SourceVNode<State>): AsyncIterable<SourceVNode<State>> {

  console.log({
    context,
    state: container?.source,
  });

  if (!container) {
    console.log("Yielding!");
    yield createState(container?.source ?? {
      currentThing: 1,
      step: "default state"
    });
  }

  console.log({
    context,
    state: container?.source,
  });

  console.log("Done!");

}
