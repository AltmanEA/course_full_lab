import { describe, it, expect, vi } from "vitest";

describe("drizzle27 — getDb", () => {
  it("возвращает один и тот же экземпляр db", async () => {
    vi.resetModules();
    const { getDb } = await import("./schema");

    const createDb = vi.fn(() => ({ id: 1 }));

    const db1 = getDb(createDb);
    const db2 = getDb(createDb);

    expect(createDb).toHaveBeenCalledTimes(1);
    expect(db1).toBe(db2);
  });

  it("не пересоздаёт db при повторных вызовах", async () => {
    vi.resetModules();
    const { getDb } = await import("./schema");

    const createDb = vi.fn(() => ({}));

    getDb(createDb);
    getDb(createDb);
    getDb(createDb);

    expect(createDb).toHaveBeenCalledTimes(1);
  });
});
