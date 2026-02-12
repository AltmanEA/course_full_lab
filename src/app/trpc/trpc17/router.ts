import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

/**
 * TODO:
 * Реализуйте userRouter.
 *
 * Необходимо:
 *
 * 1. Добавить query-процедуру getUserById
 * 2. Процедура принимает { id: string }
 * 3. Вызывает ctx.dataAccess.getUserById(id)
 * 4. Если пользователь не найден — выбросить NOT_FOUND
 * 5. Иначе вернуть пользователя
 *
 * Валидация input обязательна.
 */
const userRouter = router({
  getUserById: publicProcedure
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
});

export type AppRouter = typeof appRouter;