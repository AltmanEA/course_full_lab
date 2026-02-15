export type User = {
  id: string
  email: string
}

export function uiGuard(
  user: User | null,
  content: string
): string | null {
  // TODO: реализовать UI-level защиту
  return content
}
