import { describe, it, expect, vi } from "vitest";

describe("drizzle17 — selectAssignmentsWithGrades", async () => {
  const leftJoin = vi.fn(() => "join-result");
  const from = vi.fn(() => ({ leftJoin }));
  const select = vi.fn(() => ({ from }));

  const eq = vi.fn((l, r) => ({ l, r }));

  const fakeDb = { select };

  const assignmentsTable = {
    id: "assignments.id",
  };

  const gradesTable = {
    assignmentId: "grades.assignmentId",
  };

  const { selectAssignmentsWithGrades } = await import("./schema");

  it("формирует select-запрос с leftJoin по assignmentId", () => {
    const result = selectAssignmentsWithGrades(
      fakeDb,
      assignmentsTable,
      gradesTable,
      eq,
    );

    expect(select).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(assignmentsTable);

    expect(eq).toHaveBeenCalledWith(
      "assignments.id",
      "grades.assignmentId",
    );

    expect(leftJoin).toHaveBeenCalledWith(
      gradesTable,
      { l: "assignments.id", r: "grades.assignmentId" },
    );

    expect(result).toBe("join-result");
  });
});
