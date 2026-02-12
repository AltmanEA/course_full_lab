import type { Context } from './context'

export const createTestCaller = <TRouter>(
  router: TRouter & {
    createCaller: (ctx: Context) => any
  },
  ctx: Context
) => {
  return router.createCaller(ctx)
}