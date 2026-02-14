export type User = {
  id: string;
  email: string;
};

export type Context = {
  user: User | null;
};

export function currentUser(ctx: Context) {
  // TODO: вернуть текущего пользователя
}
