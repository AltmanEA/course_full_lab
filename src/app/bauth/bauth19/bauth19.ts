export type User = {
  id: string;
  email: string;
};

export type Context = {
  user: User | null;
};

export class UnauthorizedError extends Error {
  constructor() {
    super("UNAUTHORIZED");
  }
}

export function getProfile(ctx: Context): string {
  // TODO: реализовать DI-гарантию
}
