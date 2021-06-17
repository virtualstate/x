import { createFragment, isTokenVNode, isVNode, VNode } from "@virtualstate/fringe";
import { read, ReadOptions, VNodeSource } from "./read";

type DomainMap<T extends VNodeSource> = Map<T["source"], Set<T>>;

export interface StoreOptions<T extends VNodeSource> extends ReadOptions<T> {
  defaults?: DomainMap<T>;
}

export const Delivery = Symbol("📦");

export class Store<T extends VNodeSource> {

  #options: StoreOptions<T>;
  #domainSources: unknown[];
  #domainTokens: ReadonlyArray<T>;
  #domain: DomainMap<T> | undefined = undefined;
  #state: VNode;

  constructor(options: StoreOptions<T>, state?: VNode) {
    this.#options = options;
    this.#state = state || createFragment({});
    this.#domainTokens = Object.freeze([...options.domain]);
    this.#domainSources = this.#domainTokens.map(token => token.source);
  }

  #isDomainSource = (value: unknown): value is T["source"] => {
    return this.#domainSources.includes(value);
  }

  #isDomainToken = (value: unknown): value is VNode & T => {
    if (!isVNode(value)) return false;
    if (!this.#isDomainSource(value.source)) return false;
    const found = this.#domainTokens.find(token => token.source === value.source);
    if (!isTokenVNode(found)) {
      throw new Error("Please report this bug, store should have the dimai")
    }
    return found.is(value);
  }

  get(key: T["source"] | T): Set<T> {
    if (this.#isDomainToken(key)) {
      return this.get(key.source);
    } else {
      return this.#domain?.get(key) ?? new Set();
    }
  }

  async *[Symbol.asyncIterator]() {
    for await (const children of this.#state.children) {
      const nextDomain: DomainMap<T> = new Map();
      for await (const child of read(this.#options, this.#state)) {
        const currentArray = nextDomain.get(child.source);
        const array: Set<T> = currentArray ?? new Set();
        array.add(child);
        if (!currentArray) {
          nextDomain.set(child.source, array);
        }
      }
      this.#domain = nextDomain;
      yield {
        reference: Delivery,
        source: nextDomain
      };
    }
  }

}
