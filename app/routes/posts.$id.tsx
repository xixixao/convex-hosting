import { useParams } from "@remix-run/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useQuery } from "../hooks";

export default function PostSlug() {
  const { id } = useParams();
  const task = useQuery(api.tasks.get, {
    id: id! as Id<"tasks">,
  });
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
