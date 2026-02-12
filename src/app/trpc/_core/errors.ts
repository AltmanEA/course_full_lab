import { TRPCError } from '@trpc/server'

export const createNotFoundError = (entity: string) =>
  new TRPCError({
    code: 'NOT_FOUND',
    message: `${entity} not found`,
  })

export class EntityNotFoundError extends Error {
  constructor(entity: string) {
    super(`${entity} not found`)
    this.name = 'EntityNotFoundError'
  }
}