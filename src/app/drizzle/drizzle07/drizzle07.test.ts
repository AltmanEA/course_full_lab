import { describe, it, expect, vi } from "vitest";

describe("drizzle07 — selectAllStudents", async () => {
  const from = vi.fn(() => "select-result");
  const select = vi.fn(() => ({ from }));

  const fakeDb = { select };
  const studentsTable = { name: "students" };

  const { selectAllStudents } = await import("./schema");

  it("формирует select-запрос без условий", () => {
    const result = selectAllStudents(fakeDb, studentsTable);

    expect(select).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(studentsTable);

    expect(result).toBe("select-result");
  });
});
