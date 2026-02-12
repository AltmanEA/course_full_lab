import { router, publicProcedure, middleware } from '../_core/trpc'

export const wrapResultMiddleware = middleware(async ({ ctx, next }) => {
  // TODO:
  // 1. Выполнить next()
  // 2. Вернуть модифицированный result,
  //    где data заменён на:
  //    {
  //      data: <оригинальный result.data>,
  //      requestId: ctx.requestId
  //    }

  return next()
})

export const appRouter = router({
  getMessage: publicProcedure
    .use(wrapResultMiddleware)
    .query(() => {
      return 'hello'
    }),
})

export type AppRouter = typeof appRouter