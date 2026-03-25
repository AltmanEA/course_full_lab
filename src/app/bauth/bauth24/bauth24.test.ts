import { describe, it, expect } from 'vitest'
import { createSession } from './bauth24'

describe('bauth24 - Absolute expiration', () => {
  it('should set expiresAt to now + ttlMs', () => {
    const fakeNow = 1_000
    const clock = () => fakeNow

    const session = createSession('user-1', 5_000, clock)

    expect(session.expiresAt).toBe(fakeNow + 5_000)
  })

  it('should work with different ttl values', () => {
    const fakeNow = 10_000
    const clock = () => fakeNow

    const session = createSession('user-2', 60_000, clock)

    expect(session.expiresAt).toBe(70_000)
  })

  it('should preserve userId', () => {
    const clock = () => 0

    const session = createSession('abc', 1_000, clock)

    expect(session.userId).toBe('abc')
  })
})
