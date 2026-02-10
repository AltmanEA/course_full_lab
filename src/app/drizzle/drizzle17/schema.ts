export function selectAssignmentsWithGrades(
  db: {
    select: () => {
      from: (table: unknown) => {
        leftJoin: (
          table: unknown,
          on: unknown,
        ) => unknown;
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
) {
  // TODO: реализовать select с leftJoin
}
