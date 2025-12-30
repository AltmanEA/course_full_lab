import { test, expect } from "@playwright/test";

test.describe("nextjs18 - Пагинация с параметрами URL", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/nextjs/nextjs18");
  });

  test("должен отображать первые 5 элементов на первой странице", async ({ page }) => {
    await expect(page.locator("tbody tr")).toHaveCount(5);
    await expect(page.locator("tbody tr").first()).toContainText("Товар 1");
    await expect(page.locator("tbody tr").last()).toContainText("Товар 5");
  });

  test("кнопка 'Предыдущая' должна быть недоступна на первой странице", async ({ page }) => {
    const prevButton = page.getByRole("button", { name: "Предыдущая" });
    await expect(prevButton).toBeDisabled();
  });

  test("кнопка 'Следующая' должна быть доступна на первой странице", async ({ page }) => {
    const nextButton = page.getByRole("button", { name: "Следующая" });
    await expect(nextButton).not.toBeDisabled();
  });

  test("клик 'Далее' должен перейти на страницу 2 и показать элементы 6-10", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Следующая" }).click();
    await expect(page).toHaveURL(/.*page=2/);

    await expect(page.locator("tbody tr")).toHaveCount(5);
    await expect(page.locator("tbody tr").first()).toContainText("Товар 6");
    await expect(page.locator("tbody tr").last()).toContainText("Товар 10");
  });

  test("переход на страницу 3 напрямую через URL", async ({ page }) => {
    await page.goto("/nextjs/nextjs18?page=3");
    await expect(page.locator("tbody tr")).toHaveCount(5);
    await expect(page.locator("tbody tr").first()).toContainText("Товар 11");
    await expect(page.locator("tbody tr").last()).toContainText("Товар 15");
  });

  test("на последней странице кнопка 'Следующая' должна быть недоступна", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs18?page=5");
    const nextButton = page.getByRole("button", { name: "Следующая" });
    await expect(nextButton).toBeDisabled();
  });

  test("клик 'Предыдущая' должен перейти на предыдущую страницу", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs18?page=3");
    await page.getByRole("button", { name: "Предыдущая" }).click();
    await expect(page).toHaveURL(/.*page=2/);
    await expect(page.locator("tbody tr").first()).toContainText("Товар 6");
  });

  test("переход на несуществующую страницу должен корректно обрабатываться", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs18?page=100");
    // Должен отображаться пустой список или корректная обработка
    // В нашем случае страница не существует, но fallback - это page=1
    // Проверим, что нет ошибок и отображается хотя бы один элемент
    const rows = page.locator("tbody tr");
    await expect(rows.first()).toContainText("Товар 1");
  });

  test("отрицательный номер страницы должен обрабатываться корректно", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs18?page=-1");
    // Должен отображаться fallback на первую страницу
    await expect(page.locator("tbody tr").first()).toContainText("Товар 1");
  });
});