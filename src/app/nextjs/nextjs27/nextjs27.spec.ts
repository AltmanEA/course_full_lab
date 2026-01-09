import { test, expect } from "@playwright/test";

test.describe("nextjs27 - Серверная валидация с useActionState", () => {
  test.use({ baseURL: "http://localhost:3000" });

  test("отправка пустой формы должна отображать ошибки валидации для всех полей", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs27");
    await page.waitForLoadState("networkidle");

    // Отправляем пустую форму
    await page.click('button[type="submit"]');

    // Проверяем ошибки валидации для всех полей (используем селектор для paragraph)
    const customerError = page.locator('p:has-text("Выберите клиента")');
    await expect(customerError).toBeVisible();

    const amountError = page.locator('p:has-text("Сумма должна быть больше 0")');
    await expect(amountError).toBeVisible();

    const statusError = page.locator('p:has-text("Выберите статус")');
    await expect(statusError).toBeVisible();
  });

  test("успешная отправка валидной формы проходит без ошибок", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs27");
    await page.waitForLoadState("networkidle");

    // Заполняем форму валидными данными
    await page.selectOption('select[id="customer_id"]', "customer_1");
    await page.fill('input[id="amount"]', "5000");
    await page.selectOption('select[id="status"]', "pending");

    // Отправляем форму
    await page.click('button[type="submit"]');

    // Проверяем успешное сообщение
    const successMessage = page.locator('text=Инвойс успешно создан');
    await expect(successMessage).toBeVisible();

    // Проверяем, что ошибки НЕ отображаются
    const customerError = page.locator('p:has-text("Выберите клиента")');
    await expect(customerError).toBeHidden();

    const amountError = page.locator('p:has-text("Сумма должна быть больше 0")');
    await expect(amountError).toBeHidden();

    const statusError = page.locator('p:has-text("Выберите статус")');
    await expect(statusError).toBeHidden();
  });

  test("частичное заполнение формы должно показывать ошибки только для пустых полей", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs27");
    await page.waitForLoadState("networkidle");

    // Заполняем только customer_id
    await page.selectOption('select[id="customer_id"]', "customer_1");

    // Отправляем форму
    await page.click('button[type="submit"]');

    // Проверяем ошибки только для пустых полей
    const amountError = page.locator('p:has-text("Сумма должна быть больше 0")');
    await expect(amountError).toBeVisible();

    const statusError = page.locator('p:has-text("Выберите статус")');
    await expect(statusError).toBeVisible();

    // Ошибки customer_id быть не должно
    const customerError = page.locator('p:has-text("Выберите клиента")');
    await expect(customerError).toBeHidden();
  });

  test("отрицательная сумма должна показывать ошибку валидации", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs27");
    await page.waitForLoadState("networkidle");

    // Заполняем форму с отрицательной суммой
    await page.selectOption('select[id="customer_id"]', "customer_1");
    await page.fill('input[id="amount"]', "-100");
    await page.selectOption('select[id="status"]', "paid");

    // Отправляем форму
    await page.click('button[type="submit"]');

    // Проверяем ошибку суммы
    const amountError = page.locator('text=Сумма должна быть больше 0');
    await expect(amountError).toBeVisible();
  });

  test("форма должна загружаться без ошибок консоли", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/nextjs/nextjs27");
    await page.waitForLoadState("networkidle");

    // Фильтруем критические ошибки
    const criticalErrors = consoleErrors.filter(
      (msg) =>
        msg.includes("Failed to fetch") ||
        msg.includes("TypeError") ||
        msg.includes("ReferenceError")
    );
    expect(criticalErrors.length).toBe(0);
  });
});