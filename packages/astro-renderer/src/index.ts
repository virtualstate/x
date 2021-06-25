/**
 * @experimental
 */
export default {
  name: "@virtualstate/astro",
  client: "./client.js",
  server: "./server.js",
  knownEntrypoint: [
    "@virtualstate/x",
    "@virtualstate/fringe",
    "@virtualstate/union"
  ],
}
