export function selectAssignmentsOrderedByGradesCount(
  db: {
    select: (fields: unknown) => {
      from: (table: unknown) => {
        innerJoin: (
          table: unknown,
          on: unknown,
        ) => {
          groupBy: (field: unknown) => {
            orderBy: (order: unknown) => unknown;
          };
        };
      };
    };
  },
  assignmentsTable: {
    id: unknown;
  },
  gradesTable: {
    assignmentId: unknown;
  },
  eq: (left: unknown, right: unknown) => unknown,
  count: (arg: unknown) => unknown,
  desc: (arg: unknown) => unknown,
) {
    const gradesCount = count(gradesTable);

    // TODO: реализовать select с groupBy и orderBy по агрегату
}
