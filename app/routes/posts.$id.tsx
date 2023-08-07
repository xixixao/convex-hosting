import { useLoaderData } from "@remix-run/react";
import { json, LoaderArgs } from "../utils";
import { internal } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useState } from "react";

export const loader = async ({ context: { ctx }, params }: LoaderArgs) => {
  return json({
    task: await ctx.runQuery(internal.tasks.get, {
      id: params.id! as Id<"tasks">,
    }),
  });
};

export default function PostSlug() {
  const { task } = useLoaderData<typeof loader>();
  const [count, setCount] = useState(0);
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Some Post: {task?.text}
      </h1>
      <button onClick={() => setCount(count + 1)}>
        Click me (clientside): {count}
      </button>
    </main>
  );
}
