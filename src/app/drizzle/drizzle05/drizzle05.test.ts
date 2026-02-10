import { describe, it, expect, vi } from "vitest";

describe("drizzle05", () => {
  it("exports users table", async () => {
    const schema = await import("./schema");
    expect(schema).toHaveProperty("users");
  });

  it("exports insertUser function", async () => {
    const schema = await import("./schema");

    expect(schema).toHaveProperty("insertUser");
    expect(typeof schema.insertUser).toBe("function");
  });

  it("insertUser builds insert-values-returning query", async () => {
    const schema = await import("./schema");

    const returning = vi.fn();
    const values = vi.fn(() => ({ returning }));
    const insert = vi.fn(() => ({ values }));

    const fakeDb = { insert };

    schema.insertUser(fakeDb, { email: "test@example.com" });

    expect(insert).toHaveBeenCalledWith(schema.users);
    expect(values).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(returning).toHaveBeenCalledTimes(1);
  });
});
