import { describe, it, expect, vi } from "vitest";

describe("drizzle35 — studentsCountFlow", () => {
  it("реализует корректный data-flow через все слои", async () => {
    const dataAccess = vi.fn(() => 5);

    const serverAction = vi.fn((fn) => fn());

    const db = { name: "db-instance" };

    const { studentsCountFlow } = await import("./schema");

    const result = studentsCountFlow(
      serverAction,
      dataAccess,
      db,
    );

    expect(serverAction).toHaveBeenCalledTimes(1);
    expect(dataAccess).toHaveBeenCalledWith(db);
    expect(result).toBe(5);
  });
});
