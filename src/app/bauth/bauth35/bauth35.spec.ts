import { describe, it, expect } from 'vitest'
import { executeProtectedMutation } from './bauth35'

class UnauthorizedError extends Error {
  constructor() {
    super('unauthorized')
    this.name = 'UnauthorizedError'
  }
}

class OtherError extends Error {}

describe('bauth35 - Protected client mutation', () => {
  it('should return mutation result if successful', async () => {
    const result = await executeProtectedMutation(
      async () => 'ok'
    )

    expect(result).toBe('ok')
  })

  it('should redirect on UnauthorizedError', async () => {
    const result = await executeProtectedMutation(
      async () => {
        throw new UnauthorizedError()
      }
    )

    expect(result).toBe('redirect:/login')
  })

  it('should rethrow other errors', async () => {
    await expect(
      executeProtectedMutation(async () => {
        throw new OtherError()
      })
    ).rejects.toThrow(OtherError)
  })
})
