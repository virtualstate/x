import { h } from "../../jsx";

class Component {

  reference: symbol;

  constructor() {
    // Define as specific instance
    this.reference = Symbol("Component Instance");
  }

}

export const _404_ReferenceClass = (
  <Component />
)
