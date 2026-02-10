import { describe, it, expect, vi } from "vitest";

describe("drizzle03", () => {
  it("exports users table", async () => {
    const schema = await import("./schema");
    expect(schema).toHaveProperty("users");
  });

  it("exports selectUsers function", async () => {
    const queries = await import("./schema");

    expect(queries).toHaveProperty("selectUsers");
    expect(typeof queries.selectUsers).toBe("function");
  });

  it("selectUsers builds select-from query using users table", async () => {
    const { selectUsers } = await import("./schema");
    const { users } = await import("./schema");

    const from = vi.fn();
    const select = vi.fn(() => ({ from }));

    const fakeDb = { select };

    selectUsers(fakeDb);

    expect(select).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledTimes(1);
    expect(from).toHaveBeenCalledWith(users);
  });
});
