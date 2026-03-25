import { describe, it, expect, vi } from "vitest";
import { logoutUser } from "./bauth09";

describe("bauth09 - logoutUser", () => {
  it("should call invalidateSession with correct sessionId", async () => {
    const mockInvalidate = vi.fn().mockResolvedValue(undefined);

    const authService = {
      invalidateSession: mockInvalidate,
    };

    const result = await logoutUser(authService, "s1");

    expect(mockInvalidate).toHaveBeenCalledTimes(1);
    expect(mockInvalidate).toHaveBeenCalledWith("s1");

    expect(result).toBeUndefined();
  });
});
