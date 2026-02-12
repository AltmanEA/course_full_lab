import { router, publicProcedure } from '../_core/trpc'
import { createNotFoundError } from '../_core/errors'

export const appRouter = router({
  getItem: publicProcedure
    .input((val: unknown) => {
      if (
        typeof val === 'object' &&
        val !== null &&
        'id' in val &&
        typeof (val as { id: unknown }).id === 'string'
      ) {
        return val as { id: string }
      }
      throw new Error('Invalid input')
    })
    .query(({ input }) => {
      // TODO:
      // если input.id !== '1'
      // выбросить createNotFoundError('Item')
      // иначе вернуть 'item-1'

      return 'not implemented'
    }),
})

export type AppRouter = typeof appRouter