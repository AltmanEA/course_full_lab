export function createGradeWithRollback(
  db: {
    transaction: (
      fn: (tx: unknown) => unknown,
    ) => unknown;
  },
  firstOperation: (tx: unknown, data: unknown) => unknown,
  secondOperation: (tx: unknown, data: unknown) => unknown,
  firstData: unknown,
  secondData: unknown,
) {
  // TODO: реализовать транзакцию с rollback при ошибке
}
