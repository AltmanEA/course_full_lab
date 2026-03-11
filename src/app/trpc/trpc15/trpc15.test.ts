import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc15 - deleteUser (Delete)", () => {
  it("should call dataAccess.deleteUser and return success", async () => {
    const deleteUserMock = vi.fn().mockReturnValue(true);

    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: vi.fn(),
        getUserById: vi.fn(),
        updateUser: vi.fn(),
        deleteUser: deleteUserMock,
      },
    });

    const caller = appRouter.createCaller(ctx);
    const result = await caller.deleteUser({ id: "1" });

    expect(deleteUserMock).toHaveBeenCalledWith("1");
    expect(result).toEqual({ success: true });
  });

  it("should throw on empty id", async () => {
    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: vi.fn(),
        getUserById: vi.fn(),
        updateUser: vi.fn(),
        deleteUser: vi.fn(),
      },
    });

    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.deleteUser({ id: "" })
    ).rejects.toThrow();
  });
});