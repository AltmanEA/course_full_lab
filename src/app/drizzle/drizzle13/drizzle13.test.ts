import { describe, it, expect, vi } from "vitest";

describe("drizzle13 — selectStudentsPage", async () => {
  const offset = vi.fn(() => "select-result");
  const limit = vi.fn(() => ({ offset }));
  const from = vi.fn(() => ({ limit }));
  const select = vi.fn(() => ({ from }));

  const fakeDb = { select };
  const studentsTable = { name: "students" };

  const { selectStudentsPage } = await import("./schema");

  it("формирует select-запрос с limit и offset", () => {
    const result = selectStudentsPage(
      fakeDb,
      studentsTable,
      10,
      20,
    );

    expect(select).toHaveBeenCalled();
    expect(from).toHaveBeenCalledWith(studentsTable);
    expect(limit).toHaveBeenCalledWith(10);
    expect(offset).toHaveBeenCalledWith(20);

    expect(result).toBe("select-result");
  });
});
