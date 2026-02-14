import { describe, it, expect, vi } from "vitest";
import {
  updateUser,
  UnauthorizedError,
  ForbiddenError,
} from "./bauth20";

describe("bauth20 - full protected mutation flow", () => {
  it("should throw UNAUTHORIZED when user is null", async () => {
    await expect(
      updateUser({ user: null }, "u1", async () => "ok")
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it("should throw FORBIDDEN when role is USER", async () => {
    const ctx = {
      user: { id: "u1", email: "x", role: "USER" },
    };

    await expect(
      updateUser(ctx, "u1", async () => "ok")
    ).rejects.toBeInstanceOf(ForbiddenError);
  });

  it("should throw FORBIDDEN when ADMIN is not owner", async () => {
    const ctx = {
      user: { id: "admin", email: "a", role: "ADMIN" },
    };

    await expect(
      updateUser(ctx, "u2", async () => "ok")
    ).rejects.toBeInstanceOf(ForbiddenError);
  });

  it("should execute operation when ADMIN owns resource", async () => {
    const ctx = {
      user: { id: "admin", email: "a", role: "ADMIN" },
    };

    const op = vi.fn().mockResolvedValue("updated");

    const result = await updateUser(ctx, "admin", op);

    expect(op).toHaveBeenCalledTimes(1);
    expect(result).toBe("updated");
  });
});
