import { Source, h, createToken } from "@virtualstate/fringe";
import { Transform } from "@virtualstate/examples";

function FnComponent({ meta }) {
  return `${meta} 📜`;
}

const ComponentString = FnComponent.name;
const Component = createToken(ComponentString);

const functions = new Map<unknown, Source>();
functions.set(ComponentString, FnComponent);

export const _902_TransformString = (
  <Transform map={functions}>
    <Component meta="🌵" />
  </Transform>
)
export const _902_URL = import.meta.url;
