import { describe, it, expect } from "vitest";

import { users, sessions } from "./bauth03";

describe("bauth03 - schema definition", () => {
  it("should export users table", () => {
    expect(users).toBeDefined();
  });

  it("should export sessions table", () => {
    expect(sessions).toBeDefined();
  });

  it("sessions should reference users", () => {
    const sessionColumns = Object.keys(sessions);

    expect(sessionColumns).toContain("userId");
  });

  it("users should contain required columns", () => {
    const userColumns = Object.keys(users);

    expect(userColumns).toContain("id");
    expect(userColumns).toContain("email");
    expect(userColumns).toContain("createdAt");
  });
});
