import { describe, it, expect } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc06 - mutation", () => {
  it("should return status ok with name", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.setName({ name: "John" });

    expect(result).toEqual({
      status: "ok",
      name: "John",
    });
  });

  it("should throw error for empty name", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.setName({ name: "" })
    ).rejects.toThrow();
  });
});