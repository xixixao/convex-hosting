import { httpRouter } from "convex/server";
import { index } from "./serve";

const http = httpRouter();

http.route({
  path: "/",
  method: "GET",
  handler: index,
});

export default http;
