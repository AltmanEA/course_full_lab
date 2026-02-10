import { describe, it, expect, vi } from "vitest";

describe("drizzle25 — createGradeWithRollback", async () => {
  const error = new Error("boom");

  const transaction = vi.fn((fn) => {
    const tx = { name: "tx" };
    return fn(tx);
  });

  const firstOperation = vi.fn();
  const secondOperation = vi.fn(() => {
    throw error;
  });

  const fakeDb = { transaction };

  const { createGradeWithRollback } = await import("./schema");

  it("пробрасывает ошибку и прерывает транзакцию", () => {
    expect(() =>
      createGradeWithRollback(
        fakeDb,
        firstOperation,
        secondOperation,
        { a: 1 },
        { b: 2 },
      ),
    ).toThrow(error);

    expect(transaction).toHaveBeenCalledTimes(1);
    expect(firstOperation).toHaveBeenCalledTimes(1);
    expect(secondOperation).toHaveBeenCalledTimes(1);
  });
});
