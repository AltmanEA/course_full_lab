import { describe, it, expect } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc03 - return object from query", () => {
  it("should return an object", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.hello();

    expect(typeof result).toBe("object");
    expect(result).not.toBeNull();
  });

  it("should contain message field", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.hello();

    expect(result).toHaveProperty("message");
    expect(result.message).toBe("hello");
  });
});