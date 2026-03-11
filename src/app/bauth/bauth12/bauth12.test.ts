import { describe, it, expect } from "vitest";
import { currentUser } from "./bauth12";

describe("bauth12 - currentUser", () => {
  it("should return user when present", () => {
    const ctx = {
      user: { id: "u1", email: "test@example.com" },
    };

    const result = currentUser(ctx);

    expect(result?.id).toBe("u1");
  });

  it("should return null when user is absent", () => {
    const ctx = { user: null };

    const result = currentUser(ctx);

    expect(result).toBeNull();
  });
});
