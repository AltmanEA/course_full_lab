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

import { hooks } from './router'
import { trpc } from '../client_core/trpc'

describe('trpc38 - hook composition', () => {
  it('should call user getAll via hooks.user.useUsers', () => {
    hooks.user.useUsers()
    expect(trpc.user.getAll.useQuery).toHaveBeenCalled()
  })

  it('should call post getAll via hooks.post.usePosts', () => {
    hooks.post.usePosts()
    expect(trpc.post.getAll.useQuery).toHaveBeenCalled()
  })
})