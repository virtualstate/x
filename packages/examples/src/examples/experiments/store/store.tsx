import {
  createFragment,
  isSourceReference, isTokenVNode,
  SourceReference,
  TokenVNodeBase,
  TokenVNodeFn,
  VNode
} from "@virtualstate/fringe";
import {extendedIterable} from "iterable";

type StoreToken = Pick<TokenVNodeBase | TokenVNodeFn, "source" | "options">

type DomainMap<T extends StoreToken> = Map<T["source"], TokenVNodeBase<T["source"], T["options"]>[]>;
type ReadonlyDomainMap<T extends StoreToken> = Map<T["source"], ReadonlyArray<TokenVNodeBase<T["source"], T["options"]>>>;

export interface StoreOptions<T extends StoreToken> {
  domain: T[];
  defaults?: ReadonlyDomainMap<T>;
}

export const Delivery = Symbol("📦");

export class Store<T extends StoreToken> {

  #options: StoreOptions<T>;
  #domainSources: unknown[];
  #domainTokens: ReadonlyArray<T>;
  #domain: ReadonlyDomainMap<T> | undefined = undefined;
  #state: VNode;

  constructor(options: StoreOptions<T>, state?: VNode) {
    this.#options = options;
    this.#state = state || createFragment({});
    this.#domainTokens = Object.freeze([...options.domain]);
    this.#domainSources = this.#domainTokens.map(token => token.source);
  }

  #isDomainSource(value: unknown): value is T["source"] {
    return this.#domainSources.includes(value);
  }

  #isDomainToken(value: VNode): value is TokenVNodeBase<T["source"], T["options"]> {
    if (!this.#isDomainSource(value.source)) return false;
    const found = this.#domainTokens.find(token => token.source === value.source);
    if (!isTokenVNode(found)) {
      throw new Error("Please report this bug, store should have the dimai")
    }
    return found.is(value);
  }

  get(key: T["source"] | T): ReadonlyArray<TokenVNodeBase<T["source"], T["options"]>> {
    if (isSourceReference(key)) {
      return this.#domain?.get(key);
    } else {
      const value = this.get(key.source);
      if (!value) return [];

      return value;
    }
  }

  async *[Symbol.asyncIterator]() {
    for await (const children of this.#state.children) {
      const nextDomain: DomainMap<T> = new Map();
      for (const child of children) {
        if (!this.#isDomainToken(child)) {
          console.log(child);
          continue;
        }
        const currentArray = nextDomain.get(child.source);
        const array: TokenVNodeBase<T["source"], T["options"]>[] = currentArray ?? [];
        array.push(child);
        if (!currentArray) {
          nextDomain.set(child.source, array);
        }
      }
      this.#domain = new Map(extendedIterable(nextDomain.entries()).map(([key, values]) => [key, Object.freeze(values)]));
      yield {
        reference: Delivery,
        source: nextDomain
      };
    }
  }

}
