import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc17 - userRouter composition", () => {
  it("should return user via user.getUserById", async () => {
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
    const result = await caller.user.getUserById({ id: "1" });

    expect(result).toEqual({ id: "1", name: "John" });
  });

  it("should throw NOT_FOUND via nested router", async () => {
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
      caller.user.getUserById({ id: "42" })
    ).rejects.toThrow();
  });
});