import { describe, it, expect, vi } from "vitest";
import { deleteUser } from "./bauth15";
import { UnauthorizedError, ForbiddenError } from "./bauth15";

describe("bauth15 - deleteUser (ADMIN-only)", () => {
  it("should throw UNAUTHORIZED when user is null", async () => {
    const ctx = { user: null };

    await expect(
      deleteUser(ctx as any, async () => "ok")
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it("should throw FORBIDDEN when role is USER", async () => {
    const ctx = {
      user: {
        id: "u1",
        email: "test@example.com",
        role: "USER",
      },
    };

    await expect(
      deleteUser(ctx as any, async () => "ok")
    ).rejects.toBeInstanceOf(ForbiddenError);
  });

  it("should execute handler when role is ADMIN", async () => {
    const ctx = {
      user: {
        id: "u2",
        email: "admin@example.com",
        role: "ADMIN",
      },
    };

    const handler = vi.fn().mockResolvedValue("deleted");

    const result = await deleteUser(ctx as any, handler);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(result).toBe("deleted");
  });
});
