import { describe, it, expect, vi } from "vitest";

describe("drizzle15 — countStudents", async () => {
  const from = vi.fn(() => "count-result");
  const select = vi.fn(() => ({ from }));

  const count = vi.fn((arg) => ({ counted: arg }));

  const fakeDb = { select };
  const studentsTable = { name: "students" };

  const { countStudents } = await import("./schema");

  it("формирует агрегатный select с count", () => {
    const result = countStudents(
      fakeDb,
      studentsTable,
      count,
    );

    expect(count).toHaveBeenCalledWith(studentsTable);
    expect(select).toHaveBeenCalledWith({
      count: { counted: studentsTable },
    });
    expect(from).toHaveBeenCalledWith(studentsTable);

    expect(result).toBe("count-result");
  });
});
