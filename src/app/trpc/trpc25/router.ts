import { router } from '../_core/trpc'
import { protectedProcedure } from '../_core/protected'
import { TRPCError } from '@trpc/server'

export const adminProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    // TODO:
    // если ctx.user?.role !== 'ADMIN'
    // выбросить TRPCError({ code: 'UNAUTHORIZED' })
    // иначе вернуть next()

    return next()
  }
)

export const appRouter = router({
  getSecret: adminProcedure.query(() => {
    return 'secret'
  }),
})

export type AppRouter = typeof appRouter