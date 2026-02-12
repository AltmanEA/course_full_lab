import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc16 - NOT_FOUND handling", () => {
  it("should return user when found", async () => {
    const getUserByIdMock = vi
      .fn()
      .mockReturnValue({ id: "1", name: "John" });

    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: vi.fn(),
        getUserById: getUserByIdMock,
        updateUser: vi.fn(),
        deleteUser: vi.fn(),
      },
    });

    const caller = appRouter.createCaller(ctx);
    const result = await caller.getUserById({ id: "1" });

    expect(result).toEqual({ id: "1", name: "John" });
  });

  it("should throw NOT_FOUND when user missing", async () => {
    const getUserByIdMock = vi.fn().mockReturnValue(null);

    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: vi.fn(),
        getUserById: getUserByIdMock,
        updateUser: vi.fn(),
        deleteUser: vi.fn(),
      },
    });

    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.getUserById({ id: "42" })
    ).rejects.toThrow();
  });
});