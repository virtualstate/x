import { h } from "../../jsx";

interface ComponentOptions {
  meta: string
}

function Component({ meta }: ComponentOptions) {
  return <example meta={`${meta} Value`} />
}

export const _207_FunctionWithOptions = <Component meta="Some" />
