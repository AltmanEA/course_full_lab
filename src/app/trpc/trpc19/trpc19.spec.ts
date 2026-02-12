import { describe, it, expect } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc19 - router composition", () => {
  it("should expose user namespace", () => {
    const namespaces = Object.keys(appRouter._def.record);
    expect(namespaces).toContain("user");
  });

  it("should expose post namespace", () => {
    const namespaces = Object.keys(appRouter._def.record);
    expect(namespaces).toContain("post");
  });

  it("should allow creating caller", () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);
    expect(caller).toBeDefined();
  });
});