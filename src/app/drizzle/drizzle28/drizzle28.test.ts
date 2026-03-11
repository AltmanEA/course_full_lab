import { describe, it, expect, vi } from "vitest";

describe("drizzle28 — getStudentsLimited", () => {
  it("формирует select-запрос с limit", async () => {
    const limitFn = vi.fn(() => "limited-result");
    const select = vi.fn(() => ({ limit: limitFn }));
    const fakeDb = { select };

    const { getStudentsLimited } = await import("./schema");

    const result = getStudentsLimited(fakeDb, 5);

    expect(select).toHaveBeenCalledTimes(1);
    expect(limitFn).toHaveBeenCalledWith(5);
    expect(result).toBe("limited-result");
  });

  it("ломается без поддержки limit", async () => {
    const { getStudentsLimited } = await import("./schema");

    expect(() =>
      getStudentsLimited({ select: () => ({}) } as any, 3),
    ).toThrow();
  });
});
