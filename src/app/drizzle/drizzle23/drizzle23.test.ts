import { describe, it, expect, vi } from "vitest";

describe("drizzle23 — selectAssignmentsOrderedByGradesCount", async () => {
  const orderBy = vi.fn(() => "order-result");
  const groupBy = vi.fn(() => ({ orderBy }));
  const innerJoin = vi.fn(() => ({ groupBy }));
  const from = vi.fn(() => ({ innerJoin }));
  const select = vi.fn(() => ({ from }));

  const eq = vi.fn((l, r) => ({ l, r }));
  const count = vi.fn((arg) => ({ counted: arg }));
  const desc = vi.fn((arg) => ({ descOf: arg }));

  const fakeDb = { select };

  const assignmentsTable = {
    id: "assignments.id",
  };

  const gradesTable = {
    assignmentId: "grades.assignmentId",
  };

  const { selectAssignmentsOrderedByGradesCount } = await import("./schema");

  it("формирует select-запрос с сортировкой по агрегатному значению", () => {
    const result = selectAssignmentsOrderedByGradesCount(
      fakeDb,
      assignmentsTable,
      gradesTable,
      eq,
      count,
      desc,
    );

    const aggregated = { counted: gradesTable };

    expect(count).toHaveBeenCalledWith(gradesTable);
    expect(desc).toHaveBeenCalledWith(aggregated);

    expect(orderBy).toHaveBeenCalledWith({
      descOf: aggregated,
    });

    expect(result).toBe("order-result");
  });
});
