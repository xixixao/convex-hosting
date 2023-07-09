#!/usr/bin/env zx

const source = await fs.readFile("src/index.html", "utf8");
await fs.writeFile(
  "convex/dist/html.js",
  `export const indexHTML = \`${source}\`;`
);
