import type { AppLoadContext, EntryContext } from "@remix-run/deno";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  // TODO: When Convex implements streaming change it back to
  // renderToReadableStream from react-dom/server.browser
  const body = renderToString(
    <RemixServer context={remixContext} url={request.url} />
    // {
    //   signal: request.signal,
    //   onError(error: unknown) {
    //     // Log streaming rendering errors from inside the shell
    //     console.error(error);
    //     responseStatusCode = 500;
    //   },
    // }
  );

  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
