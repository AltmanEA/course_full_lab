import { router, publicProcedure } from '../_core/trpc'
import {
  EntityNotFoundError,
  createNotFoundError,
} from '../_core/errors'

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
      // 1. Если input.id !== '1'
      //    выбросить EntityNotFoundError('Item')
      //
      // 2. Перехватить эту ошибку
      //    и заменить её на createNotFoundError('Item')
      //
      // 3. Если id === '1' — вернуть 'item-1'

      return 'not implemented'
    }),
})

export type AppRouter = typeof appRouter