import { test, expect } from "@playwright/test";

test.describe("nextjs16 - Streaming с Suspense", () => {
  test("RevenueChartSkeleton должен отображаться во время загрузки", async ({
    page,
  }) => {
    // Переходим на страницу сразу после commit - до полной загрузки
    await page.goto("http://localhost:3000/nextjs/nextjs16", {
      waitUntil: "commit",
    });

    // Проверяем, что skeleton присутствует (Suspense fallback)
    await page.locator('[data-testid="revenue-skeleton"]').waitFor({
      state: "attached",
      timeout: 5000,
    });

    // Ждем, пока skeleton исчезнет (данные загрузятся)
    await page.locator('[data-testid="revenue-skeleton"]').waitFor({
      state: "detached",
      timeout: 5000,
    });

    // Проверяем, что реальные данные отображаются
    await expect(page.getByText("Jan")).toBeVisible({ timeout: 3000 });
  });

  test("Header отображается статично без загрузки", async ({ page }) => {
    await page.goto("http://localhost:3000/nextjs/nextjs16", {
      waitUntil: "commit",
    });

    // Header должен быть виден сразу
    await expect(page.getByText("Dashboard")).toBeVisible({ timeout: 2000 });
    await expect(page.getByText("Overview of your business metrics")).toBeVisible({
      timeout: 2000,
    });
  });

  test("Stats отображается без задержки", async ({ page }) => {
    await page.goto("http://localhost:3000/nextjs/nextjs16", {
      waitUntil: "commit",
    });

    // Stats должен быть виден сразу
    await expect(page.getByText("Total Revenue")).toBeVisible({ timeout: 2000 });
    await expect(page.getByText("$112 000")).toBeVisible({ timeout: 2000 });
    await expect(page.getByText("1 245")).toBeVisible({ timeout: 2000 });
    await expect(page.getByText("32")).toBeVisible({ timeout: 2000 });
  });

  test("Header и Stats появляются раньше RevenueChart", async ({ page }) => {
    // Переходим на страницу сразу после commit
    await page.goto("http://localhost:3000/nextjs/nextjs16", {
      waitUntil: "commit",
    });

    // Header и Stats должны быть видны сразу
    await expect(page.getByText("Dashboard")).toBeVisible({ timeout: 2000 });
    await expect(page.getByText("Total Revenue")).toBeVisible({ timeout: 2000 });

    // Skeleton тоже должен присутствовать (Suspense работает)
    await page.locator('[data-testid="revenue-skeleton"]').waitFor({
      state: "attached",
      timeout: 5000,
    });

    // Ждем полной загрузки RevenueChart
    await expect(page.getByText("Jan")).toBeVisible({ timeout: 5000 });
  });

  test("RevenueChart отображает корректные данные после загрузки", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/nextjs/nextjs16", {
      waitUntil: "commit",
    });

    // Ждем полной загрузки всех данных
    await expect(page.getByText("Jan")).toBeVisible({ timeout: 8000 });
    await expect(page.getByText("Feb")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Mar")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Apr")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("May")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("Jun")).toBeVisible({ timeout: 5000 });

    // Проверяем данные о выручке
    await expect(page.getByText("$12 500")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("$25 000")).toBeVisible({ timeout: 5000 });
  });
});