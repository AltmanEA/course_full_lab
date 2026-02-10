export function selectAssignmentsByStudent(
  db: {
    select: () => {
      from: (table: unknown) => {
        innerJoin: (
          table: unknown,
          on: unknown,
        ) => {
          innerJoin: (
            table: unknown,
            on: unknown,
          ) => {
            where: (condition: unknown) => unknown;
          };
        };
      };
    };
  },
  studentsTable: {
    id: unknown;
  },
  gradesTable: {
    studentId: unknown;
    assignmentId: unknown;
  },
  assignmentsTable: {
    id: unknown;
  },
  eq: (left: unknown, right: unknown) => unknown,
  studentId: number,
) {
  // TODO: реализовать select с двумя join и where
}
