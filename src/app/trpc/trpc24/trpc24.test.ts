import { describe, it, expect } from 'vitest'
import { createContext } from '../_core/context'
import { createTestCaller } from '../_core/testCaller'
import { appRouter } from './router'

describe('trpc24 — Response wrapping middleware', () => {
  it('wraps result with requestId', async () => {
    const ctx = createContext({
      dataAccess: {},
      requestId: 'req-1',
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.getMessage(undefined)

    expect(result).toEqual({
      data: 'hello',
      requestId: 'req-1',
    })
  })

  it('sets requestId to undefined if missing', async () => {
    const ctx = createContext({
      dataAccess: {},
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.getMessage(undefined)

    expect(result).toEqual({
      data: 'hello',
      requestId: undefined,
    })
  })
})