import { describe, it, expect, vi } from "vitest";
import { getCurrentSession } from "./bauth06";

describe("bauth06 - getCurrentSession", () => {
  it("should call authService.getSession with request", async () => {
    const mockGetSession = vi.fn().mockResolvedValue({
      id: "s1",
      userId: "u1",
      expiresAt: new Date("2030-01-01"),
    });

    const authService = {
      getSession: mockGetSession,
    };

    const request = { headers: {} };

    const result = await getCurrentSession(authService, request);

    expect(mockGetSession).toHaveBeenCalledTimes(1);
    expect(mockGetSession).toHaveBeenCalledWith(request);

    expect(result?.id).toBe("s1");
  });

  it("should return null when session does not exist", async () => {
    const mockGetSession = vi.fn().mockResolvedValue(null);

    const authService = {
      getSession: mockGetSession,
    };

    const result = await getCurrentSession(authService, {});

    expect(result).toBeNull();
  });
});
