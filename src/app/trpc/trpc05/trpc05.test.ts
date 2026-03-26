import { describe, it, expect } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc05 - input validation", () => {
  it("should return formatted message for valid input", async () => {
    const ctx = createContext({});
    const caller = appRouter.createCaller(ctx);

    const result = await caller.greet({ name: "John" });

    expect(result).toEqual({ message: "Hello, John" });
  });

  it("should throw error for empty name", async () => {
    const ctx = createContext({});
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.greet({ name: "" })
    ).rejects.toThrow();
  });
});