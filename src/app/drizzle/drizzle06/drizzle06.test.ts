import { describe, it, expect, vi } from "vitest";

describe("drizzle06 — insertStudent", async () => {
  const values = vi.fn(() => "insert-result");
  const insert = vi.fn(() => ({ values }));

  const fakeDb = { insert };
  const studentsTable = { name: "students" };

  const { insertStudent } = await import("./schema");

  it("формирует insert-запрос для таблицы students", () => {
    const data = { name: "Ivan Ivanov", email: "ivan@test.com" };

    const result = insertStudent(fakeDb, studentsTable, data);

    expect(insert).toHaveBeenCalledTimes(1);
    expect(insert).toHaveBeenCalledWith(studentsTable);

    expect(values).toHaveBeenCalledTimes(1);
    expect(values).toHaveBeenCalledWith(data);

    expect(result).toBe("insert-result");
  });
});
