import { describe, it, expect, vi } from "vitest";
import { createContext } from "./bauth07";

describe("bauth07 - createContext", () => {
  it("should return user from session", async () => {
    const mockGetSession = vi.fn().mockResolvedValue({
      id: "s1",
      user: {
        id: "u1",
        email: "test@example.com",
      },
      expiresAt: new Date("2030-01-01"),
    });

    const authService = {
      getSession: mockGetSession,
    };

    const ctx = await createContext(authService, {});

    expect(mockGetSession).toHaveBeenCalledTimes(1);
    expect(ctx.user?.id).toBe("u1");
  });

  it("should return null when session is absent", async () => {
    const mockGetSession = vi.fn().mockResolvedValue(null);

    const authService = {
      getSession: mockGetSession,
    };

    const ctx = await createContext(authService, {});

    expect(ctx.user).toBeNull();
  });
});
