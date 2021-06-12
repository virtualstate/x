import {VNode} from "@virtualstate/fringe";

export interface VNodeSource extends VNode {
  source: unknown
}

export interface ReadOptions<T extends VNodeSource> {
  domain: T[];
  visit?: T[];
  final?: boolean;
}

export async function *read<T extends VNodeSource>(options: ReadOptions<T>, state?: VNode): AsyncIterable<T> {
  if (!state) return;
  const children = state.children;
  if (!children) return;
  const domainSources = options.domain.map(value => value.source);
  const domainVisit = options.visit?.map(value => value.source) ?? domainSources;
  let latest: T[] = [];
  for await (const update of children) {
    latest = update.filter(isInDomain);
    if (options.final) continue;
    yield * yieldLatest();
  }
  if (options.final) yield * yieldLatest();

  async function *yieldLatest() {
    yield * latest;
    const visit = latest.filter(isInDomainVisit);
    for (const next of visit) {
      yield * read(options, next);
    }
  }

  function isInDomain(value: VNode): value is T {
    return domainSources.includes(value.source);
  }

  function isInDomainVisit(value: T): boolean {
    return domainVisit.includes(value.source);
  }
}
