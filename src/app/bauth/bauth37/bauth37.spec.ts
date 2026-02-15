import { describe, it, expect } from 'vitest'
import {
  updateResource,
  UnauthorizedError,
  ForbiddenError,
} from './bauth37'

describe('bauth37 - Access-layer ownership check', () => {
  const resource = {
    id: '1',
    ownerId: 'owner-1',
    data: 'old',
  }

  it('should throw UnauthorizedError if user is missing', () => {
    expect(() =>
      updateResource(null, resource, 'new')
    ).toThrow(UnauthorizedError)
  })

  it('should throw ForbiddenError if user is not owner', () => {
    expect(() =>
      updateResource(
        { id: 'other-user' },
        resource,
        'new'
      )
    ).toThrow(ForbiddenError)
  })

  it('should update resource if user is owner', () => {
    const result = updateResource(
      { id: 'owner-1' },
      resource,
      'new'
    )

    expect(result.data).toBe('new')
    expect(result.ownerId).toBe('owner-1')
  })
})
