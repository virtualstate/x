import {h} from "@virtualstate/fringe";

async function Import(url: string) {
  const { default: contents } = await import(url);
  return contents;
}

export const _W0001_Start = h(Import.bind(undefined, "./start.js"));
export const _W0001_URL = import.meta.url;
export const _W0002_Button = h(Import.bind(undefined, "./button.js"));
export const _W0002_URL = import.meta.url;
