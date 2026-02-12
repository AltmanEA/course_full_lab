import { trpc } from '../client_core/trpc'

export const userHooks = {
  useUsers: () => trpc.user.getAll.useQuery(),
  useCreateUser: () => trpc.user.create.useMutation(),
}