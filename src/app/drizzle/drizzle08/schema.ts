export function selectStudentByEmail(
  db: {
    select: () => {
      from: (table: unknown) => {
        where: (condition: unknown) => unknown;
      };
    };
  },
  studentsTable: {
    email: unknown;
  },
  eq: (left: unknown, right: unknown) => unknown,
  email: string,
) {
    // TODO: реализовать select-запрос с where
}
