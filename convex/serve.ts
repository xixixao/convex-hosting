import { httpAction } from "./_generated/server";
import { indexHTML } from "./dist/html";
import { api } from "./_generated/api";

export const index = httpAction(async ({ runMutation }, request) => {
  // const { author, body } = await request.json();

  // await runMutation(api.messages.send, {
  //   body: `Sent via HTTP action: ${body}`,
  //   author,
  // });

  return new Response(indexHTML, {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
});
