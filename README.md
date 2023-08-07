This is an example of a Convex-only project.

Convex is serving HTML at (in dev) https://blessed-ibis-783.convex.site/

At this commit any html file in src/ is written to a single bundled convex/dist/html.js file from which a dynamic router returns it.

## Development

First terminal window (pushed to the deployment):
`npx convex dev`

Second terminal window (takes the files produced by Remix and wraps them in the JS file we serve from):
`chokidar build.mjs 'app/**/*' -c "zx build.mjs"`

Third terminal window (builds the served files from React sources):
`npx remix watch`

## Setup

You need

```
npm install -g chokidar-cli zx
```
