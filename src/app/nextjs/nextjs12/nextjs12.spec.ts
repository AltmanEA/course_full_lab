import { test, expect } from "@playwright/test";

interface ApiResponse {
  message: string;
  timestamp: string;
  requestCount: number;
}

test.describe("nextjs12 - Static Rendering with Caching", () => {
  test("should cache data and make only 1 API request on page refresh", async ({ page }) => {
    await page.goto("/nextjs/nextjs12");

    // Проверяем, что страница загружается
    await expect(page.getByText("Static Rendering with Caching")).toBeVisible();
    await expect(page.getByText("Data from API")).toBeVisible();

    // Получаем начальное значение requestCount из API
    const initialResponse: ApiResponse = await page.evaluate(async (): Promise<ApiResponse> => {
      const res = await fetch('/api/nextjs12');
      return res.json() as unknown as ApiResponse;
    });
    const initialCount = initialResponse.requestCount;

    // Обновляем страницу
    await page.reload();

    // Проверяем, что requestCount не увеличился (данные были из кэша)
    const afterReloadResponse: ApiResponse = await page.evaluate(async (): Promise<ApiResponse> => {
      const res = await fetch('/api/nextjs12');
      return res.json() as unknown as ApiResponse;
    });
    
    // Если кэширование работает, счётчик должен остаться тем же или увеличиться не более чем на 1
    expect(afterReloadResponse.requestCount).toBeLessThanOrEqual(initialCount + 1);
  });

  test("should display cached data without loading text", async ({ page }) => {
    await page.goto("/nextjs/nextjs12");

    // Проверяем, что отображаются реальные данные, а не "Loading..."
    await expect(page.getByText("Static data")).toBeVisible();
    await expect(page.getByText("Loading...")).not.toBeVisible();
  });

  test("should preserve page structure", async ({ page }) => {
    await page.goto("/nextjs/nextjs12");

    await expect(page.getByText("Static Rendering with Caching")).toBeVisible();
    await expect(page.getByText("Data from API")).toBeVisible();
    
    // Проверяем, что контент внутри карточки отображается
    const cardContent = page.locator(".bg-white p").first();
    await expect(cardContent).toBeVisible();
  });
});