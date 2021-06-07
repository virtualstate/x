import { VNode } from "@virtualstate/fringe";

export { h, createFragment, createToken } from "@virtualstate/x";

export namespace JSX {

  interface Element extends VNode {

  }

  interface IntrinsicElements {
    [key: string]: Record<string, unknown>;
  }

}


