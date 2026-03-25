import { describe, it, expect } from "vitest";
import {
  getProfile,
  UnauthorizedError,
} from "./bauth19";

describe("bauth19 - DI guarantees", () => {
  it("should throw UNAUTHORIZED when user is null", () => {
    expect(() =>
      getProfile({ user: null })
    ).toThrowError(UnauthorizedError);
  });

  it("should return user id when user exists", () => {
    const ctx = {
      user: { id: "u1", email: "test@example.com" },
    };

    expect(getProfile(ctx)).toBe("u1");
  });
});
