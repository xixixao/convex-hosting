/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

import { ActionCtx } from "./convex/_generated/server";

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext {
    ctx: ActionCtx;
  }
}
