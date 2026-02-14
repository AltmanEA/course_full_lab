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

export async function updateProfileAccess<T>(
  currentUserId: string | null,
  ownerId: string,
  operation: () => Promise<T>
): Promise<T> {
  // TODO: реализовать ownership в access-layer
}
