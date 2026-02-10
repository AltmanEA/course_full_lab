export function selectGradesByStudentId(
  db: {
    select: () => {
      from: (table: unknown) => {
        innerJoin: (
          table: unknown,
          on: unknown,
        ) => {
          where: (condition: unknown) => unknown;
        };
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
  studentId: number,
) {
 // TODO: реализовать select с join и where
}
