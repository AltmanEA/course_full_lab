import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("better-auth", () => {
  return {
    betterAuth: vi.fn((config) => {
      return { __config: config };
    }),
  };
});

import { createAuthService } from "./bauth01";
import { betterAuth } from "better-auth";

describe("bauth01 - createAuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize Better Auth with provided secret", () => {
    const auth = createAuthService({ secret: "test-secret" });

    expect(betterAuth).toHaveBeenCalledTimes(1);
    expect(betterAuth).toHaveBeenCalledWith({
      secret: "test-secret",
    });

    expect(auth).toEqual({
      __config: { secret: "test-secret" },
    });
  });

  it("should create independent instances", () => {
    const auth1 = createAuthService({ secret: "a" });
    const auth2 = createAuthService({ secret: "b" });

    expect(auth1).not.toBe(auth2);
    expect(betterAuth).toHaveBeenCalledTimes(2);
  });
});
