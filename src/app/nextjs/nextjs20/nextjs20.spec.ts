import { test, expect } from "@playwright/test";

test.describe("nextjs20 - Создание Server Action для создания инвойса", () => {
  test("должен создать инвойс и перенаправить на страницу списка", async ({
    page,
  }) => {
    // Заполняем форму
    await page.goto("/nextjs/nextjs20");
    await page.selectOption('select[name="customer_id"]', "customer_2");
    await page.fill('input[name="amount"]', "150.50");
    await page.click('input[value="pending"]');

    // Отправляем форму
    await page.click('button[type="submit"]');

    // Проверяем редирект на страницу списка инвойсов
    await expect(page).toHaveURL(/\/nextjs\/nextjs20\/invoices/);

    // Проверяем, что инвойс создан и отображается в списке
    const rows = page.locator("tbody tr");
    await expect(rows).toHaveCount(2); // 1 существующий + 1 новый

    // Проверяем данные нового инвойса
    const lastRow = rows.last();
    await expect(lastRow).toContainText("customer_2");
    await expect(lastRow).toContainText("$150.50");
    await expect(lastRow).toContainText("pending");
  });

  test("валидация при пустых полях", async ({ page }) => {
    await page.goto("/nextjs/nextjs20");

    // Пытаемся отправить пустую форму
    await page.click('button[type="submit"]');

    // Проверяем, что остались на той же странице (ошибка валидации)
    await expect(page).toHaveURL(/\/nextjs\/nextjs20$/);
  });
});