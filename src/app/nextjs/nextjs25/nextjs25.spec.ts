import { test, expect } from "@playwright/test";

test.describe("nextjs25 - notFound() и not-found.tsx", () => {
  test.use({ baseURL: "http://localhost:3000" });

  test("должен отображать страницу редактирования для существующего инвойса", async ({
    page,
  }) => {
    // Переходим на страницу редактирования существующего инвойса
    await page.goto("/nextjs/nextjs25/invoices/1/edit");

    // Проверяем, что форма загрузилась
    await expect(page.locator("h1")).toContainText("Редактирование инвойса");
    await expect(page.locator('select[name="customer_id"]')).toHaveValue(
      "customer_1"
    );
    await expect(page.locator('input[name="amount"]')).toHaveValue("100.00");
  });

  test("должен отображать 404 для несуществующего инвойса", async ({
    page,
  }) => {
    // Переходим на страницу редактирования несуществующего инвойса
    await page.goto("/nextjs/nextjs25/invoices/999/edit");

    // Проверяем, что отображается страница 404, а не ошибка приложения
    await expect(page.locator("h1")).toContainText("404");
    await expect(page.locator("p")).toContainText("не существует");
    await expect(page.locator('a[href="/nextjs/nextjs25/invoices"]')).toBeVisible();
  });
});