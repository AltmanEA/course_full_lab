import { describe, it, expect } from "vitest";
import { validateSession } from "./bauth08";

describe("bauth08 - validateSession", () => {
  const fixedNow = new Date("2025-01-01T00:00:00Z");

  const clock = () => fixedNow;

  it("should return session when not expired", () => {
    const session = {
      id: "s1",
      userId: "u1",
      expiresAt: new Date("2025-02-01T00:00:00Z"),
    };

    const result = validateSession(session, clock);

    expect(result).toBe(session);
  });

  it("should return null when expired", () => {
    const session = {
      id: "s2",
      userId: "u1",
      expiresAt: new Date("2024-12-01T00:00:00Z"),
    };

    const result = validateSession(session, clock);

    expect(result).toBeNull();
  });

  it("should return null when expiration equals now", () => {
    const session = {
      id: "s3",
      userId: "u1",
      expiresAt: fixedNow,
    };

    const result = validateSession(session, clock);

    expect(result).toBeNull();
  });
});
