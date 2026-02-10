export function countGradesByAssignment(
  db: {
    select: (fields: unknown) => {
      from: (table: unknown) => {
        innerJoin: (
          table: unknown,
          on: unknown,
        ) => {
          groupBy: (field: unknown) => unknown;
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
) {
 // TODO: реализовать select с join, count и groupBy
}
