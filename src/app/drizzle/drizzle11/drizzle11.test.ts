import { describe, it, expect, vi } from "vitest";

describe("drizzle11 — selectStudentEmails", async () => {
  const from = vi.fn(() => "select-result");
  const select = vi.fn(() => ({ from }));

  const fakeDb = { select };
  const studentsTable = {
    id: "id-column",
    email: "email-column",
  };

  const { selectStudentEmails } = await import("./schema");

  it("формирует select-запрос с ограничением полей", () => {
    const result = selectStudentEmails(fakeDb, studentsTable);

    expect(select).toHaveBeenCalledWith({
      id: "id-column",
      email: "email-column",
    });

    expect(from).toHaveBeenCalledWith(studentsTable);
    expect(result).toBe("select-result");
  });
});
