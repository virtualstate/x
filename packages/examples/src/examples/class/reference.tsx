import { h } from "../../jsx";

class Component {

  reference: symbol;

  constructor() {
    this.reference = Symbol("🛎️");
  }

}

export const _404_ReferenceClass = (
  <Component />
);
export const _404_URL = import.meta.url;
