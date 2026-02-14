export type Role = "USER" | "ADMIN";

export type User = {
  id: string;
  email: string;
  role: Role;
};

export type Context = {
  user: User | null;
};

export class UnauthorizedError extends Error {
  constructor() {
    super("UNAUTHORIZED");
  }
}

export class ForbiddenError extends Error {
  constructor() {
    super("FORBIDDEN");
  }
}

export async function adminProcedure<T>(
  ctx: Context,
  handler: () => Promise<T>
): Promise<T> {
  // TODO: реализовать RBAC
}
