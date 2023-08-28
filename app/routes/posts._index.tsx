import { Link } from "@remix-run/react";
import { api } from "../../convex/_generated/api";
import { useQuery } from "../hooks";

export default function Posts() {
  const tasks = useQuery(api.tasks.all);
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {tasks?.map((task) => (
          <li key={task._id}>
            <Link
              to={task._id}
              prefetch="viewport"
              className="text-blue-600 underline"
            >
              {task.text}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
