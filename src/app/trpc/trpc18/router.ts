import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

/**
 * userRouter уже реализован.
 * Его изменять нельзя.
 */
const userRouter = router({});

/**
 * TODO:
 * Реализуйте postRouter:
 * - createPost (mutation)
 * - getPostById (query)
 * - NOT_FOUND при отсутствии поста
 */
const postRouter = router({
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
      })
    )
    .mutation(({ input, ctx }) => {
      // TODO
    }),

  getPostById: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .query(({ input, ctx }) => {
      // TODO
    }),
});

/**
 * appRouter уже собран.
 * Его изменять нельзя.
 */
export const appRouter = router({
  user: userRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;