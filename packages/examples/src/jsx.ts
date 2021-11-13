import { VNode } from "@virtualstate/fringe";

export { h, createFragment, createToken } from "@virtualstate/fringe";

export namespace JSX {

  interface Element extends VNode {

  }

  interface IntrinsicElements {
    [key: string]: Record<string, unknown>;
  }

}


