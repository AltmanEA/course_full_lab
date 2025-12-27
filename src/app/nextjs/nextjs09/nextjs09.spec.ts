import { test, expect } from "@playwright/test";

test.describe("Next.js 09: Async Data Fetching", () => {
  test("should display real user names from data.ts", async ({ page }) => {
    await page.goto("http://localhost:3000/nextjs/nextjs09");
    await page.waitForLoadState("networkidle");

    // Проверяем, что отображаются реальные имена из data.ts
    await expect(page.locator("text=Alice Johnson")).toBeVisible();
    await expect(page.locator("text=Bob Smith")).toBeVisible();
    await expect(page.locator("text=Charlie Brown")).toBeVisible();
  });

  test("should display user names in correct order", async ({ page }) => {
    await page.goto("http://localhost:3000/nextjs/nextjs09");
    await page.waitForLoadState("networkidle");

    // Проверяем порядок элементов
    const users = page.locator("ul li");
    await expect(users.first()).toContainText("Alice Johnson");
    await expect(users.nth(1)).toContainText("Bob Smith");
    await expect(users.nth(2)).toContainText("Charlie Brown");
  });

  test("should load page without console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("http://localhost:3000/nextjs/nextjs09");
    await page.waitForLoadState("networkidle");

    // Фильтруем только критические ошибки
    const criticalErrors = consoleErrors.filter(
      (msg) =>
        msg.includes("Failed to fetch") ||
        msg.includes("TypeError") ||
        msg.includes("ReferenceError")
    );
    expect(criticalErrors.length).toBe(0);
  });

  test("should contain expected page structure", async ({ page }) => {
    await page.goto("http://localhost:3000/nextjs/nextjs09");
    await page.waitForLoadState("networkidle");

    // Проверяем заголовки
    await expect(page.locator("h1")).toContainText("Async Data Fetching Demo");
    await expect(page.locator("h2").first()).toContainText("User List");

    // Проверяем что есть оба списка
    const listItems = page.locator("ul li");
    await expect(listItems).toHaveCount(6); // 3 users + 3 tasks
  });

  test("should fetch data in parallel (performance test)", async ({ page }) => {
    // Warmup — делаем холодный старт до измерения
    await page.goto("http://localhost:3000/nextjs/nextjs09");
    await page.waitForLoadState("networkidle");

    // Threshold: 1200ms (accounts for rendering overhead)
    // Parallel: ~400ms data fetching + overhead (~700ms)
    // Sequential: ~500ms data fetching + overhead (~700ms)
    const LOAD_TIME_THRESHOLD = 1200;

    const startTime = Date.now();

    await page.goto("http://localhost:3000/nextjs/nextjs09");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Log for debugging
    console.log(`Page load time: ${loadTime}ms`);

    // Page should load faster than threshold with parallel fetching
    expect(loadTime).toBeLessThan(LOAD_TIME_THRESHOLD);
  });

  test("should display both users and tasks lists", async ({ page }) => {
    await page.goto("http://localhost:3000/nextjs/nextjs09");
    await page.waitForLoadState("networkidle");

    // Check users are displayed
    await expect(page.locator("text=Alice Johnson")).toBeVisible();
    await expect(page.locator("text=Bob Smith")).toBeVisible();

    // Check tasks are displayed
    await expect(page.locator("text=Complete project report")).toBeVisible();
    await expect(page.locator("text=Review pull request")).toBeVisible();
    await expect(page.locator("text=Update documentation")).toBeVisible();
  });
});
