export type AuthService = {
  invalidateSession: (sessionId: string) => Promise<void>;
};

export async function logoutUser(
  authService: AuthService,
  sessionId: string
) {
  // TODO: вызвать инвалидирование session
}
