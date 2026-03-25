import { describe, it, expect, vi } from 'vitest'
import {
  uiOnlyDelete,
  UnauthorizedError,
  ForbiddenError,
} from './bauth38'

describe('bauth38 - UI-only RBAC anti-pattern', () => {
  it('should throw UnauthorizedError if user is missing', () => {
    expect(() =>
      uiOnlyDelete(null, () => 'deleted')
    ).toThrow(UnauthorizedError)
  })

  it('should throw ForbiddenError if role is USER', () => {
    expect(() =>
      uiOnlyDelete(
        { id: '1', role: 'USER' },
        () => 'deleted'
      )
    ).toThrow(ForbiddenError)
  })

  it('should execute delete for ADMIN role', () => {
    const mock = vi.fn().mockReturnValue('deleted')

    const result = uiOnlyDelete(
      { id: '1', role: 'ADMIN' },
      mock
    )

    expect(result).toBe('deleted')
    expect(mock).toHaveBeenCalled()
  })
})
