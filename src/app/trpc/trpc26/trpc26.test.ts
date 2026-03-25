import { describe, it, expect } from 'vitest'
import { TRPCError } from '@trpc/server'
import { createContext } from '../_core/context'
import { createTestCaller } from '../_core/testCaller'
import { appRouter } from './router'

describe('trpc26 — Centralized error factory', () => {
  it('returns item when id is valid', async () => {
    const ctx = createContext({
      dataAccess: {},
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.getItem({ id: '1' })

    expect(result).toBe('item-1')
  })

  it('throws NOT_FOUND when id is invalid', async () => {
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