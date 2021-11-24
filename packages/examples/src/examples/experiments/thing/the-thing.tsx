import {EnableThen, h} from "@virtualstate/fringe";

export interface TheThingDefined {

}

export interface TheThingFn<T = unknown, R extends Record<string | symbol, unknown> = Record<string | symbol, unknown>> extends TheThingDefined {
  (strings: TemplateStringsArray): TheThing<T, R>;
  (): TheThing<T, R>;
  new (): TheThing<T, R>;
}

export type TheThing<T = unknown, R extends Record<string | symbol, unknown> = Record<string | symbol, unknown>> =
  & PromiseLike<T>
  & AsyncIterable<T>
  & AsyncIterator<T>
  & Iterable<T>
  & TheThingFn
  & R;

export function f<T = unknown, R extends Record<string | symbol, unknown> = Record<string | symbol, unknown>>(defaultValue: T): TheThing<T, R> {
  let theThing: TheThing<T, R>;

  function ThingConstructor() {
    if (this instanceof ThingConstructor) {
      // Some other known state
      return f(defaultValue);
    } else {
      return f(defaultValue);
    }
  }
  const almost: object = ThingConstructor;
  defineIt(almost);
  theThing = almost;
  return proxyIt(theThing);

  function defineIt(thing: object): asserts thing is TheThing<T, R> {
    Object.defineProperties(thing, {
      [Symbol.asyncIterator]: {
        value: () => asyncIterable()[Symbol.asyncIterator]()
      },
      [Symbol.iterator]: {
        value: () => iterable()[Symbol.iterator]()
      },
      next: {
        value: () => iterable()[Symbol.iterator]().next()
      },
      then: {
        value: (resolve, reject) => asyncIterable()[Symbol.asyncIterator]().next().then(result => {
          if (result.done) {
            throw new Error("No value");
          }
          return result.value;
        }).then(resolve, reject)
      },
      [EnableThen]: {
        value: true
      }
    })
  }

  async function *asyncIterable(): AsyncIterable<T> {
    yield defaultValue;
  }

  function *iterable(): Iterable<T> {
    yield defaultValue;
  }

  function proxyIt(thing: TheThing<T, R>): TheThing<T, R> {
    return new Proxy<TheThing<T, R>>(thing, {
      get(target, p) {
        return target[p]
      }
    })
  }
}

async function F() {
  const t = f(1);
  const T: Function = t; // if you wanted to use with h

  console.log({ t });
  console.log({ await: await t });
  console.log({ value: await t() });
  console.log({ new: await new t() });
  console.log({ h: (await (<T h={1} />))[0].source })
  console.log({ string: await t`h` })
  console.log({ string: await t`h``what` })
  console.log({ string: await (new t`h`())`what` })
  for (const item of t) console.log({ item });
  for await (const awaitItem of t) console.log({ awaitItem })
  console.log({ awaitNext: (await t.next()).value });

  return t;
}

export const _EF0001_F = <F />;
export const _EF0001_URL = import.meta.url;
