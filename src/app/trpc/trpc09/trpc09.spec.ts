import { describe, it, expect } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc09 - protectedProcedure", () => {
  it("should return userId when user exists", async () => {
    const ctx = createContext({
      user: { id: "user123" },
    });

    const caller = appRouter.createCaller(ctx);
    const result = await caller.me();

    expect(result).toEqual({ userId: "user123" });
  });

  it("should throw when user is missing", async () => {
    const ctx = createContext({
      user: null,
    });

    const caller = appRouter.createCaller(ctx);

    await expect(caller.me()).rejects.toThrow();
  });
});