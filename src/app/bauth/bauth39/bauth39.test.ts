import { describe, it, expect, vi } from 'vitest'
import { updateEmailRouter, UnauthorizedError } from './bauth39'

describe('bauth39 - Business logic in router anti-pattern', () => {
  it('should throw UnauthorizedError if user is missing', () => {
    expect(() =>
      updateEmailRouter(null, 'a@a.com', () => 'ok')
    ).toThrow(UnauthorizedError)
  })

  it('should not validate email in router', () => {
    const mock = vi.fn().mockReturnValue('updated')

    const result = updateEmailRouter(
      { id: '1' },
      'invalid-email',
      mock
    )

    expect(result).toBe('updated')
    expect(mock).toHaveBeenCalledWith('1', 'invalid-email')
  })

  it('should call access layer for valid user', () => {
    const mock = vi.fn().mockReturnValue('updated')

    const result = updateEmailRouter(
      { id: '1' },
      'test@example.com',
      mock
    )

    expect(result).toBe('updated')
  })
})
