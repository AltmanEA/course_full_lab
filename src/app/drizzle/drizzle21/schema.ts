export function countGradesByStudent(
  db: {
    select: (fields: unknown) => {
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
  studentsTable: {
    id: unknown;
  },
  gradesTable: {
    studentId: unknown;
  },
  eq: (left: unknown, right: unknown) => unknown,
  count: (arg: unknown) => unknown,
  studentId: number,
) {
  // TODO: реализовать select с join и count
}
