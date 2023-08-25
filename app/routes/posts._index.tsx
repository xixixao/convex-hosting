import { Link, useLoaderData } from "@remix-run/react";
import { api } from "../../convex/_generated/api";
import { LoaderArgs, json } from "../utils";
// @ts-ignore
import { useState, use } from "react";
import { useQuery } from "convex/react";
import { ConvexHttpClient } from "convex/browser";

export default function Posts() {
  // const first = use(
  //   new Promise((resolve) => {
  //     setTimeout(() => resolve("hello"), 2000);
  //   })
  // );
  // return <>{first}</>;
  const initialTasks =
    typeof window === "undefined"
      ? use(new ConvexHttpClient("http://127.0.0.1:22161").query(api.tasks.all))
      : undefined;
  // const { tasks: initialTasks } = useLoaderData<typeof loader>();
  const liveTasks = undefined;
  //   typeof window === "undefined" ? undefined : useQuery(api.tasks.all);
  const tasks = liveTasks ?? initialTasks;
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
