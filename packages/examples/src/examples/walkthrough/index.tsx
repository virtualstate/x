import {h} from "@virtualstate/fringe";

async function Import({ url, name }: Record<string, string>) {
  console.log("Import!");
  try {
    const { [name]: contents } = await import(url);
    console.log({ [url]: { [name]: contents } })
    return h(contents);
  } catch (error) {
    return h(error.message);
  }
}

export const _W0001_StartHTML = h(Import, { url: './start.js', name: "default" });
export const _W0001_URL = import.meta.url
export const _W0002_Start = h(Import, { url: './start.js', name: "SiteContents" });
export const _W0002_URL = import.meta.url
export const _W0003_ButtonHTML = h(Import, { url: './button.js', name: "default" });
export const _W0003_URL = import.meta.url
export const _W0004_Button = h(Import, { url: './button.js', name: "SiteContents" });
export const _W0004_URL = import.meta.url
