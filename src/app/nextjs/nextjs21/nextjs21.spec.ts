import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("nextjs21 - Обновление инвойса с использованием динамического маршрута", () => {
  test.use({ baseURL: "http://localhost:3000" });

  test("должен обновить инвойс и перенаправить на страницу списка", async ({
    page,
  }) => {
    // Переходим на страницу редактирования первого инвойса
    await page.goto("/nextjs/nextjs21/invoices/1/edit");

    // Проверяем, что форма предзаполнена данными
    await expect(page.locator('select[name="customer_id"]')).toHaveValue(
      "customer_1"
    );
    await expect(page.locator('input[name="amount"]')).toHaveValue("100.00");
    await expect(page.locator('input[value="paid"]')).toBeChecked();

    // Изменяем данные
    await page.selectOption('select[name="customer_id"]', "customer_3");
    await page.fill('input[name="amount"]', "350.50");
    await page.click('input[value="pending"]');

    // Отправляем форму
    await page.click('button[type="submit"]');

    // Проверяем редирект на страницу списка инвойсов
    await expect(page).toHaveURL(/\/nextjs\/nextjs21\/invoices$/);

    // Проверяем, что данные обновились в таблице
    const rows = page.locator("tbody tr");
    await expect(rows).toHaveCount(2);

    // Ищем строку с обновленным инвойсом
    const updatedRow = rows
      .filter({ has: page.locator("td", { hasText: "1" }) })
      .first();
    await expect(updatedRow).toContainText("Soylent Corp");
    await expect(updatedRow).toContainText("$350.50");
    await expect(updatedRow).toContainText("pending");

    // Возвращаемся на страницу редактирования и проверяем, что данные сохранились
    await page.goto("/nextjs/nextjs21/invoices/1/edit");
    await expect(page.locator('select[name="customer_id"]')).toHaveValue(
      "customer_3"
    );
    await expect(page.locator('input[name="amount"]')).toHaveValue("350.50");
    await expect(page.locator('input[value="pending"]')).toBeChecked();
  });
});