import { describe, it, expect, vi } from "vitest";

describe("drizzle09 — updateStudentNameById", async () => {
  const where = vi.fn(() => "update-result");
  const set = vi.fn(() => ({ where }));
  const update = vi.fn(() => ({ set }));

  const eq = vi.fn((l, r) => ({ l, r }));

  const fakeDb = { update };
  const studentsTable = { id: "id-column" };

  const { updateStudentNameById } = await import("./schema");

  it("формирует update-запрос с where по id", () => {
    const result = updateStudentNameById(
      fakeDb,
      studentsTable,
      eq,
      42,
      "New Name",
    );

    expect(update).toHaveBeenCalledWith(studentsTable);
    expect(set).toHaveBeenCalledWith({ name: "New Name" });
    expect(eq).toHaveBeenCalledWith("id-column", 42);
    expect(where).toHaveBeenCalledWith({ l: "id-column", r: 42 });

    expect(result).toBe("update-result");
  });
});
