// @abstract
import {hmm} from "./hmm";

export interface Context {
  globalThing: unknown;
}

export interface State {
  currentThing: number;
}


export function useStateSelector(defaultState?: State): State {
  return defaultState ?? hmm["👀"]();
}

export function useStateSetter(): (state: State) => Promise<void> {
  return () => Promise.resolve();
}

export function useState(defaultState?: State): [State, ReturnType<typeof useStateSetter>] {
  return [
    useStateSelector(defaultState),
    useStateSetter()
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
  return hmm["👀"]();
}

export function useRef<T>(value: T): { current: T } {
  return { current: value };
}

