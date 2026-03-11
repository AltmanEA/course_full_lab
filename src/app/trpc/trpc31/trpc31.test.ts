import { describe, it, expect, vi } from 'vitest'

vi.mock('../client_core/trpc', () => ({
  trpc: {
    user: {
      getAll: {
        useQuery: vi.fn()
      }
    }
  }
}))

import { useUsers } from './router'
import { trpc } from '../client_core/trpc'

describe('trpc31 - first useQuery hook (client-only)', () => {
  it('should call trpc.user.getAll.useQuery and return its result', () => {
    const mockResult = { data: [{ id: '1', name: 'Alice' }] }

    ;(trpc.user.getAll.useQuery as any).mockReturnValue(mockResult)

    const result = useUsers()

    expect(trpc.user.getAll.useQuery).toHaveBeenCalled()
    expect(result).toBe(mockResult)
  })
})