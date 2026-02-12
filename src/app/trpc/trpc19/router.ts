import { router } from "../_core/trpc";

/**
 * userRouter и postRouter уже реализованы.
 * Их изменять нельзя.
 */
const userRouter = router({});
const postRouter = router({});

/**
 * TODO:
 * Объедините userRouter и postRouter
 * в единый appRouter.
 */
export const appRouter = router({
  // TODO
});

export type AppRouter = typeof appRouter;