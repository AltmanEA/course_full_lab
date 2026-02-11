import { describe, it, expect, vi } from "vitest";

describe("drizzle26 — serverSelect", async () => {
  const serverSelect = (await import("./schema")).serverSelect;

  it("работает с server-db", () => {
    const select = vi.fn(() => "ok");
    const serverDb = { select };

    const result = serverSelect(serverDb);

    expect(select).toHaveBeenCalled();
    expect(result).toBe("ok");
  });

  it("не работает с client-db", () => {
    const clientDb = {}; // имитация клиентского окружения

    expect(() => serverSelect(clientDb as any)).toThrow();
  });
});
