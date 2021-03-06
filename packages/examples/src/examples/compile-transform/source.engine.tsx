import {DefaultContext, DoneSymbol, SourceVNode, State} from "./source.interface";
import {
  Transform,
  SourceURLSymbol,
  isStateVNode,
  SourceSymbol,
  SourceInterfaceURLSymbol,
  SourceInterfaceSymbol
} from "./source.transform";
import {h, VNode} from "@virtualstate/fringe";

export {
  SourceURLSymbol,
  SourceSymbol,
  SourceInterfaceSymbol,
  SourceInterfaceURLSymbol
}

export const AbortSignalSymbol = Symbol("Abort Signal");
export const EngineURLSymbol = Symbol("Engine URL");
export const EngineURL = import.meta.url;

export interface EngineOptions {
  [SourceURLSymbol]: string;
  [SourceInterfaceURLSymbol]: string;
  [EngineURLSymbol]: string;
  [SourceSymbol]: string;
  [SourceInterfaceSymbol]: string;
  [AbortSignalSymbol]?: AbortSignal
  signal?: AbortSignal
}

export async function *Engine(options: EngineOptions, defaultState?: VNode) {

  let state: SourceVNode<State> | undefined = isStateVNode(defaultState) ? defaultState : undefined;
  const abortSignal = options[AbortSignalSymbol] ?? options.signal;
  let transformState: VNode,
    transformStateIterator,
    transformStateIteratorPromise,
    transformStateValue,
    transformStateYielded = false;
  console.log({ abortSignal });

  const onAborted = abortSignal ? new Promise(resolve => {
    abortSignal.addEventListener("abort", () => {
      console.log("Abort Signal!", { abortSignal });
      resolve(abortSignal);
    }, { once: true });
  }) : undefined;

  do {
    transformState = transformState || h(
      // Directly invoke
      Transform(
        {
          ...DefaultContext,
          ...options
        },
        state
      )
    );
    transformStateIterator = transformStateIterator || transformState.children[Symbol.asyncIterator]();
    transformStateIteratorPromise = transformStateIterator.next()
    if (onAborted) {
      const nextStep = await Promise.any([
        transformStateIteratorPromise,
        onAborted
      ]);
      if (nextStep === abortSignal) {
        break;
      }
    }
    transformStateValue = await transformStateIteratorPromise;
    transformStateIteratorPromise = undefined;

    const {
      value: children,
      done
    } = transformStateValue;

    if (!children || done) {
      transformState = undefined;
      await transformStateIterator?.return();
      transformStateIterator = undefined;
      if (!children && !done) {
        throw new Error("Received no values with done === false");
      }
      continue;
    }

    const [nextState, ...rest] = children.filter(isStateVNode);
    if (!nextState || rest.length) {
      throw new Error("Not Implemented: Expected a single available state");
    }

    yield nextState;

    // This creates a container that can be referenced, yet it is mutating across yields
    state = Object.assign(state || {}, nextState);

    transformStateYielded = true;

    if (state.source[DoneSymbol]) {
      break;
    }

    await new Promise<void>(queueMicrotask);
  } while (
    abortSignal ?
      !abortSignal.aborted :
      transformStateValue ?
        transformStateValue.done === false : true
  );

  console.log({ abortSignal });

  await transformStateIterator?.return();
//
//   console.log("Engine complete", {
//     state: state?.source,
//     yielded: transformStateYielded
//   });
}
