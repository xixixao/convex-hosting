import { Link, useLoaderData } from "@remix-run/react";
import { api } from "../../convex/_generated/api";
import { LoaderArgs, json } from "../utils";
import { useState } from "react";
import { useQuery } from "convex/react";

export const loader = async ({ context: { ctx } }: LoaderArgs) => {
  return json({ tasks: await ctx.runQuery(api.tasks.all) });
};

export default function Posts() {
  const { tasks: initialTasks } = useLoaderData<typeof loader>();
  const liveTasks =
    typeof window === "undefined" ? undefined : useQuery(api.tasks.all);
  const tasks = liveTasks ?? initialTasks;
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {tasks.map((task) => (
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
