import { v } from "convex/values";
import { internalQuery } from "./_generated/server";

export const all = internalQuery({
  args: {},
  handler: async (ctx, args) => {
    return ctx.db.query("tasks").collect();
  },
});

export const get = internalQuery({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});
