import { describe, it, expect, vi } from "vitest";

describe("drizzle29 — getStudentsCountAction", () => {
  it("вызывает data-access функцию и возвращает количество элементов", async () => {
    const getStudents = vi.fn(() => ["a", "b", "c"]);

    const { getStudentsCountAction } = await import("./schema");

    const result = getStudentsCountAction(getStudents);

    expect(getStudents).toHaveBeenCalledTimes(1);
    expect(result).toBe(3);
  });

  it("корректно работает с пустым результатом", async () => {
    const getStudents = vi.fn(() => []);

    const { getStudentsCountAction } = await import("./schema");

    const result = getStudentsCountAction(getStudents);

    expect(result).toBe(0);
  });
});
