export function serverSelect(
  db: {
    select: () => unknown;
  },
) {
  return db.select();
}
