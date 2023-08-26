import { useQuery as convexUseQuery } from "convex/react";
import {
  FunctionReference,
  OptionalRestArgs,
  getFunctionName,
} from "convex/server";
import { convexToJson } from "convex/values";
import { useAsync } from "react-streaming";
import { ActionCtx } from "../convex/_generated/server";

export function useQuery<Query extends FunctionReference<"query">>(
  query: Query,
  ...args: OptionalRestArgs<Query>
): Query["_returnType"] | undefined {
  const ssr = useAsync(
    [getFunctionName(query), convexToJson(args[0] ?? {})],
    () =>
      typeof window === "undefined"
        ? (globalThis as unknown as { __ctx: ActionCtx }).__ctx.runQuery(
            query,
            ...args
          )
        : undefined
  );
  const live =
    typeof window === "undefined" ? undefined : convexUseQuery(query, ...args);
  return live ?? ssr;
}
