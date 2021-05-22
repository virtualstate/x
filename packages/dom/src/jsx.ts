import { Fragment } from "@virtualstate/fringe";

export {};


// declare global {
//   namespace JSX {
//
//     interface IntrinsicElements {
//       [key: string]: Record<string, unknown>;
//     }
//   }
// }

//
// type DOMElement = Element;
//
// declare global {
//
//   namespace JSX {
//
//     type BooleanAttribute = "true" | "false" | "";
//
//     // TODO
//     interface HTMLAriaAttributes {
//       role?: string;
//     }
//
//     interface HTMLElementAttributes<E extends DOMElement = DOMElement> extends HTMLAriaAttributes {
//       [key: string]: unknown;
//
//       class?: string;
//       accesskey?: string;
//       contenteditable?: BooleanAttribute;
//       contextmenu?: string;
//       dir?: string;
//       draggable?: string;
//       dropzone?: string;
//       hidden?: string | boolean;
//       id?: string;
//       itemprop?: string;
//       lang?: string;
//       slot?: string;
//       spellcheck?: string;
//       style?: string;
//       tabindex?: string | number;
//       title?: string;
//       translate?: string;
//
//       onBeforeRender?: (element: E) => void | Promise<void>;
//       getDocumentNode?: () => E | Promise<E>;
//     }
//
//     interface HTMLButtonAttributes extends HTMLElementAttributes<HTMLButtonElement> {
//       type?: "submit" | "button";
//     }
//
//     interface HTMLAnchorAttributes extends HTMLElementAttributes<HTMLAnchorElement> {
//       href?: string;
//       download?: string;
//       hreflang?: string;
//       ping?: string;
//       referrerpolicy?: ReferrerPolicy;
//       rel?: string;
//       target?: "_self" | "_blank" | "_parent" | "_top" | string;
//       type?: string;
//     }
//
//     interface HTMLImageAttributes extends HTMLElementAttributes<HTMLImageElement> {
//       src?: string;
//       alt?: string;
//       srcset?: string;
//     }
//
//     interface HTMLLinkAttributes extends HTMLElementAttributes<HTMLLinkElement> {
//       rel?: string;
//       href?: string;
//       as?: "audio" | "document" | "embed" | "fetch" | "font" | "image" | "object" | "script" | "style" | "track" | "video" | "worker";
//       crossorigin?: "anonymous" | "use-credentials";
//       disabled?: BooleanAttribute;
//       hreflang?: string;
//       importance?: "auto" | "high" | "low";
//       integrity?: string;
//       media?: string;
//       referrerpolicy?: ReferrerPolicy;
//       sizes?: string;
//       title?: string;
//       type?: string;
//       prefetch?: string;
//     }
//
//     interface HTMLMetaAttributes extends HTMLElementAttributes<HTMLMetaElement> {
//       charset?: string;
//       content?: string;
//       "http-equiv"?: "content-security-policy" | "refresh";
//       name?: "application-name" | "author" | "description" | "generator" | "keywords" | "referrer" | "theme-color" | "color-scheme" | "creator" | "googlebot" | "publisher" | "robots" | "slurp" | "viewport";
//       value?: string;
//     }
//
//     interface HTMLSlotAttributes extends HTMLElementAttributes<HTMLSlotElement> {
//       name?: string;
//     }
//
//     interface HTMLScriptAttributes extends HTMLElementAttributes<HTMLScriptElement> {
//       src?: string;
//       type?: string;
//       async?: BooleanAttribute;
//       crossorigin?: string;
//       defer?: BooleanAttribute;
//       integrity?: string;
//       nomodule?: string;
//       nonce?: string;
//       referrerpolicy?: ReferrerPolicy;
//     }
//
//     // interface DOMElements {
//     //   html: HTMLElementAttributes<HTMLHtmlElement>;
//     //   body: HTMLElementAttributes<HTMLBodyElement>;
//     //   head: HTMLElementAttributes<HTMLHeadElement>;
//     //   title: HTMLElementAttributes<HTMLTitleElement>;
//     //   header: HTMLElementAttributes<HTMLElement>;
//     //   footer: HTMLElementAttributes<HTMLElement>;
//     //   article: HTMLElementAttributes<HTMLElement>;
//     //   section: HTMLElementAttributes<HTMLElement>;
//     //   div: HTMLElementAttributes<HTMLDivElement>;
//     //   span: HTMLElementAttributes<HTMLSpanElement>;
//     //   img: HTMLImageAttributes;
//     //   aside: HTMLElementAttributes<HTMLElement>;
//     //   audio: HTMLElementAttributes<HTMLAudioElement>;
//     //   canvas: HTMLElementAttributes<HTMLCanvasElement>;
//     //   datalist: HTMLElementAttributes<HTMLDataListElement>;
//     //   details: HTMLElementAttributes<HTMLDetailsElement>;
//     //   embed: HTMLElementAttributes<HTMLEmbedElement>;
//     //   nav: HTMLElementAttributes<HTMLElement>;
//     //   output: HTMLElementAttributes<HTMLOutputElement>;
//     //   progress: HTMLElementAttributes<HTMLProgressElement>;
//     //   video: HTMLElementAttributes<HTMLVideoElement>;
//     //   ul: HTMLElementAttributes<HTMLUListElement>;
//     //   li: HTMLElementAttributes<HTMLElement>;
//     //   ol: HTMLElementAttributes<HTMLOListElement>;
//     //   a: HTMLAnchorAttributes;
//     //   p: HTMLElementAttributes<HTMLElement>;
//     //   button: HTMLButtonAttributes;
//     //   table: HTMLElementAttributes<HTMLElement>;
//     //   thead: HTMLElementAttributes<HTMLElement>;
//     //   tbody: HTMLElementAttributes<HTMLElement>;
//     //   tr: HTMLElementAttributes<HTMLElement>;
//     //   td: HTMLElementAttributes<HTMLElement>;
//     //   th: HTMLElementAttributes<HTMLElement>;
//     //   link: HTMLLinkAttributes;
//     //   meta: HTMLMetaAttributes;
//     //   marquee: HTMLElementAttributes<HTMLElement>;
//     //   slot: HTMLSlotAttributes;
//     //   h1: HTMLElementAttributes<HTMLElement>;
//     //   h2: HTMLElementAttributes<HTMLElement>;
//     //   h3: HTMLElementAttributes<HTMLElement>;
//     //   h4: HTMLElementAttributes<HTMLElement>;
//     //   h5: HTMLElementAttributes<HTMLElement>;
//     //   h6: HTMLElementAttributes<HTMLElement>;
//     //   script: HTMLScriptAttributes;
//     //   pre: HTMLElementAttributes<HTMLPreElement>;
//     //   code: HTMLElementAttributes<HTMLElement>;
//     //   br: HTMLElementAttributes<HTMLBRElement>;
//     //   hr: HTMLElementAttributes<HTMLHRElement>;
//     //   main: HTMLElementAttributes<HTMLElement>;
//     //   label: HTMLElementAttributes<HTMLLabelElement>;
//     //   em: HTMLElementAttributes<HTMLElement>;
//     //   textarea: HTMLElementAttributes<HTMLTextAreaElement>;
//     //   style: HTMLElementAttributes<HTMLStyleElement>;
//     // }
//     //
//     // interface IntrinsicElements extends DOMElements {
//     //   fragment: {};
//     // }
//
//   }
// }
