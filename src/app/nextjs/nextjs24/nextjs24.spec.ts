import { test, expect } from "@playwright/test";

test.describe("nextjs24 - Error Boundary для границы ошибок", () => {
  test.use({ baseURL: "http://localhost:3000" });

  test("должен показать fallback UI с кнопкой Попробовать снова при ошибке", async ({
    page,
  }) => {
    // Переходим на страницу, которая выбрасывает ошибку
    await page.goto("/nextjs/nextjs24/invoices");

    // Проверяем, что отображается error container
    const errorContainer = page.locator(".error-container");
    await expect(errorContainer).toBeVisible();

    // Проверяем заголовок ошибки
    await expect(
      page.getByRole("heading", { name: "Что-то пошло не так!" })
    ).toBeVisible();

    // Проверяем, что отображается сообщение об ошибке
    const errorMessage = page.locator(".error-message");
    await expect(errorMessage).toContainText("Ошибка загрузки данных");

    // Проверяем наличие кнопки "Попробовать снова"
    const retryButton = page.getByRole("button", { name: "Попробовать снова" });
    await expect(retryButton).toBeVisible();

    // Проверяем, что основной контент (таблица) не отображается
    await expect(page.locator("table")).not.toBeVisible();
  });

  test("должен позволить повторить запрос при нажатии на кнопку", async ({
    page,
  }) => {
    await page.goto("/nextjs/nextjs24/invoices");

    // Проверяем наличие кнопки
    const retryButton = page.getByRole("button", { name: "Попробовать снова" });
    await expect(retryButton).toBeVisible();

    // Нажимаем кнопку - должен быть повторный рендер с той же ошибкой
    await retryButton.click();

    // После клика снова должна быть ошибка (так как fetch всё ещё неуспешен)
    await expect(
      page.getByRole("heading", { name: "Что-то пошло не так!" })
    ).toBeVisible();
    await expect(retryButton).toBeVisible();
  });
});