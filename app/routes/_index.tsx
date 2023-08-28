import { Link } from "@remix-run/react";

// export const meta: V2_MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Hello world!</h1>
      <Link
        to="/posts"
        prefetch="viewport"
        className="text-xl text-blue-600 underline"
      >
        Blog Posts
      </Link>
    </div>
  );
}
