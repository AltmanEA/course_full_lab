import { router, publicProcedure, middleware } from '../_core/trpc'

export const auditMiddleware = middleware(async ({ ctx, path, next }) => {
  // TODO:
  // 1. Выполнить next()
  // 2. Если ctx.auditService существует —
  //    вызвать ctx.auditService.record(...)
  // 3. Вернуть результат

  return next()
})

export const appRouter = router({
  hello: publicProcedure
    .use(auditMiddleware)
    .query(() => {
      return 'world'
    }),
})

export type AppRouter = typeof appRouter