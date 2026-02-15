export type Session = {
  userId: string
  expiresAt: number
}

export function refreshSession(
  session: Session,
  ttlMs: number,
  clock: () => number
): Session {
  const now = clock()

  return {
    ...session,
    expiresAt: session.expiresAt, // TODO: реализовать sliding expiration
  }
}
