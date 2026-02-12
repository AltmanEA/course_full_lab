import { router, publicProcedure } from "../_core/trpc";

/**
 * TODO:
 * Реализуйте query "health".
 *
 * Необходимо:
 * 1. Вызвать ctx.dataAccess.getVersion()
 * 2. Вернуть:
 *    { status: "ok", version }
 */
export const appRouter = router({
  health: publicProcedure.query(({ ctx }) => {
    // TODO
  }),
});

export type AppRouter = typeof appRouter;