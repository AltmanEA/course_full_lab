import { trpc } from '../client_core/trpc'

export function useUsers() {
  return trpc.user.getAll.useQuery()
}