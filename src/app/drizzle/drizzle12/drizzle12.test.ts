import { describe, it, expect, vi } from "vitest";

describe("drizzle12 — selectAssignmentsOrderedByMaxScore", async () => {
  const orderBy = vi.fn(() => "select-result");
  const from = vi.fn(() => ({ orderBy }));
  const select = vi.fn(() => ({ from }));

  const desc = vi.fn((col) => ({ col, direction: "desc" }));

  const fakeDb = { select };
  const assignmentsTable = {
    maxScore: "maxScore-column",
  };

  const { selectAssignmentsOrderedByMaxScore } = await import("./schema");

  it("формирует select-запрос с сортировкой по maxScore", () => {
    const result = selectAssignmentsOrderedByMaxScore(
      fakeDb,
      assignmentsTable,
      desc,
    );

    expect(select).toHaveBeenCalled();
    expect(from).toHaveBeenCalledWith(assignmentsTable);
    expect(desc).toHaveBeenCalledWith("maxScore-column");
    expect(orderBy).toHaveBeenCalledWith({
      col: "maxScore-column",
      direction: "desc",
    });

    expect(result).toBe("select-result");
  });
});
