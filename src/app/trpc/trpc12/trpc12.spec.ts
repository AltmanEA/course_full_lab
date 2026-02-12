import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc12 - create user (Create)", () => {
  it("should call dataAccess.createUser and return id", async () => {
    const createUserMock = vi.fn().mockReturnValue("user123");

    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: createUserMock,
      },
    });

    const caller = appRouter.createCaller(ctx);
    const result = await caller.createUser({ name: "John" });

    expect(createUserMock).toHaveBeenCalledWith("John");
    expect(result).toEqual({ id: "user123" });
  });

  it("should throw on empty name", async () => {
    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: vi.fn(),
      },
    });

    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.createUser({ name: "" })
    ).rejects.toThrow();
  });
});