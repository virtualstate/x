import {h, createFragment, toString} from "@virtualstate/fringe";

async function Render() {

  // https://cdn.skypack.dev/-/@virtualstate/examples
  // https://cdn.skypack.dev/-/@virtualstate/examples@v2.25.4-q8D2nHm4G0WzB5trVWBP/dist=es2019,mode=imports/optimized/common/index-570381d0.js
  // _Z0001_StringWebsite
  const playwright = await import("playwright");

  const content = await toString(
    <html>
    <head>
      <title>Site</title>
      <script type="importmap">
        {`
        {
          "imports": {
            "@virtualstate/deno": "https://cdn.skypack.dev/@virtualstate/deno",
            "@virtualstate/fringe": "https://cdn.skypack.dev/@virtualstate/fringe",
            "@virtualstate/dom": "https://cdn.skypack.dev/@virtualstate/dom",
            "@virtualstate/hooks": "https://cdn.skypack.dev/@virtualstate/hooks",
            "@virtualstate/examples": "https://cdn.skypack.dev/@virtualstate/examples",
            "@virtualstate/hooks-extended": "https://cdn.skypack.dev/@virtualstate/hooks-extended",
            "@virtualstate/union": "https://cdn.skypack.dev/@virtualstate/union",
            "@virtualstate/web": "https://cdn.skypack.dev/@virtualstate/web",
            "@virtualstate/x": "https://cdn.skypack.dev/@virtualstate/x",
            "abort-controller": "https://cdn.skypack.dev/abort-controller",
            "iterable": "https://cdn.skypack.dev/iterable",
            "microtask-collector": "https://cdn.skypack.dev/microtask-collector",
            "uuid": "https://cdn.skypack.dev/uuid",
            "@opennetwork/rdf-data-model": "https://cdn.skypack.dev/@opennetwork/rdf-data-model"
          }
        }`}
      </script>
      <script type="module">
        {`
        console.log("Hello");
        const { thenish } = await import("@virtualstate/fringe");
        const { _Z0001_StringWebsite } = await import("@virtualstate/examples");
        console.log({ thenish, _Z0001_StringWebsite });
        const site = await new Promise(thenish.bind(_Z0001_StringWebsite));
        const parser = new DOMParser();
        const importedDocument = parser.parseFromString(site, "text/html");
        document.head.append(...Array.from(importedDocument.head.children).map(document.adoptNode.bind(document)));
        document.body.append(...Array.from(importedDocument.body.children).map(document.adoptNode.bind(document)));
        console.log("appended");
        `}
      </script>
    </head>
    <body>
    <noscript>Hello</noscript>
    </body>
    </html>
  );

  const url = `data:text/html,${encodeURIComponent(content)}`;

  console.log(url);

  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForLoadState("load");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");
  page.on('console', msg => console.log(msg.text()));
  page.on('pageerror', exception => {
    console.log(`Uncaught exception: "${exception}"`);
  });
  page.on('requestfailed', request => {
    console.log(request.url() + ' ' + request.failure().errorText);
  });
  const body = await page.$("body");
  return await body.innerHTML();

  // return <ok />
}

export const _EP0001_Playwright = <Render />;
export const _EP0001_URL = import.meta.url;
