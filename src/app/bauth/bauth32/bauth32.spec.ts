import { describe, it, expect } from 'vitest'
import { uiGuard } from './bauth32'

describe('bauth32 - UI Guard', () => {
  it('should return null if user is missing', () => {
    const result = uiGuard(null, 'secret')

    expect(result).toBeNull()
  })

  it('should return content if user exists', () => {
    const result = uiGuard(
      { id: '1', email: 'a@a.com' },
      'secret'
    )

    expect(result).toBe('secret')
  })
})
