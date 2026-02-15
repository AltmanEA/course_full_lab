export type Session = {
  id: string
  userId: string
  expiresAt: number
}

export function rotateSession(
  session: Session,
  generateId: () => string
): Session {
  return {
    ...session,
    id: session.id, // TODO: сгенерировать новый id
  }
}
