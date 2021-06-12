import {VNode} from "@virtualstate/fringe";

export interface VNodeSource {
  source: unknown
}

export interface ReadOptions<T extends VNodeSource> {
  domain: T[]
  visit?: T[];
}

export async function *read<T extends VNodeSource>(options: ReadOptions<T>, state?: VNode): AsyncIterable<T> {
  if (!state) return;
  const children = state.children;
  if (!children) return;
  const domainSources = options.domain.map(value => value.source);
  const domainVisit = options.visit?.map(value => value.source) ?? domainSources;
  for await (const update of children) {
    const matching = update.filter(isInDomain);
    yield * matching;
    const visit = matching.filter(isInDomainVisit);
    for (const next of visit) {
      yield * read(options, next);
    }
  }

  function isInDomain(value: VNode): value is VNode & T {
    return domainSources.includes(value.source);
  }

  function isInDomainVisit(value: T): boolean {
    return domainVisit.includes(value.source);
  }
}
