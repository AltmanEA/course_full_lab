import { describe, it, expect } from "vitest";
import {
  checkAccess,
  UnauthorizedError,
  ForbiddenError,
} from "./bauth18";

describe("bauth18 - error semantics", () => {
  it("should throw UNAUTHORIZED when userId is null", () => {
    expect(() =>
      checkAccess(null, true)
    ).toThrowError(UnauthorizedError);
  });

  it("should throw FORBIDDEN when permission is false", () => {
    expect(() =>
      checkAccess("u1", false)
    ).toThrowError(ForbiddenError);
  });

  it("should return true when access is allowed", () => {
    expect(checkAccess("u1", true)).toBe(true);
  });
});
