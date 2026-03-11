import { describe, it, expect, vi } from "vitest";
import {
  adminProcedure,
  UnauthorizedError,
  ForbiddenError,
} from "./bauth14";

describe("bauth14 - adminProcedure", () => {
  it("should throw UNAUTHORIZED when user is null", async () => {
    const ctx = { user: null };

    await expect(
      adminProcedure(ctx, async () => "ok")
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
      adminProcedure(ctx, async () => "ok")
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

    const handler = vi.fn().mockResolvedValue("success");

    const result = await adminProcedure(ctx, handler);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(result).toBe("success");
  });
});
