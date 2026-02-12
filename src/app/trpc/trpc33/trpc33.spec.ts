import { describe, it, expect, vi } from 'vitest'

vi.mock('../client_core/trpc', () => ({
  trpc: {
    user: {
      create: {
        useMutation: vi.fn()
      }
    }
  }
}))

import { useCreateUser } from './router'
import { trpc } from '../client_core/trpc'

describe('trpc33 - first useMutation (client-only)', () => {
  it('should call trpc.user.create.useMutation and return its result', () => {
    const mockResult = { mutate: vi.fn() }

    ;(trpc.user.create.useMutation as any).mockReturnValue(mockResult)

    const result = useCreateUser()

    expect(trpc.user.create.useMutation).toHaveBeenCalled()
    expect(result).toBe(mockResult)
  })
})