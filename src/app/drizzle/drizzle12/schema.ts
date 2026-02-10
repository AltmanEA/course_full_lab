export function selectAssignmentsOrderedByMaxScore(
  db: {
    select: () => {
      from: (table: unknown) => {
        orderBy: (order: unknown) => unknown;
      };
    };
  },
  assignmentsTable: {
    maxScore: unknown;
  },
  desc: (column: unknown) => unknown,
) {
// TODO: реализовать select с сортировкой
}
