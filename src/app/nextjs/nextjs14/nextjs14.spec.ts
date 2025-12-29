import { test, expect } from "@playwright/test";

test.describe("nextjs14 - Basic Page Streaming", () => {
  test("should show loading state from loading.tsx during initial render", async ({ page }) => {
    // Start navigation but don't wait for completion
    const responsePromise = page.waitForResponse("**/nextjs/nextjs14");
    await page.goto("/nextjs/nextjs14", { waitUntil: "commit" });

    // Wait a bit to let loading state render
    await page.waitForTimeout(500);

    // Check that loading state is displayed (from loading.tsx)
    await expect(page.getByText("Loading...")).toBeVisible();

    // Wait for response to complete
    await responsePromise;
  });

  test("should show skeleton structure during loading", async ({ page }) => {
    await page.goto("/nextjs/nextjs14", { waitUntil: "commit" });

    // Wait a bit to let loading state render
    await page.waitForTimeout(500);

    // Check that skeleton/animate-pulse elements are visible
    await expect(page.locator(".animate-pulse")).toBeVisible();
  });

  test("should not show page content immediately", async ({ page }) => {
    await page.goto("/nextjs/nextjs14", { waitUntil: "commit" });

    // Wait a bit to let loading state render
    await page.waitForTimeout(500);

    // Dashboard content should NOT be visible during loading
    await expect(page.getByText("Dashboard Data")).not.toBeVisible();
    await expect(page.getByText("Dashboard loaded successfully")).not.toBeVisible();
  });
});