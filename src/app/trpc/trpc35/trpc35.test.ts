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

import { useCreateUserWithSuccess } from './router'
import { trpc } from '../client_core/trpc'

describe('trpc35 - useMutation with onSuccess', () => {
  it('should call useMutation with onSuccess callback and return its result', () => {
    const mockMutation = { mutate: vi.fn() }

    ;(trpc.user.create.useMutation as any).mockReturnValue(mockMutation)

    const result = useCreateUserWithSuccess()

    expect(trpc.user.create.useMutation).toHaveBeenCalled()

    const callArgs = (trpc.user.create.useMutation as any).mock.calls[0][0]

    expect(typeof callArgs.onSuccess).toBe('function')
    expect(result).toBe(mockMutation)
  })
})