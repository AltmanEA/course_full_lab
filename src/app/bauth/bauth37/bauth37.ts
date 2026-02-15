export class UnauthorizedError extends Error {}
export class ForbiddenError extends Error {}

export type User = {
  id: string
}

export type Resource = {
  id: string
  ownerId: string
  data: string
}

export function updateResource(
  user: User | null,
  resource: Resource,
  data: string
): Resource {
  // TODO: реализовать проверку прав в access-layer
  return {
    ...resource,
    data,
  }
}
