import { describe, it, expect, vi } from "vitest";

describe("drizzle08 — selectStudentByEmail", async () => {
  const where = vi.fn(() => "select-result");
  const from = vi.fn(() => ({ where }));
  const select = vi.fn(() => ({ from }));

  const eq = vi.fn((l, r) => ({ l, r }));

  const fakeDb = { select };
  const studentsTable = { email: "email-column" };

  const { selectStudentByEmail } = await import("./schema");

  it("формирует select-запрос с where по email", () => {
    const result = selectStudentByEmail(
      fakeDb,
      studentsTable,
      eq,
      "test@test.com",
    );

    expect(select).toHaveBeenCalled();
    expect(from).toHaveBeenCalledWith(studentsTable);
    expect(eq).toHaveBeenCalledWith("email-column", "test@test.com");
    expect(where).toHaveBeenCalledWith({ l: "email-column", r: "test@test.com" });

    expect(result).toBe("select-result");
  });
});
