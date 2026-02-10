export function deleteGradeByStudentAndAssignment(
  db: {
    delete: (table: unknown) => {
      where: (condition: unknown) => unknown;
    };
  },
  gradesTable: {
    studentId: unknown;
    assignmentId: unknown;
  },
  and: (...conditions: unknown[]) => unknown,
  eq: (left: unknown, right: unknown) => unknown,
  studentId: number,
  assignmentId: number,
) {
  // TODO: реализовать delete-запрос с составным where
}
