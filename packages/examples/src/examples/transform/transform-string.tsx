import {Source, VNode, h, createToken, createFragment, Fragment} from "@virtualstate/fringe";
import { Hook, Mutation } from "@virtualstate/hooks-extended";

function FnComponent({ meta }) {
  return `${meta} 📜`;
}

const ComponentString = FnComponent.name;
const Component = createToken(ComponentString);

const functions = new Map<unknown, Source>();
functions.set(ComponentString, FnComponent);

interface TransformOptions {
  map: Map<unknown, Source>
}


function Transform({ map }: TransformOptions, state: VNode) {
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

export const _902_TransformString = (
  <Transform map={functions}>
    <ComponentString meta="🌵" />
  </Transform>
)
export const _902_URL = import.meta.url;
