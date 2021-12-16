import "./correct-import-extensions.js";
import { promises as fs } from "fs";

const badges = [];

badges.push(
  `![nycrc config on GitHub](https://img.shields.io/nycrc/virtualstate/x)`
)

const coverage = await fs.readFile("coverage/coverage-summary.json", "utf8").then(JSON.parse).catch(() => ({}));
const coverageConfig = await fs.readFile(".nycrc", "utf8").then(JSON.parse);
for (const [name, { pct }] of Object.entries(coverage?.total ?? {})) {
  if (name.includes("/")) continue; // It is a file
  const good = coverageConfig[name] ?? 80;
  const color = pct >= good ? "brightgreen" : "yellow";
  const message = `${pct}%25`;
  badges.push(
    `![${message} ${name} covered](https://img.shields.io/badge/${name}-${message}-${color})`
  );
}

const tag = "[//]: # (badges)";

const readMe = await fs.readFile("README.md", "utf8");
const badgeStart = readMe.indexOf(tag);
const badgeStartAfter = badgeStart + tag.length;
if (badgeStart === -1) {
  throw new Error(`Expected to find "${tag}" in README.md`);
}
const badgeEnd = badgeStartAfter + readMe.slice(badgeStartAfter).indexOf(tag);
const badgeEndAfter = badgeEnd + tag.length;
const readMeBefore = readMe.slice(0, badgeStart);
const readMeAfter = readMe.slice(badgeEndAfter);

await fs.writeFile("README.md", `${readMeBefore}${tag}\n\n${badges.join(" ")}\n\n${tag}${readMeAfter}`);
