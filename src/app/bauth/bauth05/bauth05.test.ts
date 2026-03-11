import { describe, it, expect, vi } from "vitest";
import { loginUser } from "./bauth05";

describe("bauth05 - loginUser", () => {
  it("should call authService.login with correct params", async () => {
    const mockLogin = vi.fn().mockResolvedValue({
      user: { id: "u1", email: "test@example.com" },
      session: {
        id: "s1",
        userId: "u1",
        expiresAt: new Date("2030-01-01"),
      },
    });

    const authService = {
      login: mockLogin,
    };

    const result = await loginUser(
      authService,
      "test@example.com",
      "password123"
    );

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });

    expect(result.user.id).toBe("u1");
    expect(result.session.id).toBe("s1");
  });
});
