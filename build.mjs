#!/usr/bin/env zx

let sources = [];

await readFiles("public");

await fs.mkdir("convex/dist", { recursive: true });
await fs.writeFile(
  `convex/dist/html.js`,
  `export const html = {${sources.join(",")}};`
);
console.log("Updated html.js at", new Date().toLocaleTimeString());

async function readFiles(dir) {
  // Read all items in the directory
  const items = await fs.readdir(dir, { withFileTypes: true });

  // Loop through each item
  for (const item of items) {
    let fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      await readFiles(fullPath);
    } else if (item.isFile()) {
      const content = await fs.readFile(fullPath, "utf8");
      sources.push(
        `"${fullPath.slice("public".length)}": \`${content
          .replace(/\\/g, "\\\\")
          .replace(/`/g, "\\`")
          .replace(/\${/g, "\\${")}\``
      );
    }
  }
}
