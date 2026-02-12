import type { AnyRouter } from "@trpc/server";
import type { Context } from "./context";

export function createTestCaller<TRouter extends AnyRouter>(
  appRouter: TRouter,
  ctx: Context
) {
  return appRouter.createCaller(ctx);
}