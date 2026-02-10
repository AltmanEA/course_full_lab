import { describe, it, expect } from "vitest";

describe("drizzle02", () => {
  it("exports users table", async () => {
    const module = await import("./schema");
    expect(module).toHaveProperty("users");
  });

  it("users table has primary key", async () => {
    const { users } = await import("./schema");
    const columns = Object.values(users);

    const hasPrimaryKey = columns.some(
      (column: any) => column.primary === true
    );

    expect(hasPrimaryKey).toBe(true);
  });

  it("users table has not null constraint", async () => {
    const { users } = await import("./schema");
    const columns = Object.values(users);

    const hasNotNull = columns.some(
      (column: any) => column.notNull === true
    );

    expect(hasNotNull).toBe(true);
  });

  it("users table has default value", async () => {
    const { users } = await import("./schema");
    const columns = Object.values(users);

    const hasDefault = columns.some(
      (column: any) => column.hasDefault === true
    );

    expect(hasDefault).toBe(true);
  });
});
