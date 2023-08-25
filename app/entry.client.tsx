import { RemixBrowser } from "@remix-run/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

const convex = new ConvexReactClient(
  // @ts-ignore
  window.ENV.URL
);

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ConvexProvider client={convex}>
        <RemixBrowser />
      </ConvexProvider>
    </StrictMode>
  );
});
