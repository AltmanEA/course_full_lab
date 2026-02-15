export type Role = 'USER' | 'ADMIN'

export type User = {
  id: string
  email: string
  role: Role
}

export function renderForRole(
  user: User | null,
  requiredRole: Role,
  content: string
): string | null {
  // TODO: реализовать role-based отображение
  return content
}
