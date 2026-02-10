export function selectStudentsPage(
  db: {
    select: () => {
      from: (table: unknown) => {
        limit: (value: number) => {
          offset: (value: number) => unknown;
        };
      };
    };
  },
  studentsTable: unknown,
  limitValue: number,
  offsetValue: number,
) {
    // TODO: реализовать select с limit и offset
}
