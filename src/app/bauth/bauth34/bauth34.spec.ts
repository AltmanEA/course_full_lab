import { describe, it, expect } from 'vitest'
import { renderForRole } from './bauth34'

describe('bauth34 - Role-based UI rendering', () => {
  it('should return null if user is missing', () => {
    const result = renderForRole(null, 'ADMIN', 'secret')

    expect(result).toBeNull()
  })

  it('should return null if role does not match', () => {
    const user = {
      id: '1',
      email: 'a@a.com',
      role: 'USER' as const,
    }

    const result = renderForRole(user, 'ADMIN', 'secret')

    expect(result).toBeNull()
  })

  it('should return content if role matches', () => {
    const user = {
      id: '1',
      email: 'a@a.com',
      role: 'ADMIN' as const,
    }

    const result = renderForRole(user, 'ADMIN', 'secret')

    expect(result).toBe('secret')
  })
})
