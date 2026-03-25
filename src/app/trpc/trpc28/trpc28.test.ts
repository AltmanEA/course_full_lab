import { describe, it, expect, vi } from 'vitest'
import { createContext } from '../_core/context'
import { createTestCaller } from '../_core/testCaller'
import { appRouter } from './router'

describe('trpc28 — Logging middleware (deterministic)', () => {
  it('logs success', async () => {
    const logger = {
      info: vi.fn(),
      error: vi.fn(),
    }

    const ctx = createContext({
      dataAccess: {},
      logger,
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.getData({ ok: true })

    expect(result).toBe('ok')
    expect(logger.info).toHaveBeenCalledTimes(1)
    expect(logger.error).not.toHaveBeenCalled()
  })

  it('logs error result', async () => {
    const logger = {
      info: vi.fn(),
      error: vi.fn(),
    }

    const ctx = createContext({
      dataAccess: {},
      logger,
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.getData({ ok: false })

    expect(result).toBe('error')
    expect(logger.error).toHaveBeenCalledTimes(1)
    expect(logger.info).not.toHaveBeenCalled()
  })
})