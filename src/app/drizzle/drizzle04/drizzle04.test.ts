import { describe, it, expect, vi } from "vitest";

describe("drizzle04", () => {
  it("exports users table", async () => {
    const schema = await import("./schema");
    expect(schema).toHaveProperty("users");
  });

  it("exports selectUserByEmail function", async () => {
    const schema = await import("./schema");

    expect(schema).toHaveProperty("selectUserByEmail");
    expect(typeof schema.selectUserByEmail).toBe("function");
  });

  it("selectUserByEmail builds select-from-where query", async () => {
    const schema = await import("./schema");

    const where = vi.fn();
    const from = vi.fn(() => ({ where }));
    const select = vi.fn(() => ({ from }));

    const fakeDb = { select };

    schema.selectUserByEmail(fakeDb, "test@example.com");

    expect(select).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(schema.users);
    expect(where).toHaveBeenCalledTimes(1);
  });
});
