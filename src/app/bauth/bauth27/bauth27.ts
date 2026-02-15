export class CsrfError extends Error {}

export function validateCsrf(
  sessionToken: string | null,
  requestToken: string | null
): true {
  // TODO: реализовать проверку CSRF
  return true
}
