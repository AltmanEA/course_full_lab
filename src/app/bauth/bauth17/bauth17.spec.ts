import { describe, it, expect, vi } from "vitest";
import {
  updateProfileAccess,
  UnauthorizedError,
  ForbiddenError,
} from "./bauth17";

describe("bauth17 - ownership in access layer", () => {
  it("should throw UNAUTHORIZED when currentUserId is null", async () => {
    await expect(
      updateProfileAccess(null, "u1", async () => "ok")
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it("should throw FORBIDDEN when user does not own resource", async () => {
    await expect(
      updateProfileAccess("u1", "u2", async () => "ok")
    ).rejects.toBeInstanceOf(ForbiddenError);
  });

  it("should execute operation when user owns resource", async () => {
    const operation = vi.fn().mockResolvedValue("updated");

    const result = await updateProfileAccess(
      "u1",
      "u1",
      operation
    );

    expect(operation).toHaveBeenCalledTimes(1);
    expect(result).toBe("updated");
  });
});
