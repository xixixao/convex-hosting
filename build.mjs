#!/usr/bin/env zx

const files = await fs.readdir("src");
const sources = await Promise.all(
  files.map(async (name) => {
    const source = await fs.readFile(`src/${name}`, "utf8");
    return `"${path.basename(name)}": \`${source}\``;
  })
);
await fs.writeFile(
  `convex/dist/html.js`,
  `export const html = {${sources.join(",")}};`
);
