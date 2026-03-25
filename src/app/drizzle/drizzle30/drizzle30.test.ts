import { describe, it, expect, vi } from "vitest";

describe("drizzle30 — loadStudents", () => {
  it("возвращает загруженные данные, если они есть", async () => {
    const load = vi.fn(async () => ["s1", "s2"]);
    const fallback = ["empty"];

    const { loadStudents } = await import("./schema");

    const result = await loadStudents(load, fallback);

    expect(load).toHaveBeenCalledTimes(1);
    expect(result).toEqual(["s1", "s2"]);
  });

  it("возвращает fallback при пустом результате", async () => {
    const load = vi.fn(async () => []);
    const fallback = ["empty"];

    const { loadStudents } = await import("./schema");

    const result = await loadStudents(load, fallback);

    expect(result).toEqual(["empty"]);
  });

  it("возвращает fallback при null или undefined", async () => {
    const loadNull = vi.fn(async () => null);
    const loadUndefined = vi.fn(async () => undefined);
    const fallback = ["empty"];

    const { loadStudents } = await import("./schema");

    expect(await loadStudents(loadNull, fallback)).toEqual(["empty"]);
    expect(await loadStudents(loadUndefined, fallback)).toEqual(["empty"]);
  });
});
