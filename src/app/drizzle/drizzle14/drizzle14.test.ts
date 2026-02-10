import { describe, it, expect, vi } from "vitest";

describe("drizzle14 — deleteGradeByStudentAndAssignment", async () => {
  const where = vi.fn(() => "delete-result");
  const del = vi.fn(() => ({ where }));

  const eq = vi.fn((l, r) => ({ l, r }));
  const and = vi.fn((...conds) => ({ conds }));

  const fakeDb = { delete: del };
  const gradesTable = {
    studentId: "studentId-column",
    assignmentId: "assignmentId-column",
  };

  const { deleteGradeByStudentAndAssignment } = await import("./schema");

  it("формирует delete-запрос с составным where", () => {
    const result = deleteGradeByStudentAndAssignment(
      fakeDb,
      gradesTable,
      and,
      eq,
      1,
      2,
    );

    expect(del).toHaveBeenCalledWith(gradesTable);

    expect(eq).toHaveBeenCalledWith("studentId-column", 1);
    expect(eq).toHaveBeenCalledWith("assignmentId-column", 2);

    expect(and).toHaveBeenCalledWith(
      { l: "studentId-column", r: 1 },
      { l: "assignmentId-column", r: 2 },
    );

    expect(where).toHaveBeenCalledWith({
      conds: [
        { l: "studentId-column", r: 1 },
        { l: "assignmentId-column", r: 2 },
      ],
    });

    expect(result).toBe("delete-result");
  });
});
