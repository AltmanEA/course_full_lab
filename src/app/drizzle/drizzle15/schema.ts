export function countStudents(
  db: {
    select: (fields: unknown) => {
      from: (table: unknown) => unknown;
    };
  },
  studentsTable: unknown,
  count: (arg: unknown) => unknown,
) {
  // TODO: реализовать агрегатный select
}
