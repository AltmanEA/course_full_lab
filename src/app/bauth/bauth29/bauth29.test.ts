import { describe, it, expect, vi } from 'vitest'
import { getSessionFromCookie } from './bauth29'

describe('bauth29 - Missing cookie handling', () => {
  it('should return null if cookie is missing', () => {
    const storage = {
      find: vi.fn(),
    }

    const result = getSessionFromCookie(null, storage)

    expect(result).toBeNull()
    expect(storage.find).not.toHaveBeenCalled()
  })

  it('should return null if session not found', () => {
    const storage = {
      find: vi.fn().mockReturnValue(null),
    }

    const result = getSessionFromCookie('abc', storage)

    expect(result).toBeNull()
  })

  it('should return session if found', () => {
    const session = {
      id: 'abc',
      userId: 'user-1',
    }

    const storage = {
      find: vi.fn().mockReturnValue(session),
    }

    const result = getSessionFromCookie('abc', storage)

    expect(result).toEqual(session)
  })
})
