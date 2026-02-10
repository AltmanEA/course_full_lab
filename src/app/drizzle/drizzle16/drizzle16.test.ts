import { describe, it, expect, vi } from "vitest";

describe("drizzle16 — selectGradesWithStudents", async () => {
  const innerJoin = vi.fn(() => "join-result");
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

  const { selectGradesWithStudents } = await import("./schema");

  it("формирует select-запрос с innerJoin по studentId", () => {
    const result = selectGradesWithStudents(
      fakeDb,
      gradesTable,
      studentsTable,
      eq,
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

    expect(result).toBe("join-result");
  });
});
