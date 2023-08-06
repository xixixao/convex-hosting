import { HttpRouter, PublicHttpAction, RoutableMethod } from "convex/server";
import { index } from "./serve";

class Router extends HttpRouter {
  lookup = (
    path: string,
    method: RoutableMethod | "HEAD"
  ): Readonly<[PublicHttpAction, RoutableMethod, string]> | null => {
    return [index, method as RoutableMethod, path];
  };
}

const http = new Router();

http.route({
  path: "/",
  method: "GET",
  handler: index,
});

export default http;
