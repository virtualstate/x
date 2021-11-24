import {h, Instance, VNode} from "@virtualstate/fringe";
import {Render, render} from "./render";
import {globalDocument} from "./global-document";
import {assertElement} from "@virtualstate/dom";

async function *Controller() {
  const space = new WeakMap()
  const referenced = <o>Hello</o>
  const Body = (
    <body>
    {referenced}
    <p>Test</p>
    <b>Ok</b>
    </body>
  );

  const renderSite = (
    <Render document={globalDocument} space={space}>
      <Site>{Body}</Site>
    </Render>
  )

  const [{ [Instance]: site }] = await renderSite;

  assertElement(site);

  // render to parent

  yield renderSite;

  const [earlier] = await render(globalDocument, referenced, space);
  console.log({ instance: earlier[Instance], siblings: earlier[Instance].parentNode.childNodes })

  // Or like a function

  await render(globalDocument, <Site>{Body}</Site>, space);
  await render(globalDocument, Body, space);

  // Or render something new over the top
  yield (
    <Render document={globalDocument} space={space}>
      <Site>
        <Body>
          {/* Keeping the same reference */}
          {referenced}
          <footer>Content</footer>
        </Body>
      </Site>
    </Render>
  );

  // If you trigger another render with the same space, it will retain the same parent
  // Nothing would be overriding it
  const [{ [Instance]: instance }] = await (<Render document={globalDocument} space={space}>
    {referenced}
  </Render>);

  console.log({ instance, same: earlier[Instance] === instance });

  const [node] = await render(globalDocument, referenced, space);
  console.log({ instance: node[Instance], siblings: node[Instance].parentNode.childNodes, same: earlier[Instance] === node[Instance] })

  // yield <Website />;
  // yield <ok />


  function Site({ title, head }: { title?: string, head?: VNode }, body: VNode) {
    return (
      <html>
      <head>
        <title>{title ?? "My Website"}</title>
        {head}
      </head>
      {body}
      </html>
    )
  }
}
// I'm just leaving this here, but I will come back to it
//
export const _EDOMA0001_Render = <Controller />
export const _EDOMA0001_URL = import.meta.url;
