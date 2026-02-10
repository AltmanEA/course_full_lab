export function selectGradesWithStudents(
  db: {
    select: () => {
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
  },
  studentsTable: {
    id: unknown;
  },
  eq: (left: unknown, right: unknown) => unknown,
) {
  return db
  // TODO: реализовать select с innerJoin
}
