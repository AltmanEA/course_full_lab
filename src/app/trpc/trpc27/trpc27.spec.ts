import { describe, it, expect } from 'vitest'
import { TRPCError } from '@trpc/server'
import { createContext } from '../_core/context'
import { createTestCaller } from '../_core/testCaller'
import { appRouter } from './router'

describe('trpc27 — Domain error normalization', () => {
  it('returns item when id is valid', async () => {
    const ctx = createContext({
      dataAccess: {},
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.getItem({ id: '1' })

    expect(result).toBe('item-1')
  })

  it('maps EntityNotFoundError to NOT_FOUND', async () => {
    const ctx = createContext({
      dataAccess: {},
    })

    const caller = createTestCaller(appRouter, ctx)

    await expect(
      caller.getItem({ id: '2' })
    ).rejects.toBeInstanceOf(TRPCError)

    await expect(
      caller.getItem({ id: '2' })
    ).rejects.toMatchObject({
      code: 'NOT_FOUND',
    })
  })
})