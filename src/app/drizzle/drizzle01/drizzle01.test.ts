import { describe, it, expect } from "vitest";

describe("drizzle01", () => {
  it("should export users table schema", async () => {
    const schema = await import("./schema");

    expect(schema).toHaveProperty("users");
  });

  it("users table should be defined via drizzle schema api", async () => {
    const { users } = await import("./schema");

    expect(typeof users).toBe("object");
  });

  it("users table should contain required columns", async () => {
    const { users } = await import("./schema");

    const columns = Object.keys(users);

    expect(columns).toEqual(
      expect.arrayContaining(["id", "email", "createdAt"])
    );
  });
});
