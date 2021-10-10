import { h, createFragment } from "@virtualstate/fringe";
import { render } from "@virtualstate/dom";

async function SiteContents() {
  return createFragment(
    {},
    h("p", {}, "Hello World!"),
    h(
      "button",
      {
        type: "button",
        onClick() {
          alert("Button clicked!");
        }
      },
      "Press me!!"
    )
  );
}

async function Site() {
  const root = document.createElement("div");
  await render(h(SiteContents), root);
  document.body.append(root);
}

export { Site, SiteContents };

export default (
  <html>
    <body>
      <script type="application/javascript">
        {`const { h, createFragment } = await import("@virtualstate/fringe");`}
        {`const { render } = await import("@virtualstate/dom");`}
        {SiteContents.toString()}
        {Site.toString()}
        {`await Site()`}
      </script>
    </body>
  </html>
)
