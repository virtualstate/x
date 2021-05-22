import { asAsync, Input } from "./async";
import { deferred } from "./deferred";
import { defaultTask, QueueTask } from "./microtask";
import { aggregateError } from "./aggregate-error";
import { isReuse } from "./reuse";

export interface UnionOptions {
  queueTask?: QueueTask;
  queueMicrotask?: QueueTask;
  reuseInFlight?: boolean;
  // Start initial task before iteration of iterators
  eagerInitialTask?: boolean;
}

export interface AsyncIteratorSetResult<T> {
  done: boolean;
  value?: T;
  initialIteration: symbol;
  resolvedIteration?: symbol;
  iterator: AsyncIterator<T>;
  promise?: unknown;
}

export type UnionInput<T> = Input<Input<T>>;

type IterationFlag = symbol;

const NextMicrotask = Symbol();

function map<T, O>(iterable: Iterable<T>, map: (input: T) => O): O[] {
  return [...doMap()];
  function *doMap() {
    for (const value of iterable) {
      yield map(value);
    }
  }
}

function filter<T>(iterable: Iterable<T>, filter: (input: T) => unknown): T[] {
  return [...doFilter()];
  function *doFilter() {
    for (const value of iterable) {
      if (filter(value)) yield value;
    }
  }
}

export async function *union<T>(source: UnionInput<T>, options: UnionOptions = {}): AsyncIterable<(T | undefined)[]> {
  const task = options.queueTask || options.queueMicrotask || defaultTask;
  const states = new Map<AsyncIterator<T>, AsyncIteratorSetResult<T>>();
  const inFlight = new Map<AsyncIterator<T>, Promise<AsyncIteratorSetResult<T> | undefined>>();
  const iterators = new WeakMap<Input<T>, AsyncIterator<T>>();
  const knownIterators: AsyncIterator<T>[] = [];
  let iteratorsDone = false;
  let valuesDone = false;
  const sourceIterator: AsyncIterator<Input<T>> = asAsync(source)[Symbol.asyncIterator]();
  let active: IterationFlag | undefined = undefined;
  let iteratorsPromise: Promise<void> = Promise.resolve();
  let iteratorAvailable = deferred<AsyncIterator<T> | undefined>();
  const iteratorsComplete = deferred();
  const errorOccurred = deferred();
  const errors: unknown[] = [];
  let results: AsyncIteratorSetResult<T>[] = [];

  let currentTaskPromise: Promise<unknown> | undefined;

  if (options.eagerInitialTask) {
    nextTask();
  }

  let skipTaskDueToEmptyYield = false;

  try {
    cycle: do {
      const iteration: IterationFlag = active = Symbol();

      iteratorsPromise = iteratorsPromise.then(() => nextLanes(iteration));

      if (!knownIterators.length) {
        await Promise.any<unknown>([
          iteratorAvailable.promise,
          iteratorsComplete.promise
        ]);
        if (valuesDone) {
          // Had no lanes
          break;
        }
      }

      const updated = await waitForResult(iteration);

      if (errors.length) {
        break;
      }

      for (const result of updated) {
        const { iterator, promise } = result;
        const currentPromise: unknown = inFlight.get(iterator);
        if (promise !== currentPromise) {
          onError(new Error("Unexpected promise state"));
          break cycle;
        }
        inFlight.set(iterator, undefined);
        states.set(iterator, {
          ...result,
          value: result.done ? states.get(iterator)?.value : result.value,
          resolvedIteration: iteration
        });
      }

      const finalResults = map(knownIterators, read);

      valuesDone = iteratorsDone && finalResults.every(result => result?.done);

      const onlyDone = !!updated.every(result => result.done);

      // Don't yield only done because the consumer already has received all these values
      if (onlyDone) {
        continue;
      }

      if (!valuesDone) {
        yield finalResults.map(result => result?.value);
      }

    } while (!valuesDone);
  } catch (error) {
    onError(error);
  } finally {
    active = undefined;
    await sourceIterator.return?.();
  }

  if (errors.length) {
    throw aggregateError(errors);
  }

  function read(iterator: AsyncIterator<T>): AsyncIteratorSetResult<T> | undefined {
    return states.get(iterator);
  }

  async function nextLanes(iteration: IterationFlag) {
    while (active === iteration && !iteratorsDone) {
      const result: IteratorResult<Input<T>> = await sourceIterator.next();
      if (!isIteratorYieldResult(result)) {
        iteratorsDone = true;
        if (!knownIterators.length) {
          valuesDone = true;
        }
        iteratorsComplete.resolve();
        await sourceIterator.return?.();
      } else if (result.value) {
        const sourceLane = result.value;
        const iterator = getIterator(sourceLane);
        if (options.reuseInFlight || isReuse(sourceLane)) {
          iterators.set(sourceLane, iterator);
        }
        knownIterators.push(iterator);
        iteratorAvailable.resolve(iterator);
        iteratorAvailable = deferred();
      }
    }

    function getIterator(sourceLane: Input<T>) {
      if (options.reuseInFlight || isReuse(sourceLane)) {
        const currentIterator = iterators.get(sourceLane);
        if (currentIterator) {
          const state = read(currentIterator);
          if (state?.done !== true) {
            // reuse
            return currentIterator;
          }
        }
      }
      return asAsync<T>(sourceLane)[Symbol.asyncIterator]();
    }

    function isIteratorYieldResult<T>(result: IteratorResult<T>): result is IteratorYieldResult<T> {
      return !result.done;
    }
  }

  async function waitForResult(iteration: IterationFlag, emptyDepth: number = 0): Promise<AsyncIteratorSetResult<T>[]> {
    if (iteration !== active) {
      // Early exit if we actually aren't iterating this any more
      // I don't think this can actually trigger, but lets keep it around
      return [];
    }

    if (iteratorsDone && !knownIterators.length) {
      // No lanes to do anything, exit
      return [];
    }

    if (errors.length) {
      // We have a problem, exit
      return [];
    }

    const pendingIterators = filter(knownIterators, iterator => !read(iterator)?.done);

    // Grab onto this promise early so we don't miss one
    const nextIterator = iteratorAvailable.promise;

    if (!pendingIterators.length) {
      await nextIterator;
      return waitForResult(iteration);
    }

    const currentResults = await wait();

    if (!currentResults.length) {
      if (emptyDepth > 10000) {
        throw new Error("Empty depth over 10000");
      }
      // We have a new lane available, lets loop around and initialise its promise
      return waitForResult(iteration, emptyDepth + 1);
    }

    return currentResults;

    async function wait(): Promise<AsyncIteratorSetResult<T>[]> {
      const promises = pendingIterators.map(next);

      let anyPromises: Promise<unknown>;

      const waitForAtLeast: Promise<unknown>[] = [
        currentTaskPromise,
        // Every iterator returned a result before the end of the task
        Promise.all(promises),
        // Early exit on any errors
        errorOccurred.promise,
        // We will be able to set up again next loop
        iteratorAvailable.promise
      ]

      if (!skipTaskDueToEmptyYield && !currentTaskPromise) {
        // We didn't just run a task, and we have no pending next task
        nextTask();
      }

      if (currentTaskPromise) {
        // The current task finished and we should yield at least one result
        waitForAtLeast.push(currentTaskPromise);
      } else {
        // If we are no waiting for a task, we are waiting for at least one result
        anyPromises = Promise.any(promises);
        waitForAtLeast.push(anyPromises)
      }

      const reason = await Promise.any<unknown>(waitForAtLeast);

      if (reason === NextMicrotask) {
        currentTaskPromise = undefined;
        if (!results.length) {
          skipTaskDueToEmptyYield = true;
        }
      }

      if (!results.length) {
        await Promise.any<unknown>([
          // We must wait for at least one result
          anyPromises || Promise.any(promises),
          // Or if there is a new iterator available, this iterator could
          // potentially produce a result before all others
          iteratorAvailable.promise,
          errorOccurred.promise
        ]);
      }

      if (errors.length) {
        return [];
      }

      if (!results.length) {
        return [];
      }
      // Clone so that it only uses the values we have now
      const cloned = [...results];
      // Clear to start again
      results = [];
      return cloned;
    }

    async function next(iterator: AsyncIterator<T>) {
      const current = inFlight.get(iterator);
      if (current) return current;
      const next = iterator.next()
        .then((result): AsyncIteratorSetResult<T> => ({
            value: result.value,
            done: !!result.done,
            initialIteration: iteration,
            iterator,
            promise: next
        }))
        .catch((localError): AsyncIteratorSetResult<T> => {
          onError(localError);
          return {
            value: undefined,
            done: true,
            initialIteration: iteration,
            iterator,
            promise: next
          };
        })
        .then((result) => {
          results.push(result);
          return result;
        });
      inFlight.set(iterator, next);
      return next;
    }
  }

  function onError(error: unknown) {
    errors.push(error);
    errorOccurred.resolve();
  }

  function nextTask() {
    currentTaskPromise = new Promise<void>(task).then(() => NextMicrotask);
  }
}
