import { describe, it, expect, vi } from "vitest";
import { runAuthLifecycle } from "./bauth10";

describe("bauth10 - runAuthLifecycle", () => {
  it("should execute full lifecycle in correct order", async () => {
    const calls: string[] = [];

    const authService = {
      register: vi.fn().mockImplementation(async () => {
        calls.push("register");
        return { id: "u1", email: "test@example.com" };
      }),

      login: vi.fn().mockImplementation(async () => {
        calls.push("login");
        return {
          user: { id: "u1", email: "test@example.com" },
          session: {
            id: "s1",
            userId: "u1",
            expiresAt: new Date("2030-01-01"),
          },
        };
      }),

      getSession: vi.fn().mockImplementation(async () => {
        calls.push("getSession");
        return {
          id: "s1",
          userId: "u1",
          expiresAt: new Date("2030-01-01"),
        };
      }),

      invalidateSession: vi.fn().mockImplementation(async () => {
        calls.push("invalidateSession");
      }),
    };

    const result = await runAuthLifecycle(
      authService,
      "test@example.com",
      "password123",
      {}
    );

    expect(calls).toEqual([
      "register",
      "login",
      "getSession",
      "invalidateSession",
    ]);

    expect(result.user.id).toBe("u1");
    expect(result.loginResult.session.id).toBe("s1");
    expect(result.session?.id).toBe("s1");
  });
});
