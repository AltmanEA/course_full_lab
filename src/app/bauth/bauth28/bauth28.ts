export class UnauthorizedError extends Error {}

export type Session = {
  id: string
}

export type User = {
  id: string
}

export function routeGuard(session: Session | null): true {
  // TODO: реализовать проверку
  return true
}

export function procedureGuard(user: User | null): true {
  // TODO: реализовать проверку
  return true
}
