export class UnauthorizedError extends Error {}

export type User = {
  id: string
}

export function updateEmailRouter(
  user: User | null,
  newEmail: string,
  accessUpdate: (userId: string, email: string) => string
): string {
  // ❗ Анти-паттерн: router содержит бизнес-валидацию

  if (!user) {
    throw new UnauthorizedError()
  }

  if (!newEmail.includes('@')) {
    throw new Error('Invalid email') // TODO: убрать бизнес-логику из router
  }

  return accessUpdate(user.id, newEmail)
}
