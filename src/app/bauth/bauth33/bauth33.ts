export type User = {
  id: string
  email: string
}

export type LayoutResult =
  | { redirectTo: string }
  | { allow: true }

export function layoutGuard(
  user: User | null,
  currentPath: string
): LayoutResult {
  // TODO: реализовать redirect-логику
  return { allow: true }
}
