// @abstract
import {hmm} from "./hmm";
import {VNode} from "@virtualstate/fringe";

export const DoneSymbol = Symbol("Done");

export interface Context extends Record<string, unknown>  {
  globalThing: unknown;
}

export const DefaultContext: Context = {
  globalThing: 0
};

export interface State extends Record<string, unknown> {
  currentThing: number;
  updatedAt: number;
  [DoneSymbol]?: boolean;
}

export interface SourceVNode<Source> extends VNode {
  source: Source;
}

function noop(): void {
  return undefined;
}

export function useState<S>(defaultState: S, state?: SourceVNode<S>): [S, (state: S) => void] {
  if (state) {
    return [state.source, noop];
  }
  return [
    defaultState ?? hmm["👀"](),
    noop
  ];
}

export interface AsyncFunction<T, Args extends unknown[] = never[]> {
  (...Args): Promise<T>
}

export type MaybeAsyncFunction<T, Args extends unknown[] = never[]> = ((...Args) => T) | AsyncFunction<T, Args>;

export function useEffect(input: MaybeAsyncFunction<void | MaybeAsyncFunction<void>>, ...watch: unknown[]): void;
export function useEffect(): void {

}

export function useContext(): Context {
  return DefaultContext ?? hmm["👀"]();
}

export interface ReferenceState {
  references: { current: unknown }[];
  index: number;
}

export function useRef<T>(value: T): { current: T } {
  const [state] = useState<ReferenceState>({
    references: [],
    index: -1
  });
  const index = state.index = state.index + 1;
  const references = state.references;
  if (isIndexedReference(references)) {
    return references[index];
  } else {
    return references[index] = { current: value };
  }
  function isIndexedReference(value: object): value is Record<typeof index, { current: T }> {
    return !!value[index];
  }
}
