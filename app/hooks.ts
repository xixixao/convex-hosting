import { useQuery as convexUseQuery, useConvex } from "convex/react";
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
  if (typeof window === "undefined") {
    return ssr;
  }
  const convex = useConvex();
  const live = convexUseQuery(query, ...args);
  const liveOrSsr = live === undefined ? ssr : live;
  // if (promiseRef.current !== undefined && live !== undefined) {
  //   promiseRef.current(live);
  // }
  if (liveOrSsr !== undefined) {
    return liveOrSsr;
  }

  // Both live and ssr are undefined, this is a clientside
  // transition, suspend!
  let resume;
  const watch = convex.watchQuery(query, ...args);

  // TODO: This is caused by BS inside useQueries,
  // `convexUseQuery` doesn't return the value on
  // first render
  const live_REMOVE = watch.localQueryResult();
  if (live_REMOVE !== undefined) {
    return live_REMOVE;
  }

  watch.onUpdate(() => {
    resume!();
  });

  // END TODO

  throw new Promise((resolve) => {
    resume = resolve;
  });
}
