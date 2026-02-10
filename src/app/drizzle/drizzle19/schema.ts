export function selectStudentEmailAndGrade(
  db: {
    select: (fields: unknown) => {
      from: (table: unknown) => {
        innerJoin: (
          table: unknown,
          on: unknown,
        ) => unknown;
      };
    };
  },
  gradesTable: {
    studentId: unknown;
    score: unknown;
  },
  studentsTable: {
    id: unknown;
    email: unknown;
  },
  eq: (left: unknown, right: unknown) => unknown,
) {
  // TODO: реализовать select с join и projection
}
