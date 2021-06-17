import { h } from "@virtualstate/fringe";

interface ComponentOptions {
  meta: string
}

function Component({ meta }: ComponentOptions) {
  return <example meta={`${meta} 🎾`} />
}

export const _206_FunctionWithOptions = <Component meta="🏓" />
export const _206_URL = import.meta.url;
