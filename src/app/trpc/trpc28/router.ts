import { router, publicProcedure, middleware } from '../_core/trpc'

export const loggingMiddleware = middleware(async (opts) => {
  const result = await opts.next()

  if (result.data === 'ok') {
    opts.ctx.logger?.info('Procedure succeeded')
  } else {
    opts.ctx.logger?.error('Procedure returned error result')
  }

  return result
})

export const appRouter = router({
  getData: publicProcedure
    .use(loggingMiddleware)
    .input((val: unknown) => {
      if (
        typeof val === 'object' &&
        val !== null &&
        'ok' in val &&
        typeof (val as { ok: unknown }).ok === 'boolean'
      ) {
        return val as { ok: boolean }
      }
      throw new Error('Invalid input')
    })
    .query(({ input }) => {
      if (!input.ok) {
        return 'error'
      }

      return 'ok'
    }),
})

export type AppRouter = typeof appRouter