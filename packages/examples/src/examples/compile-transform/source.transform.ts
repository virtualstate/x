import {Context, SourceVNode, State, DoneSymbol} from "./source.interface";
import {VNode} from "@virtualstate/fringe";

export const SourceURLSymbol = Symbol("Source URL");
export const SourceInterfaceURLSymbol = Symbol("SourceInterface URL");
export const SourceInterfaceSymbol = Symbol("Source Interface");
export const SourceSymbol = Symbol("Source");
export const StateSymbol = Symbol("State");

export {
  DoneSymbol
}

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
  [SourceInterfaceURLSymbol]: string;
  [SourceInterfaceSymbol]: string;
  [SourceSymbol]: string;
}

export async function *Transform(context: TransformContext, container?: SourceVNode<State>): AsyncIterable<SourceVNode<State>> {

  // console.log({
  //   context,
  //   state: container?.source,
  // });

  if (!container) {
    // console.log("Yielding!");
    return yield createState(container?.source ?? {
      currentThing: 1,
      step: "default state",
      updatedAt: Date.now()
    });
  }

  const { source: state } = container;

  const timeSince = Date.now() - container.source.updatedAt

  if (timeSince > 1000) {
    yield createState({
      currentThing: state.currentThing + 1,
      step: "time since changed past 1000",
      updatedAt: Date.now()
    });
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  if (state.currentThing > 3) {
    yield createState({
      ...state,
      step: "done",
      [DoneSymbol]: true
    })
  }

  //
  // console.log({
  //   context,
  //   state: container?.source,
  // });

  // console.log("Done!");

}
