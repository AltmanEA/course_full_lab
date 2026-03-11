import { describe, it, expect, vi } from "vitest";
import { registerUser } from "./bauth04";

describe("bauth04 - registerUser", () => {
  it("should call authService.register with correct params", async () => {
    const mockRegister = vi.fn().mockResolvedValue({
      id: "u1",
      email: "test@example.com",
    });

    const authService = {
      register: mockRegister,
    };

    const result = await registerUser(
      authService,
      "test@example.com",
      "password123"
    );

    expect(mockRegister).toHaveBeenCalledTimes(1);
    expect(mockRegister).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });

    expect(result).toEqual({
      id: "u1",
      email: "test@example.com",
    });
  });
});
