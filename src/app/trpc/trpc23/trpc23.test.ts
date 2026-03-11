import { describe, it, expect, vi } from 'vitest'
import { createContext } from '../_core/context'
import { createTestCaller } from '../_core/testCaller'
import { appRouter } from './router'

describe('trpc23 — Audit middleware', () => {
  it('returns world', async () => {
    const ctx = createContext({
      dataAccess: {},
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.hello(undefined)

    expect(result).toBe('world')
  })

  it('calls auditService.record with path and result', async () => {
    const auditService = {
      record: vi.fn(),
    }

    const ctx = createContext({
      dataAccess: {},
      auditService,
    })

    const caller = createTestCaller(appRouter, ctx)

    await caller.hello(undefined)

    expect(auditService.record).toHaveBeenCalledTimes(1)

    const call = auditService.record.mock.calls[0]

    if (!call) {
      throw new Error('auditService.record was not called')
    }

    const payload = call[0]

    expect(payload).toMatchObject({
      path: 'hello',
      result: 'world',
    })
  })

  it('does not throw if auditService is missing', async () => {
    const ctx = createContext({
      dataAccess: {},
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.hello(undefined)

    expect(result).toBe('world')
  })
})