import { describe, it, expect, vi } from "vitest";

describe("drizzle10 — deleteAssignmentById", async () => {
  const where = vi.fn(() => "delete-result");
  const del = vi.fn(() => ({ where }));

  const eq = vi.fn((l, r) => ({ l, r }));

  const fakeDb = { delete: del };
  const assignmentsTable = { id: "id-column" };

  const { deleteAssignmentById } = await import("./schema");

  it("формирует delete-запрос с where по id", () => {
    const result = deleteAssignmentById(
      fakeDb,
      assignmentsTable,
      eq,
      10,
    );

    expect(del).toHaveBeenCalledWith(assignmentsTable);
    expect(eq).toHaveBeenCalledWith("id-column", 10);
    expect(where).toHaveBeenCalledWith({ l: "id-column", r: 10 });

    expect(result).toBe("delete-result");
  });
});
