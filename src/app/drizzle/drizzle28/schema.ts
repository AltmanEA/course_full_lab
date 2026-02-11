export function getStudentsLimited(
  db: {
    select: () => {
      limit: (value: number) => unknown;
    };
  },
  limit: number,
) {
  // TODO: реализовать data-access функцию с limit
}
