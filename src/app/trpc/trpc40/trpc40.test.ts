import { describe, it, expect, vi } from 'vitest'

vi.mock('../client_core/trpc', () => ({
  trpc: {
    user: {
      getAll: {
        useQuery: vi.fn()
      },
      create: {
        useMutation: vi.fn()
      }
    },
    useUtils: vi.fn()
  }
}))

import { useUserModule } from './router'
import { trpc } from '../client_core/trpc'

describe('trpc40 - full data-flow scenario', () => {
  it('should execute full client data-flow', () => {
    const mockQuery = { data: [] }
    const mockMutation = { mutate: vi.fn() }
    const mockInvalidate = vi.fn()

    ;(trpc.user.getAll.useQuery as any).mockReturnValue(mockQuery)
    ;(trpc.user.create.useMutation as any).mockReturnValue(mockMutation)
    ;(trpc.useUtils as any).mockReturnValue({
      user: {
        getAll: {
          invalidate: mockInvalidate
        }
      }
    })

    const result = useUserModule()

    expect(trpc.user.getAll.useQuery).toHaveBeenCalled()
    expect(trpc.user.create.useMutation).toHaveBeenCalled()
    expect(trpc.useUtils).toHaveBeenCalled()
    expect(mockInvalidate).toHaveBeenCalled()

    expect(result).toEqual({
      users: mockQuery,
      createUser: mockMutation,
    })
  })
})