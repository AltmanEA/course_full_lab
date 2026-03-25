import { describe, it, expect } from 'vitest'
import {
  currentUserQuery,
  UnauthorizedError,
} from './bauth31'

describe('bauth31 - currentUser query', () => {
  it('should throw if user is missing', () => {
    expect(() =>
      currentUserQuery({ user: null })
    ).toThrow(UnauthorizedError)
  })

  it('should return user if exists', () => {
    const user = {
      id: '1',
      email: 'test@example.com',
    }

    const result = currentUserQuery({ user })

    expect(result).toEqual(user)
  })
})
