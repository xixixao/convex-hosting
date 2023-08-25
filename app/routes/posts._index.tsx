import { Link, useLoaderData } from "@remix-run/react";
import { api } from "../../convex/_generated/api";
import { useQuery as convexUseQuery } from "convex/react";
import { ConvexHttpClient } from "convex/browser";
import { useAsync } from "react-streaming";
import {
  FunctionReference,
  OptionalRestArgs,
  getFunctionName,
} from "convex/server";
import { convexToJson } from "convex/values";
import { useEffect } from "react";

export default function Posts() {
  const tasks = useQuery(api.tasks.all);
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {tasks?.map((task) => (
          <li key={task._id}>
            <Link to={task._id} className="text-blue-600 underline">
              {task.text}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export function useQuery<Query extends FunctionReference<"query">>(
  query: Query,
  ...args: OptionalRestArgs<Query>
): Query["_returnType"] | undefined {
  const ssr = useAsync(
    [getFunctionName(query), convexToJson(args[0] ?? {})],
    () =>
      typeof window === "undefined"
        ? new ConvexHttpClient(process.env.CONVEX_CLOUD_URL!).query(
            query,
            ...args
          )
        : undefined
  );
  const live =
    typeof window === "undefined" ? undefined : convexUseQuery(query, ...args);
  return live ?? ssr;
}
