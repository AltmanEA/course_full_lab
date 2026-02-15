import { describe, it, expect } from 'vitest'
import { rotateSession } from './bauth26'

describe('bauth26 - Session rotation', () => {
  it('should generate new id', () => {
    const session = {
      id: 'old-id',
      userId: 'user-1',
      expiresAt: 1_000,
    }

    const rotated = rotateSession(session, () => 'new-id')

    expect(rotated.id).toBe('new-id')
  })

  it('should preserve userId', () => {
    const session = {
      id: '1',
      userId: 'abc',
      expiresAt: 100,
    }

    const rotated = rotateSession(session, () => '2')

    expect(rotated.userId).toBe('abc')
  })

  it('should preserve expiresAt', () => {
    const session = {
      id: '1',
      userId: 'abc',
      expiresAt: 5000,
    }

    const rotated = rotateSession(session, () => '2')

    expect(rotated.expiresAt).toBe(5000)
  })

  it('should return new object reference', () => {
    const session = {
      id: '1',
      userId: 'abc',
      expiresAt: 100,
    }

    const rotated = rotateSession(session, () => '2')

    expect(rotated).not.toBe(session)
  })
})
