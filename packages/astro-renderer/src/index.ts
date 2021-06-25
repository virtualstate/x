export default {
  name: "@virtualstate/astro-renderer",
  client: "./client.js",
  server: "./server.js",
  knownEntrypoint: [
    "@virtualstate/x",
    "@virtualstate/fringe",
    "@virtualstate/union"
  ],
}
