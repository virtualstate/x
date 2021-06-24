import {Source, VNode, h, createToken, createFragment, Fragment} from "@virtualstate/fringe";
import { Hook, Mutation } from "@virtualstate/hooks-extended";

function FnComponent() {
  return "📜";
}

const ComponentSymbol = Symbol(FnComponent.name);
const Component = createToken(ComponentSymbol);

const functions = new Map<unknown, Source>();
functions.set(ComponentSymbol, FnComponent);

export interface TransformOptions {
  map: Map<unknown, Source>
}

/**
 * @experimental
 */
export function Transform({ map }: TransformOptions, state: VNode) {
  return (
    <Hook>
      <Mutation is={is} mutate={mutate}>
        {state}
      </Mutation>
    </Hook>
  )

  function is(value: VNode): value is VNode {
    return map.has(value.source)
  }

  function mutate(value: VNode) {
    return h(map.get(value.source), value.options, {
      reference: Fragment,
      children: value.children
    })
  }
}

export const _901_Transform = (
  <Transform map={functions}>
    <Component />
  </Transform>
)
export const _901_URL = import.meta.url;
