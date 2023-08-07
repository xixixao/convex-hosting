import { httpAction } from "./_generated/server";
import { html } from "./dist/html";
import { createRequestHandler } from "@remix-run/server-runtime";
import "web-streams-polyfill/es2018";
import { mimeTypes } from "mime-wrapper";

import * as build from "../build";

export const index = httpAction(async (_, request) => {
  const url = new URL(request.url);
  const path = url.pathname === "/" ? "/index.html" : url.pathname;
  if (path.startsWith("/build/")) {
    return new Response((html as Record<string, string>)[path], {
      status: 200,
      headers: {
        "X-REQUESTED-FILE": path,
        "content-type": mimeTypes.getType(path),
      },
    });
  }

  return createRequestHandler(
    // @ts-ignore
    build,
    "development"
  )(
    new Proxy(request, {
      get: function (target, prop, receiver) {
        if (prop === "signal") {
          return {
            addEventListener() {},
          };
        }

        return Reflect.get(target, prop, receiver);
      },
    })
  );

  // const path = request.url.slice(process.env.CONVEX_SITE_URL!.length);
  // const name = path === "/" || path === "" ? "index.html" : path.slice(1);

  // return new Response((html as Record<string, string>)[name], {
  //   status: 200,
  //   headers: {
  //     "content-type": "text/html",
  //   },
  // });
});
