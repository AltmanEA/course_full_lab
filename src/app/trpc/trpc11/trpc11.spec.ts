import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc11 - data-access via context", () => {
  it("should call injected dataAccess.getVersion", async () => {
    const getVersionMock = vi.fn().mockReturnValue("1.0.0");

    const ctx = createContext({
      dataAccess: {
        getVersion: getVersionMock,
      },
    });

    const caller = appRouter.createCaller(ctx);
    const result = await caller.getVersion();

    expect(getVersionMock).toHaveBeenCalled();
    expect(result).toEqual({ version: "1.0.0" });
  });
});