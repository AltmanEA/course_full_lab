export type Session = {
  id: string
  userId: string
}

export type SessionStorage = {
  find: (sessionId: string) => Session | null
}

export function getSessionFromCookie(
  cookie: string | null,
  storage: SessionStorage
): Session | null {
  // TODO: реализовать корректную обработку отсутствующего cookie
  return null
}
