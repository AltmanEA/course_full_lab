import { describe, it, expect, vi } from "vitest";
import {
  protectedProcedure,
  UnauthorizedError,
} from "./bauth11";

describe("bauth11 - protectedProcedure", () => {
  it("should throw UNAUTHORIZED when user is null", async () => {
    const ctx = { user: null };

    await expect(
      protectedProcedure(ctx, async () => "ok")
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it("should call handler when user exists", async () => {
    const ctx = {
      user: { id: "u1", email: "test@example.com" },
    };

    const handler = vi.fn().mockResolvedValue("success");

    const result = await protectedProcedure(ctx, handler);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(result).toBe("success");
  });
});
