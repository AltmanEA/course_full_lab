import { describe, it, expect } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc02 - first query procedure", () => {
  it("should register hello procedure", () => {
    const procedures = Object.keys(appRouter._def.procedures);
    expect(procedures).toContain("hello");
  });

  it("should return 'hello'", async () => {
    const ctx = createContext({});
    const caller = appRouter.createCaller(ctx);

    const result = await caller.hello();

    expect(result).toBe("hello");
  });
});