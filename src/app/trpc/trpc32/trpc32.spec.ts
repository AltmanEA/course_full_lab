import { describe, it, expect, vi } from 'vitest'

vi.mock('../client_core/trpc', () => ({
  trpc: {
    user: {
      getById: {
        useQuery: vi.fn()
      }
    }
  }
}))

import { useUserById } from './router'
import { trpc } from '../client_core/trpc'

describe('trpc32 - useQuery with input (client-only)', () => {
  it('should call trpc.user.getById.useQuery with { id } and return its result', () => {
    const mockResult = { data: { id: '1', name: 'Alice' } }

    ;(trpc.user.getById.useQuery as any).mockReturnValue(mockResult)

    const result = useUserById('1')

    expect(trpc.user.getById.useQuery).toHaveBeenCalledWith({ id: '1' })
    expect(result).toBe(mockResult)
  })
})