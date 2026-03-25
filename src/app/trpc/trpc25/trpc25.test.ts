import { describe, it, expect } from 'vitest'
import { TRPCError } from '@trpc/server'
import { createContext } from '../_core/context'
import { createTestCaller } from '../_core/testCaller'
import { appRouter } from './router'

describe('trpc25 — Role-based protectedProcedure', () => {
  it('allows ADMIN', async () => {
    const ctx = createContext({
      dataAccess: {},
      user: {
        id: '1',
        role: 'ADMIN',
      },
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.getSecret(undefined)

    expect(result).toBe('secret')
  })

  it('rejects USER role', async () => {
    const ctx = createContext({
      dataAccess: {},
      user: {
        id: '2',
        role: 'USER',
      },
    })

    const caller = createTestCaller(appRouter, ctx)

    await expect(
      caller.getSecret(undefined)
    ).rejects.toBeInstanceOf(TRPCError)

    await expect(
      caller.getSecret(undefined)
    ).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
    })
  })

  it('rejects missing user', async () => {
    const ctx = createContext({
      dataAccess: {},
    })

    const caller = createTestCaller(appRouter, ctx)

    await expect(
      caller.getSecret(undefined)
    ).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
    })
  })
})