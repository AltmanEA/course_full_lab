import { describe, it, expect, vi } from "vitest";

describe("drizzle21 — countGradesByStudent", async () => {
  const where = vi.fn(() => "count-result");
  const innerJoin = vi.fn(() => ({ where }));
  const from = vi.fn(() => ({ innerJoin }));
  const select = vi.fn(() => ({ from }));

  const eq = vi.fn((l, r) => ({ l, r }));
  const count = vi.fn((arg) => ({ counted: arg }));

  const fakeDb = { select };

  const studentsTable = {
    id: "students.id",
  };

  const gradesTable = {
    studentId: "grades.studentId",
  };

  const { countGradesByStudent } = await import("./schema");

  it("формирует select-запрос с join и агрегатной функцией count", () => {
    const result = countGradesByStudent(
      fakeDb,
      studentsTable,
      gradesTable,
      eq,
      count,
      5,
    );

    expect(count).toHaveBeenCalledWith(gradesTable);

    expect(select).toHaveBeenCalledWith({
      count: { counted: gradesTable },
    });

    expect(innerJoin).toHaveBeenCalledWith(
      gradesTable,
      { l: "students.id", r: "grades.studentId" },
    );

    expect(where).toHaveBeenCalledWith({
      l: "students.id",
      r: 5,
    });

    expect(result).toBe("count-result");
  });
});
