import { describe, it, expect } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc07 - context usage", () => {
  it("should return requestId from context", async () => {
    const ctx = createContext({ requestId: "abc123" });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.info();

    expect(result).toEqual({ requestId: "abc123" });
  });

  it("should reflect different context values", async () => {
    const ctx = createContext({ requestId: "xyz789" });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.info();

    expect(result.requestId).toBe("xyz789");
  });
})