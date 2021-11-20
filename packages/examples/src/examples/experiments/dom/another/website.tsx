import {h} from "./h";

export default function Website() {
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
