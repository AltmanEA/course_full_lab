import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc13 - getUserById (Read)", () => {
  it("should return user when found", async () => {
    const getUserByIdMock = vi
      .fn()
      .mockReturnValue({ id: "1", name: "John" });

    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: vi.fn(),
        getUserById: getUserByIdMock,
      },
    });

    const caller = appRouter.createCaller(ctx);
    const result = await caller.getUserById({ id: "1" });

    expect(getUserByIdMock).toHaveBeenCalledWith("1");
    expect(result).toEqual({ id: "1", name: "John" });
  });

  it("should return null when user not found", async () => {
    const getUserByIdMock = vi.fn().mockReturnValue(null);

    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: vi.fn(),
        getUserById: getUserByIdMock,
      },
    });

    const caller = appRouter.createCaller(ctx);
    const result = await caller.getUserById({ id: "42" });

    expect(result).toBeNull();
  });

  it("should throw on empty id", async () => {
    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: vi.fn(),
        getUserById: vi.fn(),
      },
    });

    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.getUserById({ id: "" })
    ).rejects.toThrow();
  });
});