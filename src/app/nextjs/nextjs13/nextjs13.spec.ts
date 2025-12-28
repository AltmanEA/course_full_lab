import { test, expect } from "@playwright/test";

test.describe("nextjs13 - Dynamic Rendering for Real-Time Data", () => {
  test("should fetch fresh data on each page load", async ({ page }) => {
    await page.goto("/nextjs/nextjs13");

    // Ждем загрузки timestamp
    const firstTimestamp = await page.locator("#timestamp").textContent();
    expect(firstTimestamp).toBeTruthy();

    // Обновляем страницу и получаем новый timestamp
    await page.reload();
    await page.waitForSelector("#timestamp");

    const secondTimestamp = await page.locator("#timestamp").textContent();
    expect(secondTimestamp).toBeTruthy();

    // Timestamp должен измениться (данные не кэшируются)
    expect(firstTimestamp).not.toEqual(secondTimestamp);
  });

  test("should display message and timestamp from API", async ({ page }) => {
    await page.goto("/nextjs/nextjs13");

    // Проверяем отображение данных из API
    await expect(page.getByText("Static data")).toBeVisible();

    // Проверяем наличие timestamp элемента
    await expect(page.locator("#timestamp")).toBeVisible();

    const timestampText = await page.locator("#timestamp").textContent();
    expect(timestampText).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  test("should preserve page structure", async ({ page }) => {
    await page.goto("/nextjs/nextjs13");

    // Проверяем заголовки
    await expect(page.getByText("Dynamic Rendering for Real-Time Data")).toBeVisible();
    await expect(page.getByText("Real-Time Data", { exact: true })).toBeVisible();

    // Проверяем контейнер с данными
    const dataContainer = page.locator(".bg-white").first();
    await expect(dataContainer).toBeVisible();
  });
});