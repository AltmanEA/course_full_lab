export type User = {
  id: string;
  email: string;
};

export type Session = {
  id: string;
  user: User;
  expiresAt: Date;
};

export type AuthService = {
  getSession: (request: unknown) => Promise<Session | null>;
};

export async function createContext(
  authService: AuthService,
  request: unknown
) {
  // TODO: получить session и вернуть { user }
}
