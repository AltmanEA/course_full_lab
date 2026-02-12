import { describe, it, expect, vi } from 'vitest'

vi.mock('../client_core/trpc', () => ({
  trpc: {
    user: {
      getAll: {
        useQuery: vi.fn()
      }
    },
    post: {
      getAll: {
        useQuery: vi.fn()
      }
    }
  }
}))

import { hooks } from './index'
import { trpc } from '../client_core/trpc'

describe('trpc39 - centralized export', () => {
  it('should call user useQuery via index export', () => {
    hooks.user.useUsers()
    expect(trpc.user.getAll.useQuery).toHaveBeenCalled()
  })

  it('should call post useQuery via index export', () => {
    hooks.post.usePosts()
    expect(trpc.post.getAll.useQuery).toHaveBeenCalled()
  })
})