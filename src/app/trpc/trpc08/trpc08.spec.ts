import { describe, it, expect } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc08 - middleware", () => {
  it("should return requestId when present", async () => {
    const ctx = createContext({ requestId: "abc123" });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.info();

    expect(result).toEqual({ requestId: "abc123" });
  });

  it("should throw error when requestId is missing", async () => {
    const ctx = createContext({ requestId: undefined });
    const caller = appRouter.createCaller(ctx);

    await expect(caller.info()).rejects.toThrow();
  });
});