import { describe, it, expect } from 'vitest'
import { refreshSession } from './bauth25'

describe('bauth25 - Sliding expiration', () => {
  it('should update expiresAt relative to current time', () => {
    const clock = () => 1_000

    const session = {
      userId: 'user-1',
      expiresAt: 500,
    }

    const refreshed = refreshSession(session, 5_000, clock)

    expect(refreshed.expiresAt).toBe(6_000)
  })

  it('should preserve userId', () => {
    const clock = () => 0

    const session = {
      userId: 'abc',
      expiresAt: 100,
    }

    const refreshed = refreshSession(session, 1_000, clock)

    expect(refreshed.userId).toBe('abc')
  })

  it('should return new object reference', () => {
    const clock = () => 0

    const session = {
      userId: 'x',
      expiresAt: 100,
    }

    const refreshed = refreshSession(session, 1_000, clock)

    expect(refreshed).not.toBe(session)
  })
})
