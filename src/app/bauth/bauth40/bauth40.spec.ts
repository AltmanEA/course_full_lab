import { describe, it, expect, vi } from 'vitest'
import {
  executeUpdateFlow,
  UnauthorizedError,
} from './bauth40'

class ForbiddenError extends Error {}

describe('bauth40 - Full protected data-flow', () => {
  const resource = {
    id: '1',
    ownerId: 'owner-1',
    data: 'old',
  }

  it('should throw if cookie is missing', () => {
    const storage = { find: vi.fn() }

    expect(() =>
      executeUpdateFlow(
        null,
        storage,
        resource,
        'new',
        vi.fn()
      )
    ).toThrow(UnauthorizedError)
  })

  it('should throw if session not found', () => {
    const storage = { find: vi.fn().mockReturnValue(null) }

    expect(() =>
      executeUpdateFlow(
        'abc',
        storage,
        resource,
        'new',
        vi.fn()
      )
    ).toThrow(UnauthorizedError)
  })

  it('should propagate ForbiddenError from access-layer', () => {
    const storage = {
      find: vi.fn().mockReturnValue({
        id: 's1',
        userId: 'other-user',
      }),
    }

    const access = vi.fn(() => {
      throw new ForbiddenError()
    })

    expect(() =>
      executeUpdateFlow(
        'abc',
        storage,
        resource,
        'new',
        access
      )
    ).toThrow(ForbiddenError)
  })

  it('should update resource for owner', () => {
    const storage = {
      find: vi.fn().mockReturnValue({
        id: 's1',
        userId: 'owner-1',
      }),
    }

    const access = vi.fn().mockReturnValue({
      ...resource,
      data: 'new',
    })

    const result = executeUpdateFlow(
      'abc',
      storage,
      resource,
      'new',
      access
    )

    expect(result.data).toBe('new')
  })
})
