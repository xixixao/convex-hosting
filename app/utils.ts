import { LoaderArgs as DenoLoaderArgs, TypedResponse } from "@remix-run/deno";

export type LoaderArgs = DenoLoaderArgs;

export function json<Data>(
  data: Data,
  init?: number | ResponseInit
): TypedResponse<Data> {
  if (init === void 0) {
    init = {};
  }
  let responseInit =
    typeof init === "number"
      ? {
          status: init,
        }
      : init;
  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }

  const response = new Response(JSON.stringify(data), {
    ...responseInit,
    headers,
  });
  return new Proxy(response, {
    get: function (target, prop, receiver) {
      if (prop === "body") {
        return (target as any)._body;
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}
