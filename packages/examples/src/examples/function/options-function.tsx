import { h } from "../../jsx";

interface ComponentOptions {
  meta: string
}

function Component({ meta }: ComponentOptions) {
  return <example meta={`${meta} Value`} />
}

export const _206_FunctionWithOptions = <Component meta="Some" />
export const _206_URL = import.meta.url;
