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

export async function protectedProcedure<T>(
  ctx: Context,
  handler: () => Promise<T>
): Promise<T> {
  // TODO: реализовать проверку авторизации
}
