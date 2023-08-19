import { v } from "convex/values";
import { query } from "./_generated/server";

export const all = query({
  args: {},
  handler: async (ctx, args) => {
    return ctx.db.query("tasks").collect();
  },
});

export const get = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});
