export function selectStudentEmails(
  db: {
    select: (fields: unknown) => {
      from: (table: unknown) => unknown;
    };
  },
  studentsTable: {
    id: unknown;
    email: unknown;
  },
) {
  // TODO: реализовать select с ограничением полей
}
