import { describe, it, expect, vi } from 'vitest'

vi.mock('../client_core/trpc', () => ({
  trpc: {
    user: {
      create: {
        useMutation: vi.fn()
      },
      getAll: {
        invalidate: vi.fn()
      }
    },
    useUtils: vi.fn()
  }
}))

import { useCreateUserWithInvalidate } from './router'
import { trpc } from '../client_core/trpc'

describe('trpc34 - invalidate after mutation', () => {
  it('should call useMutation, useUtils and invalidate getAll', () => {
    const mockMutation = { mutate: vi.fn() }

    ;(trpc.user.create.useMutation as any).mockReturnValue(mockMutation)

    const mockInvalidate = vi.fn()

    ;(trpc.useUtils as any).mockReturnValue({
      user: {
        getAll: {
          invalidate: mockInvalidate
        }
      }
    })

    const result = useCreateUserWithInvalidate()

    expect(trpc.user.create.useMutation).toHaveBeenCalled()
    expect(trpc.useUtils).toHaveBeenCalled()
    expect(mockInvalidate).toHaveBeenCalled()
    expect(result).toBe(mockMutation)
  })
})