import { describe, it, expect } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc10 - router composition", () => {
  it("should allow system.ping without auth", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.system.ping();

    expect(result).toEqual({ status: "ok" });
  });

  it("should allow user.me with auth", async () => {
    const ctx = createContext({
      user: { id: "user123" },
    });

    const caller = appRouter.createCaller(ctx);
    const result = await caller.user.me();

    expect(result).toEqual({ userId: "user123" });
  });

  it("should reject user.me without auth", async () => {
    const ctx = createContext({
      user: null,
    });

    const caller = appRouter.createCaller(ctx);

    await expect(caller.user.me()).rejects.toThrow();
  });
});