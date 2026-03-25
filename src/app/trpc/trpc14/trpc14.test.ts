import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc14 - updateUser (Update)", () => {
  it("should call dataAccess.updateUser and return success", async () => {
    const updateUserMock = vi.fn().mockReturnValue(true);

    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: vi.fn(),
        getUserById: vi.fn(),
        updateUser: updateUserMock,
      },
    });

    const caller = appRouter.createCaller(ctx);
    const result = await caller.updateUser({
      id: "1",
      name: "Alice",
    });

    expect(updateUserMock).toHaveBeenCalledWith("1", "Alice");
    expect(result).toEqual({ success: true });
  });

  it("should throw on invalid input", async () => {
    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: vi.fn(),
        getUserById: vi.fn(),
        updateUser: vi.fn(),
      },
    });

    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.updateUser({ id: "", name: "" })
    ).rejects.toThrow();
  });
});