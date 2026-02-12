import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc20 - DI integrity", () => {
  it("should call injected dataAccess.getVersion", async () => {
    const getVersionMock = vi.fn().mockReturnValue("2.0.0");

    const ctx = createContext({
      dataAccess: {
        getVersion: getVersionMock,
        createUser: vi.fn(),
        getUserById: vi.fn(),
        updateUser: vi.fn(),
        deleteUser: vi.fn(),
        createPost: vi.fn(),
        getPostById: vi.fn(),
      },
    });

    const caller = appRouter.createCaller(ctx);
    const result = await caller.health();

    expect(getVersionMock).toHaveBeenCalled();
    expect(result).toEqual({
      status: "ok",
      version: "2.0.0",
    });
  });
});