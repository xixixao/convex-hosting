This is an example of a Convex-only project.

Convex is serving HTML at (in dev) https://blessed-ibis-783.convex.site/

At this commit any html file in src/ is written to a single bundled convex/dist/html.js file from which a dynamic router returns it.

## Development

First terminal window (builds the served files from React sources):
`npx remix watch`
or using build:
`chokidar 'app/**/*' -c "npx remix build"`

Second terminal window (takes the files produced by Remix and wraps them in the JS file we serve from):
`chokidar build.mjs 'public/**/*' -c "zx build.mjs"`

Third terminal window (push to the deployment):
`npx convex dev`

## Deployment

I have made local changes to Convex (to add `"convex"` to esbuild config) and react-streaming (to treat `"convex"` as a server environment), so Github action deployment doesn't work.

I can do:

```
npm run build
~/Work/convex/npm-packages/convex/bin/main.js deploy
```

## Setup

You need

```
npm install -g chokidar-cli
```
