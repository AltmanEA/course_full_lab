import { test, expect } from "@playwright/test";

test.describe("nextjs10 - Async Data Fetching", () => {
  test("should display real user names from data.ts", async ({ page }) => {
    await page.goto("/nextjs/nextjs10");

    // Ожидаем появления реальных имен пользователей
    await expect(page.getByText("Alice Johnson")).toBeVisible();
    await expect(page.getByText("Bob Smith")).toBeVisible();
    await expect(page.getByText("Charlie Brown")).toBeVisible();
  });

  test("should not display static user placeholders", async ({ page }) => {
    await page.goto("/nextjs/nextjs10");

    // Статичный текст "User 1, User 2, User 3" не должен отображаться
    await expect(page.getByText("User 1")).not.toBeVisible();
    await expect(page.getByText("User 2")).not.toBeVisible();
    await expect(page.getByText("User 3")).not.toBeVisible();
  });

  test("should preserve page structure", async ({ page }) => {
    await page.goto("/nextjs/nextjs10");

    // Проверяем заголовки
    await expect(page.getByText("Async Data Fetching Demo")).toBeVisible();
    await expect(page.getByText("User List")).toBeVisible();

    // Проверяем что список пользователей существует
    const userList = page.locator("ul").first();
    await expect(userList).toBeVisible();
  });
});