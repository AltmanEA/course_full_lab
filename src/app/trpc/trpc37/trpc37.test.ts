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
    }
  }
}))

import { userHooks } from './router'
import { trpc } from '../client_core/trpc'

describe('trpc37 - domain hook grouping', () => {
  it('should call useQuery via userHooks.useUsers', () => {
    userHooks.useUsers()
    expect(trpc.user.getAll.useQuery).toHaveBeenCalled()
  })

  it('should call useMutation via userHooks.useCreateUser', () => {
    userHooks.useCreateUser()
    expect(trpc.user.create.useMutation).toHaveBeenCalled()
  })
})