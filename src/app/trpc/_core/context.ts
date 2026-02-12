export interface DataAccess {
  getVersion(): string;
  createUser(name: string): string;
  getUserById(id: string): { id: string; name: string } | null;
  updateUser(id: string, name: string): boolean;
  deleteUser(id: string): boolean;

  createPost(title: string): string;
  getPostById(id: string): { id: string; title: string } | null;
}

export type Context = {
  requestId?: string;
  user?: { id: string } | null;
  dataAccess?: DataAccess;
};

export function createContext(partial?: Partial<Context>): Context {
  return {
    requestId: partial?.requestId,
    user: partial?.user ?? null,
    dataAccess: partial?.dataAccess,
  };
}