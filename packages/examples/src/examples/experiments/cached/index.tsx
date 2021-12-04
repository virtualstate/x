import {h} from "@virtualstate/fringe";
import {proxyDocumentInstance} from "./document";
import {Cache} from "./cache";

async function *Cached() {
  const cache = new Map<object, unknown>();
  async function Thing() {
    return <td>{3}</td>
  }
  const node = (
    <tr>
      <td>{1}</td>
      <td>{2}</td>
      <Thing />
    </tr>
  );
  for await (const children of node.children) {
    yield (
      <Cache
        cache={cache}
        fn={proxyDocumentInstance}
      >
        {node}
      </Cache>
    );
  }
}

export const _ECACHE0001_Render = <Cached />
export const _ECACHE0001_URL = import.meta.url;
