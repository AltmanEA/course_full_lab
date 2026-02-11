import { describe, it, expect, vi } from "vitest";

describe("drizzle33 — serverOnlyAction", () => {
  it("вызывает run при корректном server API", async () => {
    const run = vi.fn(() => "ok");
    const serverApi = { run };

    const { serverOnlyAction } = await import("./schema");

    const result = serverOnlyAction(serverApi);

    expect(run).toHaveBeenCalledTimes(1);
    expect(result).toBe("ok");
  });

  it("выбрасывает ошибку при отсутствии server API", async () => {
    const { serverOnlyAction } = await import("./schema");

    expect(() =>
      serverOnlyAction({} as any),
    ).toThrow("Server-only API required");
  });
});
