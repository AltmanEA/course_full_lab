import { describe, it, expect, vi } from "vitest";

describe("drizzle19 — selectStudentEmailAndGrade", async () => {
  const innerJoin = vi.fn(() => "select-result");
  const from = vi.fn(() => ({ innerJoin }));
  const select = vi.fn(() => ({ from }));

  const eq = vi.fn((l, r) => ({ l, r }));

  const fakeDb = { select };

  const gradesTable = {
    studentId: "grades.studentId",
    score: "grades.score",
  };

  const studentsTable = {
    id: "students.id",
    email: "students.email",
  };

  const { selectStudentEmailAndGrade } = await import("./schema");

  it("формирует select-запрос с join и ограниченным набором полей", () => {
    const result = selectStudentEmailAndGrade(
      fakeDb,
      gradesTable,
      studentsTable,
      eq,
    );

    expect(select).toHaveBeenCalledWith({
      email: "students.email",
      score: "grades.score",
    });

    expect(from).toHaveBeenCalledWith(gradesTable);

    expect(eq).toHaveBeenCalledWith(
      "grades.studentId",
      "students.id",
    );

    expect(innerJoin).toHaveBeenCalledWith(
      studentsTable,
      { l: "grades.studentId", r: "students.id" },
    );

    expect(result).toBe("select-result");
  });
});
