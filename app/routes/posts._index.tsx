import { Link, useLoaderData } from "@remix-run/react";
import { internal } from "../../convex/_generated/api";
import { LoaderArgs, json } from "../utils";

export const loader = async ({ context: { ctx } }: LoaderArgs) => {
  return json({ tasks: await ctx.runQuery(internal.tasks.all) });
};

export default function Posts() {
  const { tasks } = useLoaderData<typeof loader>();
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
