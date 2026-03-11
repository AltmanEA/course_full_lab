import { describe, it, expect } from "vitest";
import type { User, Role } from "./bauth13";

describe("bauth13 - role model", () => {
  it("should allow USER role", () => {
    const user: User = {
      id: "u1",
      email: "test@example.com",
      role: "USER",
    };

    expect(user.role).toBe("USER");
  });

  it("should allow ADMIN role", () => {
    const user: User = {
      id: "u2",
      email: "admin@example.com",
      role: "ADMIN",
    };

    expect(user.role).toBe("ADMIN");
  });

  it("role should be either USER or ADMIN", () => {
    const roles: Role[] = ["USER", "ADMIN"];

    expect(roles).toContain("USER");
    expect(roles).toContain("ADMIN");
  });
});
