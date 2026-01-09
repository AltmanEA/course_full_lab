import { test, expect } from "@playwright/test";

test.describe("nextjs26 - Semantic HTML и Labelling в формах", () => {
  test.use({ baseURL: "http://localhost:3000" });

  test("форма создания инвойса должна использовать семантические элементы и правильное связывание label с полями", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs26");

    // Проверяем наличие формы
    const form = page.locator("form");
    await expect(form).toBeVisible();

    // Проверяем наличие label с htmlFor для customer_id
    const customerLabel = page.locator('label[for="customer_id"]');
    await expect(customerLabel).toBeVisible();
    await expect(customerLabel).toHaveText("Клиент");

    // Проверяем наличие select с id="customer_id"
    const customerSelect = page.locator('select[id="customer_id"]');
    await expect(customerSelect).toBeVisible();
    await expect(customerSelect).toHaveAttribute("name", "customer_id");

    // Проверяем наличие label с htmlFor для amount
    const amountLabel = page.locator('label[for="amount"]');
    await expect(amountLabel).toBeVisible();
    await expect(amountLabel).toHaveText("Сумма ($)");

    // Проверяем наличие input с id="amount"
    const amountInput = page.locator('input[id="amount"]');
    await expect(amountInput).toBeVisible();
    await expect(amountInput).toHaveAttribute("name", "amount");
    await expect(amountInput).toHaveAttribute("type", "number");

    // Проверяем наличие label с htmlFor для status
    const statusLabel = page.locator('label[for="status"]');
    await expect(statusLabel).toBeVisible();
    await expect(statusLabel).toHaveText("Статус");

    // Проверяем наличие select с id="status"
    const statusSelect = page.locator('select[id="status"]');
    await expect(statusSelect).toBeVisible();
    await expect(statusSelect).toHaveAttribute("name", "status");

    // Проверяем, что при клике на label фокус переходит на соответствующее поле
    await customerLabel.click();
    await expect(customerSelect).toBeFocused();

    await amountLabel.click();
    await expect(amountInput).toBeFocused();

    await statusLabel.click();
    await expect(statusSelect).toBeFocused();

    // Проверяем наличие кнопки отправки
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveText("Создать");
  });
});