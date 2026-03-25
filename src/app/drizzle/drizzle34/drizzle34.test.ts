import { describe, it, expect, vi } from "vitest";

describe("drizzle34 — getStudentsNames", () => {
  it("использует переданную функцию и возвращает имена", async () => {
    const loadStudents = vi.fn(() => [
      { name: "Ivan" },
      { name: "Anna" },
    ]);

    const { getStudentsNames } = await import("./schema");

    const result = getStudentsNames(loadStudents);

    expect(loadStudents).toHaveBeenCalledTimes(1);
    expect(result).toEqual(["Ivan", "Anna"]);
  });
});
