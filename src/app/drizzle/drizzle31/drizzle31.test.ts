import { describe, it, expect, vi } from "vitest";

describe("drizzle31 — getStudentOrNull", () => {
  it("возвращает объект, если данные существуют", async () => {
    const loadStudent = vi.fn(async () => ({ id: 1 }));

    const { getStudentOrNull } = await import("./schema");

    const result = await getStudentOrNull(loadStudent);

    expect(loadStudent).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ id: 1 });
  });

  it("возвращает null при отсутствии данных", async () => {
    const loadNull = vi.fn(async () => null);
    const loadUndefined = vi.fn(async () => undefined);

    const { getStudentOrNull } = await import("./schema");

    expect(await getStudentOrNull(loadNull)).toBeNull();
    expect(await getStudentOrNull(loadUndefined)).toBeNull();
  });
});
