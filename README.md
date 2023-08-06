This is an example of a Convex-only project.

Convex is serving HTML at (in dev) https://blessed-ibis-783.convex.site/

At this commit any html file in src/ is written to a single bundled convex/dist/html.js file from which a dynamic router returns it.

## Development

First terminal window:
`npx convex dev`

Second terminal window:
`chokidar build.mjs 'src/**/*' -c "zx build.mjs"`

## Setup

You need

```
npm install -g chokidar-cli zx
```
