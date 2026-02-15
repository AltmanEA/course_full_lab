import { describe, it, expect } from 'vitest'
import { handleAccessError } from './bauth36'

class UnauthorizedError extends Error {
  constructor() {
    super()
    this.name = 'UnauthorizedError'
  }
}

class ForbiddenError extends Error {
  constructor() {
    super()
    this.name = 'ForbiddenError'
  }
}

class OtherError extends Error {}

describe('bauth36 - UI access error handling', () => {
  it('should redirect on UnauthorizedError', () => {
    const result = handleAccessError(
      new UnauthorizedError()
    )

    expect(result).toBe('redirect:/login')
  })

  it('should show forbidden on ForbiddenError', () => {
    const result = handleAccessError(
      new ForbiddenError()
    )

    expect(result).toBe('show:forbidden')
  })

  it('should show generic error for other errors', () => {
    const result = handleAccessError(
      new OtherError()
    )

    expect(result).toBe('show:generic-error')
  })
})
