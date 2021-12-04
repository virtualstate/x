// Typescript decided it wouldn't compile this as I made it more and more complex
// at the end of this file. Will come back around to this :)
// export interface Options {

//   name?: string;
//   id?: string;
//   class?: string;
//   style?: string | Record<string, unknown>
//   title?: string;
// }
//
// export interface AnchorOptions extends Options {
//   href?: URL | string;
//   hreflang?: string;
//   ping?: string;
//   download?: string;
//   referrerpolicy?: string;
//   rel?: string;
//   target?: string;
//   type?: string;
// }
//
// export interface InputOptions extends Options {
//   value: string | number | Date;
//   name: string;
// }
//
// export interface SlotOptions extends Options {
//   name: string;
// }
//
// export interface BaseOptions extends Options {
//   href?: string;
//   target?: string;
// }
//
// export interface LinkOptions extends Options {
//   as?: string;
//   crossorigin?: string;
//   disabled?: boolean;
//   href?: URL | string;
//   hreflang?: string;
//   imagesizes?: string;
//   imagesrcset?: string;
//   integrity?: string;
//   media?: string;
//   prefetch?: string;
//   referrerpolicy?: string;
//   rel?: string;
//   sizes?: string;
//   title?: string;
//   type?: string;
// }
//
// export interface MetaOptions extends Options {
//   charset?: string;
//   content?: string;
//   "http-equiv"?: string;
//   name?: string;
// }
//
// export interface StyleOptions extends Options {
//   media?: string;
//   nonce?: string;
//   title?: string;
// }
//
// export interface BlockQuoteOptions extends Options {
//   cite?: string;
// }
//
// export interface ListItemOptions extends Options {
//   value?: string | number;
// }
//
// export interface OrderedListOptions extends Options {
//   reversed?: boolean;
//   start?: string | number;
//   type?: string | number;
// }
//
// export interface TimeOptions extends Options {
//   datetime?: string;
// }
//
// export interface DataOptions extends Options {
//   data?: string | number;
// }
//
// export interface ImageOptions extends Options {
//   src: string | URL;
//   alt?: string;
//   crossorigin?: string;
//   decoding?: string;
//   ismap?: boolean;
//   loading?: string;
//   referrerpolicy?: string;
//   sizes?: string;
//   srcset?: string;
//   width?: number | string;
//   height?: number | string;
//   usemap?: string;
// }
//
// interface Domain {
//   div: Options
//   h1: Options
//   h2: Options
//   h3: Options
//   h4: Options
//   h5: Options
//   p: Options
//   span: Options
//   a: AnchorOptions
//   input: InputOptions
//   slot: SlotOptions
//   base: BaseOptions
//   link: LinkOptions
//   meta: MetaOptions
//   style: StyleOptions
//   blockquote: BlockQuoteOptions
//   li: ListItemOptions
//   ol: OrderedListOptions
//   ul: Options
//   time: TimeOptions
//   data: DataOptions
//   img: ImageOptions
// }
//
// type Type = keyof Domain;
// type Attribute = {
//   [P in keyof Domain]: string extends keyof Domain[P] ? never : keyof Domain[P]
// }[keyof Domain];
// type AttributeValueRaw<AA extends Attribute = Attribute> = {
//   [A in AA]: {
//     [P in keyof Domain]: unknown extends Domain[P][keyof Domain[P] & A] ? never : Domain[P][keyof Domain[P] & A]
//   }[keyof Domain]
// }[AA]
// type AttributeValue = AttributeValueRaw
// type AttributeExtends<T extends AttributeValue = AttributeValue, Z = AttributeValue> = T extends Z ? T : never
//
// type AttributeSelector<A extends Attribute = Attribute> =
//   | `[${A}]`
//   | `[${A}=${AttributeExtends<AttributeValue, string | number | boolean>}]`
//   | `[${A}~=${AttributeExtends<AttributeValue, string | number | boolean>}]`
//   | `[${A}|=${AttributeExtends<AttributeValue, string | number | boolean>}]`
//   | `[${A}^=${AttributeExtends<AttributeValue, string | number | boolean>}]`
//   | `[${A}$=${AttributeExtends<AttributeValue, string | number | boolean>}]`
//   | `[${A}*=${AttributeExtends<AttributeValue, string | number | boolean>}]`
//
// type UniversalSelector = "*"
//
// type CoreSelector =
//   | AttributeSelector
//
// type BaseSelector =
//   | CoreSelector
//   | UniversalSelector
//   | Type
//
// type Match<S extends string> =
//   S extends BaseSelector ? S :
//   S extends `${infer B}${infer Z}` ?
//   B extends BaseSelector ?
//   `${B}${Match<Z>}`
//   : never
//   : never
//
// type ManyCoreSelector = Partial<{
//   [S in BaseSelector]: CoreSelector
// }>
//
// function match<S extends string, M extends Match<S>>(string: S & M): asserts string is M {
//
// }
//
// type M = Match<>
//
// const z: M = '[hreflang=1]'
//
// match('*')
