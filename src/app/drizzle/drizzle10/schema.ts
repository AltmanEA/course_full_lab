export function deleteAssignmentById(
  db: {
    delete: (table: unknown) => {
      where: (condition: unknown) => unknown;
    };
  },
  assignmentsTable: {
    id: unknown;
  },
  eq: (left: unknown, right: unknown) => unknown,
  id: number,
) {
  // TODO: реализовать delete-запрос
}
