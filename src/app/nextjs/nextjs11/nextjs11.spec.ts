import { test, expect } from "@playwright/test";

test.describe("nextjs11 - Loading States with Suspense", () => {
  test("should show loading indicator while data is fetching", async ({ page }) => {
    await page.goto("/nextjs/nextjs11");

    // Проверяем, что loading присутствует в DOM
    const loading = page.getByTestId("loading-skeleton");
    await expect(loading).toBeVisible({ timeout: 1000 });
  });

  test("should display loading skeleton before user data", async ({ page }) => {
    await page.goto("/nextjs/nextjs11");

    //Loading должен быть виден
    const loading = page.getByTestId("loading-skeleton");
    await expect(loading).toBeVisible({ timeout: 1000 });

    // После загрузки loading исчезает
    await expect(loading).not.toBeVisible({ timeout: 3000 });

    // Реальные данные появляются
    await expect(page.getByText("Alice Johnson")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText("Bob Smith")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText("Charlie Brown")).toBeVisible({ timeout: 3000 });
  });

  test("should display task data after loading", async ({ page }) => {
    await page.goto("/nextjs/nextjs11");

    // Ждём загрузки данных
    await expect(page.getByText("Complete project report")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText("Review pull request")).toBeVisible({ timeout: 3000 });
    await expect(page.getByText("Update documentation")).toBeVisible({ timeout: 3000 });
  });

  test("should preserve page structure", async ({ page }) => {
    await page.goto("/nextjs/nextjs11");

    // Ждём полной загрузки
    await expect(page.getByText("Alice Johnson")).toBeVisible({ timeout: 3000 });

    // Проверяем заголовки
    await expect(page.getByText("Loading States with Suspense")).toBeVisible();
    await expect(page.getByText("User List")).toBeVisible();
    await expect(page.getByText("Task List")).toBeVisible();
  });

  test("should not show loading skeleton after data loads", async ({ page }) => {
    await page.goto("/nextjs/nextjs11");

    // Ждём полной загрузки данных
    await expect(page.getByText("Alice Johnson")).toBeVisible({ timeout: 3000 });

    // Loading должен исчезнуть
    await expect(page.getByTestId("loading-skeleton")).not.toBeVisible();
  });
});