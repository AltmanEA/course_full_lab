import { describe, it, expect, vi } from "vitest";
import {
  updateProfile,
  UnauthorizedError,
  ForbiddenError,
} from "./bauth16";

describe("bauth16 - ownership check", () => {
  it("should throw UNAUTHORIZED when user is null", async () => {
    const ctx = { user: null };

    await expect(
      updateProfile(ctx, "u1", async () => "ok")
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it("should throw FORBIDDEN when user does not own resource", async () => {
    const ctx = {
      user: { id: "u1", email: "test@example.com" },
    };

    await expect(
      updateProfile(ctx, "u2", async () => "ok")
    ).rejects.toBeInstanceOf(ForbiddenError);
  });

  it("should execute handler when user owns resource", async () => {
    const ctx = {
      user: { id: "u1", email: "test@example.com" },
    };

    const handler = vi.fn().mockResolvedValue("updated");

    const result = await updateProfile(ctx, "u1", handler);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(result).toBe("updated");
  });
});
