import { describe, it, expect, vi } from "vitest";

describe("drizzle18 — selectGradesByStudentId", async () => {
  const where = vi.fn(() => "select-result");
  const innerJoin = vi.fn(() => ({ where }));
  const from = vi.fn(() => ({ innerJoin }));
  const select = vi.fn(() => ({ from }));

  const eq = vi.fn((l, r) => ({ l, r }));

  const fakeDb = { select };

  const gradesTable = {
    studentId: "grades.studentId",
  };

  const studentsTable = {
    id: "students.id",
  };

  const { selectGradesByStudentId } = await import("./schema");

  it("формирует select-запрос с join и where по students.id", () => {
    const result = selectGradesByStudentId(
      fakeDb,
      gradesTable,
      studentsTable,
      eq,
      42,
    );

    expect(select).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(gradesTable);

    expect(eq).toHaveBeenCalledWith(
      "grades.studentId",
      "students.id",
    );

    expect(innerJoin).toHaveBeenCalledWith(
      studentsTable,
      { l: "grades.studentId", r: "students.id" },
    );

    expect(eq).toHaveBeenCalledWith("students.id", 42);
    expect(where).toHaveBeenCalledWith({
      l: "students.id",
      r: 42,
    });

    expect(result).toBe("select-result");
  });
});
