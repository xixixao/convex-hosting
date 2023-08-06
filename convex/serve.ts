import { httpAction } from "./_generated/server";
import { html } from "./dist/html";

export const index = httpAction(async (_, request) => {
  // @ts-ignore
  const path = request.url.slice(process.env.CONVEX_SITE_URL.length);
  const name = path === "/" || path === "" ? "index.html" : path.slice(1);

  return new Response((html as Record<string, string>)[name], {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
});
