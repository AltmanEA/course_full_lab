export class UnauthorizedError extends Error {}
export class ForbiddenError extends Error {}

export type Role = 'USER' | 'ADMIN'

export type User = {
  id: string
  role: Role
}

export function uiOnlyDelete(
  user: User | null,
  deleteFromDb: () => string
): string {
  // ❗ Анти-паттерн:
  // Предполагается, что проверка роли уже выполнена в UI

  return deleteFromDb() // TODO: реализовать корректную server-side проверку
}
