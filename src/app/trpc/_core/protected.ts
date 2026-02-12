import { TRPCError } from '@trpc/server'
import { publicProcedure } from './trpc'

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }

  return next()
})

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user?.role !== 'ADMIN') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }

  return next()
})