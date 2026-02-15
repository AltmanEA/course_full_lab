export type Session = {
  userId: string
  expiresAt: number
}

export function createSession(
  userId: string,
  ttlMs: number,
  clock: () => number
): Session {
  const now = clock()

  return {
    userId,
    expiresAt: now, // TODO: вычислить корректное абсолютное expiration
  }
}
