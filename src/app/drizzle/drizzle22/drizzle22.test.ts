import { describe, it, expect, vi } from "vitest";

describe("drizzle22 — countGradesByAssignment", async () => {
  const groupBy = vi.fn(() => "group-result");
  const innerJoin = vi.fn(() => ({ groupBy }));
  const from = vi.fn(() => ({ innerJoin }));
  const select = vi.fn(() => ({ from }));

  const eq = vi.fn((l, r) => ({ l, r }));
  const count = vi.fn((arg) => ({ counted: arg }));

  const fakeDb = { select };

  const assignmentsTable = {
    id: "assignments.id",
  };

  const gradesTable = {
    assignmentId: "grades.assignmentId",
  };

  const { countGradesByAssignment } = await import("./schema");

  it("формирует select-запрос с join, count и groupBy", () => {
    const result = countGradesByAssignment(
      fakeDb,
      assignmentsTable,
      gradesTable,
      eq,
      count,
    );

    expect(select).toHaveBeenCalledWith({
      assignmentId: "assignments.id",
      count: { counted: gradesTable },
    });

    expect(innerJoin).toHaveBeenCalledWith(
      gradesTable,
      { l: "assignments.id", r: "grades.assignmentId" },
    );

    expect(groupBy).toHaveBeenCalledWith("assignments.id");

    expect(result).toBe("group-result");
  });
});
