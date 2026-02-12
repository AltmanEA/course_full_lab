import { describe, it, expect } from 'vitest'
import { TRPCError } from '@trpc/server'
import { createContext } from '../_core/context'
import { createTestCaller } from '../_core/testCaller'
import { appRouter } from './router'

describe('trpc21 — Request metadata in context', () => {
  it('returns requestId from context', async () => {
    const ctx = createContext({
      dataAccess: {},
      requestId: 'req-123',
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.getRequestId(undefined)

    expect(result).toBe('req-123')
  })

  it('throws INTERNAL_SERVER_ERROR if requestId is missing', async () => {
    const ctx = createContext({
      dataAccess: {},
    })

    const caller = createTestCaller(appRouter, ctx)

    await expect(
      caller.getRequestId(undefined)
    ).rejects.toBeInstanceOf(TRPCError)

    await expect(
      caller.getRequestId(undefined)
    ).rejects.toMatchObject({
      code: 'INTERNAL_SERVER_ERROR',
    })
  })
})