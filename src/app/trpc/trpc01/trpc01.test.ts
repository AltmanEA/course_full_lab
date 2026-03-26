import { describe, it, expect } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc01 - minimal router", () => {
  it("should create a valid router instance", () => {
    expect(appRouter).toBeDefined();
    expect(typeof appRouter).toBe("object");
  });

  it("should contain no procedures", () => {
    const procedures = Object.keys(appRouter._def.procedures);
    expect(procedures.length).toBe(0);
  });

  it("should allow creating a caller", () => {
    const ctx = createContext({});
    const caller = appRouter.createCaller(ctx);

    expect(caller).toBeDefined();
  });
});