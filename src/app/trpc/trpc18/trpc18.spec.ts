import { describe, it, expect, vi } from "vitest";
import { appRouter } from "./router";
import { createContext } from "../_core/context";

describe("trpc18 - postRouter", () => {
  it("should create post", async () => {
    const createPostMock = vi.fn().mockReturnValue("post1");

    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: vi.fn(),
        getUserById: vi.fn(),
        updateUser: vi.fn(),
        deleteUser: vi.fn(),
        createPost: createPostMock,
        getPostById: vi.fn(),
      },
    });

    const caller = appRouter.createCaller(ctx);
    const result = await caller.post.createPost({ title: "Hello" });

    expect(createPostMock).toHaveBeenCalledWith("Hello");
    expect(result).toEqual({ id: "post1" });
  });

  it("should throw NOT_FOUND for missing post", async () => {
    const ctx = createContext({
      dataAccess: {
        getVersion: () => "1.0.0",
        createUser: vi.fn(),
        getUserById: vi.fn(),
        updateUser: vi.fn(),
        deleteUser: vi.fn(),
        createPost: vi.fn(),
        getPostById: vi.fn().mockReturnValue(null),
      },
    });

    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.post.getPostById({ id: "42" })
    ).rejects.toThrow();
  });
});