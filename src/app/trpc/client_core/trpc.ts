import { createTRPCReact } from '@trpc/react-query'
import { initTRPC } from '@trpc/server'
import z from 'zod'

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

export const appRouter = router({
  user: router({
    getAll: publicProcedure.query(() => []),

    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(() => null),

    create: publicProcedure
      .input(z.object({ name: z.string() }))
      .mutation(() => {
        return { id: '1', name: 'test' }
      }),
  }),
  post: router({
    getAll: publicProcedure.query(() => []),
  })

})

export type AppRouter = typeof appRouter

export const trpc = createTRPCReact<AppRouter>()