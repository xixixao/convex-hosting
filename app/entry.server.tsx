import type { AppLoadContext, EntryContext } from "@remix-run/deno";
import { RemixServer } from "@remix-run/react";
// @ts-ignore
import { renderToReadableStream } from "react-dom/server.browser";
import { renderToStream } from "react-streaming/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext
) {
  (globalThis as any).__ctx = loadContext.ctx;
  // TODO: When Convex implements streaming change it back to
  // renderToReadableStream from react-dom/server.browser
  // const body = renderToString(
  const { readable: body } = await renderToStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      renderToReadableStream: renderToReadableStream,
      userAgent: request.headers.get("User-Agent") ?? undefined,
    }
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
