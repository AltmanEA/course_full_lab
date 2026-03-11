import { describe, it, expect } from 'vitest'
import { layoutGuard } from './bauth33'

describe('bauth33 - Layout-level redirect', () => {
  it('should redirect to /login if user is missing', () => {
    const result = layoutGuard(null, '/dashboard')

    expect(result).toEqual({ redirectTo: '/login' })
  })

  it('should allow access if user exists', () => {
    const result = layoutGuard(
      { id: '1', email: 'a@a.com' },
      '/dashboard'
    )

    expect(result).toEqual({ allow: true })
  })
})
