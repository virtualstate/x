import type { DOMVContext, DOMHydrateEvent } from "./context";
import {
  isMarshalledSourceReference,
  marshal,
  MarshalledSourceReference,
  SourceReference,
  Tree
} from "@virtualstate/fringe";

export interface TimelineItem<HydrationEvent = DOMHydrateEvent> {
  hydration: HydrationEvent[];
  timeOrigin?: number;
  now: number;
  start: number;
}

export type Timeline = TimelineItem[];

export interface PerformanceProvider {
  now(): number;
  timeOrigin: number;
}

export async function createTimeline(context: DOMVContext, onUpdate?: (timeline: Timeline) => Promise<void>, givenPerformance?: PerformanceProvider): Promise<Timeline> {
  let currentTimeline: TimelineItem[] = [];
  const importedPerformance = await getPerformance();
  const start = importedPerformance.now();
  const timeOrigin = importedPerformance.timeOrigin;
  for await (const nextEvents of context.events.hydrate) {
    const item: TimelineItem = {
      hydration: nextEvents,
      timeOrigin,
      start,
      now: importedPerformance.now()
    };
    currentTimeline = currentTimeline.concat(item);
    await onUpdate?.(currentTimeline);
  }
  return currentTimeline;

  async function getPerformance(): Promise<PerformanceProvider> {
    if (givenPerformance) {
      return givenPerformance;
    } else if (typeof performance !== "undefined") {
      return performance;
    }
    const timeOrigin = Date.now();
    return {
      timeOrigin,
      now() {
        return Date.now() - timeOrigin;
      }
    };
  }
}

export type MarshalledReferenceMap = Map<SourceReference, MarshalledSourceReference>;

export async function marshalTimeline(timeline: Timeline, getReferenceExternal?: (reference: SourceReference) => MarshalledSourceReference): Promise<TimelineItem<unknown>[]> {
  const referenceMap: MarshalledReferenceMap = new Map();
  return await Promise.all(
    timeline.map(item => marshalTimelineItem(item, referenceMap, getReferenceExternal))
  );
}

export async function marshalTimelineItem(item: TimelineItem, referenceMap: MarshalledReferenceMap = new Map(), getReferenceExternal?: (reference: SourceReference) => MarshalledSourceReference): Promise<TimelineItem<unknown>> {
  let index = 0;

  const marshalledHydration = (
    await Promise.all(
      item.hydration.map(async (event) => ({
        ...event,
        node: await marshal({
          ...event.node,
          // Not marshalling children to
          children: undefined
        }, undefined, getReference)
      }))
    )
  )
    .map(event => ({
      ...event,
      tree: getTree(event.tree)
    }));

  return {
    ...item,
    hydration: marshalledHydration
  };

  function getTree(tree?: Tree): Tree | undefined {
    if (!tree) {
      return undefined;
    }
    return {
      ...tree,
      children: tree.children.map(reference => getReference(undefined, reference)),
      reference: getReference(undefined, tree.reference),
      parent: tree.parent ? getTree(tree.parent) : undefined,
    };
  }

  function getReference(parent: unknown, reference: SourceReference): MarshalledSourceReference {
    if (isMarshalledSourceReference(reference)) {
      return reference;
    }
    if (typeof reference === "undefined") {
      return reference;
    }
    const existingReference = referenceMap.get(reference);
    if (existingReference) {
      return existingReference;
    }
    const currentIndex = index += 1;
    const marshalledReference = getReferenceExternal?.(reference) ?? `tl:${currentIndex}`;
    referenceMap.set(reference, marshalledReference);
    return marshalledReference;
  }
}
