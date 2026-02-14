export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export type Clock = () => Date;

export function validateSession(
  session: Session,
  clock: Clock
): Session | null {
  // TODO: реализовать проверку expiration
}
