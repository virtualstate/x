import { h } from "@virtualstate/fringe";

const moduleScoped = "🐦";

function Component() {
  const functionScoped = "💡";
  return `${moduleScoped} ${functionScoped} 🔑`;
}

export const _201_Function = <Component />
export const _201_URL = import.meta.url;
