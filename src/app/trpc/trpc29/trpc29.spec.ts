import { describe, it, expect } from 'vitest'
import { createContext } from '../_core/context'
import { createTestCaller } from '../_core/testCaller'
import { appRouter } from './router'

describe('trpc29 — Middleware composition order', () => {
  it('applies middleware in declared order', async () => {
    const ctx = createContext({
      dataAccess: {},
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.getValue(undefined)

    expect(result).toBe('prefix-value-suffix')
  })
})