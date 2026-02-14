export type User = {
  id: string;
  email: string;
};

export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export type AuthService = {
  register: (params: {
    email: string;
    password: string;
  }) => Promise<User>;

  login: (params: {
    email: string;
    password: string;
  }) => Promise<{ user: User; session: Session }>;

  getSession: (request: unknown) => Promise<Session | null>;

  invalidateSession: (sessionId: string) => Promise<void>;
};

export async function runAuthLifecycle(
  authService: AuthService,
  email: string,
  password: string,
  request: unknown
) {
  // TODO: реализовать полный lifecycle
}
