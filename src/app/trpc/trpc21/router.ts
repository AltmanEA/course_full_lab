import { TRPCError } from '@trpc/server'
import { router, publicProcedure } from '../_core/trpc'

export const appRouter = router({
  getRequestId: publicProcedure.query(({ ctx }) => {
    // TODO: вернуть ctx.requestId
    // если отсутствует — выбросить TRPCError с code INTERNAL_SERVER_ERROR

    throw new Error('Not implemented')
  }),
})

export type AppRouter = typeof appRouter