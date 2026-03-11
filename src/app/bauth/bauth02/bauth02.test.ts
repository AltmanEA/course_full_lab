import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("better-auth", () => {
  return {
    betterAuth: vi.fn((config) => {
      return { __config: config };
    }),
  };
});

import { createAuthService } from "./bauth02";
import { betterAuth } from "better-auth";

describe("bauth02 - database integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should pass database instance to Better Auth", () => {
    const fakeDb = { __brand: "DrizzleDatabase" } as const;

    createAuthService(
      { secret: "test-secret" },
      fakeDb
    );

    expect(betterAuth).toHaveBeenCalledWith({
      secret: "test-secret",
      database: fakeDb,
    });
  });

  it("should allow different db instances", () => {
    const db1 = { __brand: "DrizzleDatabase" } as const;
    const db2 = { __brand: "DrizzleDatabase" } as const;

    createAuthService({ secret: "a" }, db1);
    createAuthService({ secret: "b" }, db2);

    expect(betterAuth).toHaveBeenCalledTimes(2);

    expect(betterAuth).toHaveBeenNthCalledWith(1, {
      secret: "a",
      database: db1,
    });

    expect(betterAuth).toHaveBeenNthCalledWith(2, {
      secret: "b",
      database: db2,
    });
  });
});
