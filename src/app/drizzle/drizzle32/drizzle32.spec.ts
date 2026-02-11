import { describe, it, expect, vi } from "vitest";

describe("drizzle32 — safeLoadStudents", () => {
  it("возвращает результат при успешной загрузке", async () => {
    const load = vi.fn(async () => ["a", "b"]);

    const { safeLoadStudents } = await import("./schema");

    const result = await safeLoadStudents(load);

    expect(load).toHaveBeenCalledTimes(1);
    expect(result).toEqual(["a", "b"]);
  });

  it("пробрасывает новую ошибку при сбое", async () => {
    const load = vi.fn(async () => {
      throw new Error("Original DB failure");
    });

    const { safeLoadStudents } = await import("./schema");

    await expect(safeLoadStudents(load)).rejects.toThrow("Database error");
  });
});
