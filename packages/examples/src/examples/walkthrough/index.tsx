import {h} from "@virtualstate/fringe";

async function Import({ url, name }: Record<string, string>) {
  const { [name]: contents } = await import(url);
  return h(contents);
}

export const _W0001_StartHTML = <Import name="default" url="./start.js" />
export const _W0001_URL = import.meta.url
export const _W0002_Start = <Import name="SiteContents" url="./start.js" />
export const _W0002_URL = import.meta.url
export const _W0003_ButtonHTML = <Import name="default" url="./button.js" />
export const _W0003_URL = import.meta.url
export const _W0004_Button = <Import name="SiteContents" url="./button.js" />
export const _W0004_URL = import.meta.url
