import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("nextjs19 - Комбинированный поиск и пагинация", () => {
  test("должен отображать все элементы на первой странице без поиска", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs19");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("tbody tr")).toHaveCount(5);
    await expect(page.locator("h1")).toContainText("Комбинированный поиск");
  });

  test("поиск 'test' должен обновить URL с параметрами query и page=1", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs19");
    await page.waitForLoadState("networkidle");

    const input = page.locator('input[placeholder*="Поиск"]');

    await input.fill("Ноутбук");
    await page.waitForTimeout(500);

    await expect(page).toHaveURL(/[?]query=.*&page=1/);
    await expect(page).toHaveURL(/query=%D0%9D%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA/);
  });

  test("клик 'Следующая' должен перейти на страницу 2 с сохранением query", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs19");
    await page.waitForLoadState("networkidle");

    const input = page.locator('input[placeholder*="Поиск"]');

    await input.fill("Электроника");
    await page.waitForTimeout(500);

    await page.getByRole("button", { name: "Следующая" }).click();

    await expect(page).toHaveURL(/[?]query=.*&page=2/);
    await expect(page).toHaveURL(/query=%D0%AD%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D0%BD%D0%B8%D0%BA%D0%B0/);
  });

  test("при изменении поиска страница должна сбрасываться на 1", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs19");
    await page.waitForLoadState("networkidle");

    const input = page.locator('input[placeholder*="Поиск"]');

    // Сначала ищем и переходим на страницу 2
    await input.fill("Электроника");
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: "Следующая" }).click();
    await expect(page).toHaveURL(/.*page=2/);

    // Теперь меняем поиск - страница должна сброситься на 1
    await input.fill("Мышь");
    await page.waitForTimeout(500);

    await expect(page).toHaveURL(/[?]query=.*&page=1/);
    await expect(page).toHaveURL(/query=%D0%9C%D1%8B%D1%88%D1%8C/);
  });

  test("при обновлении страницы состояние должно восстанавливаться", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs19");
    await page.waitForLoadState("networkidle");

    const input = page.locator('input[placeholder*="Поиск"]');

    await input.fill("Ноутбук");
    await page.waitForTimeout(500);

    // Перезагружаем страницу
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Проверяем, что URL содержит параметры
    await expect(page).toHaveURL(/[?]query=.*&page=1/);

    // Проверяем, что input содержит значение
    await expect(input).toHaveValue("Ноутбук");

    // Проверяем, что отображается только 1 товар
    const rows = page.locator("tbody tr");
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText("Ноутбук");
  });

  test("пагинация должна работать с пустым поиском", async ({ page }) => {
    await page.goto("/nextjs/nextjs19");
    await page.waitForLoadState("networkidle");

    // Переходим на страницу 2 без поиска
    await page.goto("/nextjs/nextjs19?page=2");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("tbody tr")).toHaveCount(5);
    await expect(page.locator("tbody tr").first()).toContainText("Монитор");
    await expect(page.locator("tbody tr").last()).toContainText("Пылесос");
  });

  test("при очистке поиска страница должна сбрасываться на 1", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs19");
    await page.waitForLoadState("networkidle");

    const input = page.locator('input[placeholder*="Поиск"]');

    // Ищем что-то длинное для нескольких страниц
    await input.fill("а"); // буква "а" есть в многих названиях
    await page.waitForTimeout(500);

    // Переходим на страницу 2
    await page.getByRole("button", { name: "Следующая" }).click();
    await expect(page).toHaveURL(/.*page=2/);

    // Очищаем поиск
    await input.clear();
    await page.waitForTimeout(500);
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Проверяем, что page сбросился на 1
    await expect(page).toHaveURL(/[?]page=1$/);
  });
});