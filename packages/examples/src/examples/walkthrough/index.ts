import {h} from "@virtualstate/fringe";

async function Import(url: string, name: string) {
  const { [name]: contents } = await import(url);
  return h(contents);
}

export const _W0001_StartHTML = h(Import.bind(undefined, "./start.js", "default"));
export const _W0001_URL = import.meta.url;
export const _W0002_Start = h(Import.bind(undefined, "./start.js", "SiteContents"));
export const _W0002_URL = import.meta.url;
export const _W0003_ButtonHTML = h(Import.bind(undefined, "./button.js", "default"));
export const _W0003_URL = import.meta.url;
export const _W0004_Button = h(Import.bind(undefined, "./button.js", "SiteContents"));
export const _W0004_URL = import.meta.url;
