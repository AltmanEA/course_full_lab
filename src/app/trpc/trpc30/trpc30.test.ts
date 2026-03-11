import { describe, it, expect } from 'vitest'
import { createContext } from '../_core/context'
import { createTestCaller } from '../_core/testCaller'
import { appRouter } from './router'

describe('trpc30 — Shared context mutation', () => {
  it('injects requestId into context', async () => {
    const ctx = createContext({
      dataAccess: {},
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.getInfo(undefined)

    expect(result).toBe('request:req-123')
  })
})