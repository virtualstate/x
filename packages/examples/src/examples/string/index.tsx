import { toString, h, createFragment } from "@virtualstate/fringe";

function MyWebsite() {
  return (
    <html>
      <head>
        <title>My Website</title>
      </head>
      <body>
        <h1>Hello!</h1>
        <main>
          <p key="huh">Content here</p>
          <p attr={false} other={true} value={1} one="two">Content there</p>
        </main>
        <footer>
          <a href="https://example.com" target="_blank">example.com</a>
        </footer>
      </body>
    </html>
  )
}

async function Render() {
  // for await (const iteration of toString(<MyWebsite />)) {
  //   console.log({ iteration });
  // }
  return await toString(<MyWebsite />)
}

export const _Z0001_StringWebsite = <Render />
export const _Z0001_URL = import.meta.url;
