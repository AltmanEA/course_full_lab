import { describe, it, expect, vi } from "vitest";

describe("drizzle24 — createGradeWithCounterUpdate", async () => {
  const transaction = vi.fn((fn) => {
    const tx = { name: "tx" };
    return fn(tx);
  });

  const insertGrade = vi.fn();
  const updateStudentCounter = vi.fn();

  const fakeDb = { transaction };

  const gradeData = { score: 5 };
  const counterData = { studentId: 1 };

  const { createGradeWithCounterUpdate } = await import("./schema");

  it("выполняет два запроса внутри транзакции", () => {
    const result = createGradeWithCounterUpdate(
      fakeDb,
      insertGrade,
      updateStudentCounter,
      gradeData,
      counterData,
    );

    expect(transaction).toHaveBeenCalledTimes(1);

    expect(insertGrade).toHaveBeenCalledTimes(1);
    expect(updateStudentCounter).toHaveBeenCalledTimes(1);

    const txArg = insertGrade.mock.calls[0][0];
    expect(updateStudentCounter).toHaveBeenCalledWith(txArg, counterData);

    expect(result).toBeUndefined();
  });
});
