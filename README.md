This is an example of a Convex-only project.

Convex is serving HTML at (in dev) https://blessed-ibis-783.convex.site/

At this commit the HTML is written to a JS string which is imported from our HTTP Action.

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
