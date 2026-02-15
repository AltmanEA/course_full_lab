export class UnauthorizedError extends Error {}

export type User = {
  id: string
  email: string
}

export type Context = {
  user: User | null
}

export function currentUserQuery(ctx: Context): User {
  // TODO: реализовать корректную проверку
  return ctx.user as User
}
