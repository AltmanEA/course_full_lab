import { describe, it, expect, vi } from 'vitest'
import { createContext } from '../_core/context'
import { createTestCaller } from '../_core/testCaller'
import { appRouter } from './router'

describe('trpc22 — Timing middleware', () => {
  it('returns pong', async () => {
    const logger = {
      info: vi.fn(),
      error: vi.fn(),
    }

    const ctx = createContext({
      dataAccess: {},
      logger,
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.ping(undefined)

    expect(result).toBe('pong')
  })

  it('calls logger.info with execution time', async () => {
    const logger = {
      info: vi.fn(),
      error: vi.fn(),
    }

    const ctx = createContext({
      dataAccess: {},
      logger,
    })

    const caller = createTestCaller(appRouter, ctx)

    await caller.ping(undefined)

    expect(logger.info).toHaveBeenCalledTimes(1)

    const firstCall = logger.info.mock.calls[0]

    if (!firstCall) {
      throw new Error('logger.info was not called')
    }

    const message = firstCall[0]

    expect(typeof message).toBe('string')
    expect(message.includes('ms')).toBe(true)
  })

  it('does not throw if logger is missing', async () => {
    const ctx = createContext({
      dataAccess: {},
    })

    const caller = createTestCaller(appRouter, ctx)

    const result = await caller.ping(undefined)

    expect(result).toBe('pong')
  })
})