export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export type AuthService = {
  getSession: (request: unknown) => Promise<Session | null>;
};

export async function getCurrentSession(
  authService: AuthService,
  request: unknown
) {
  const session = await authService.getSession(request);

  return session;
}
