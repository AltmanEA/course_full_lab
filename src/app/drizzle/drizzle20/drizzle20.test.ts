import { describe, it, expect, vi } from "vitest";

describe("drizzle20 — selectAssignmentsByStudent", async () => {
  const where = vi.fn(() => "select-result");

  const innerJoin2 = vi.fn(() => ({ where }));
  const innerJoin1 = vi.fn(() => ({ innerJoin: innerJoin2 }));
  const from = vi.fn(() => ({ innerJoin: innerJoin1 }));
  const select = vi.fn(() => ({ from }));

  const eq = vi.fn((l, r) => ({ l, r }));

  const fakeDb = { select };

  const studentsTable = {
    id: "students.id",
  };

  const gradesTable = {
    studentId: "grades.studentId",
    assignmentId: "grades.assignmentId",
  };

  const assignmentsTable = {
    id: "assignments.id",
  };

  const { selectAssignmentsByStudent } = await import("./schema");

  it("формирует select-запрос с двумя join и where", () => {
    const result = selectAssignmentsByStudent(
      fakeDb,
      studentsTable,
      gradesTable,
      assignmentsTable,
      eq,
      7,
    );

    expect(from).toHaveBeenCalledWith(studentsTable);

    expect(eq).toHaveBeenCalledWith(
      "students.id",
      "grades.studentId",
    );

    expect(eq).toHaveBeenCalledWith(
      "grades.assignmentId",
      "assignments.id",
    );

    expect(eq).toHaveBeenCalledWith(
      "students.id",
      7,
    );

    expect(innerJoin1).toHaveBeenCalledWith(
      gradesTable,
      { l: "students.id", r: "grades.studentId" },
    );

    expect(innerJoin2).toHaveBeenCalledWith(
      assignmentsTable,
      { l: "grades.assignmentId", r: "assignments.id" },
    );

    expect(where).toHaveBeenCalledWith({
      l: "students.id",
      r: 7,
    });

    expect(result).toBe("select-result");
  });
});
