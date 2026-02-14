export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export type AuthService = {
  login: (params: {
    email: string;
    password: string;
  }) => Promise<{
    user: { id: string; email: string };
    session: Session;
  }>;
};

export async function loginUser(
  authService: AuthService,
  email: string,
  password: string
) {
  // TODO: вызвать login через authService
}
