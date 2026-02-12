import { describe, it, expect } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc04 - input in query", () => {
  it("should accept name and return formatted message", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.greet({ name: "John" });

    expect(result).toEqual({ message: "Hello, John" });
  });

  it("should work with different input values", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.greet({ name: "Alice" });

    expect(result.message).toBe("Hello, Alice");
  });
});