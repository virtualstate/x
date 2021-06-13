import { h } from "../../jsx";
import {VNode} from "@virtualstate/fringe";


function Component(o: unknown, child: VNode) {
  return (
    <container>
      {child}
    </container>
  )
}

export const _207_FunctionWithChildren = (
  <Component>
    <innerChild />
  </Component>
)
export const _207_URL = import.meta.url;
