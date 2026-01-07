import { test, expect } from "@playwright/test";

test.describe("nextjs22 - Удаление инвойса через Server Action", () => {
  test.use({ baseURL: "http://localhost:3000" });

  test("должен удалить инвойс и обновить таблицу без перезагрузки страницы", async ({
    page,
  }) => {
    // Переходим на страницу списка инвойсов
    await page.goto("/nextjs/nextjs22/invoices");

    // Проверяем, что есть 3 инвойса
    const rows = page.locator("tbody tr");
    await expect(rows).toHaveCount(3);

    // Проверяем наличие кнопки удаления для инвойса 1
    const deleteButton = page.locator('[data-testid="delete-1"]');
    await expect(deleteButton).toBeVisible();
    await expect(deleteButton).toHaveText("Delete");

    // Получаем количество строк перед удалением
    const rowCountBefore = await rows.count();

    // Нажимаем кнопку удаления для первого инвойса
    await deleteButton.click();

    // Проверяем, что количество строк уменьшилось на 1 (обновление без перезагрузки)
    // Ждём обновления DOM после Server Action
    await expect(rows).toHaveCount(rowCountBefore - 1);

    // Проверяем, что удалённый инвойс больше не отображается
    await expect(page.locator("tbody tr:first-child td:first-child")).not.toHaveText("1");

    // Проверяем, что оставшиеся инвойсы всё ещё отображаются
    await expect(page.locator("tbody tr", { has: page.locator("td:first-child", { hasText: "2" }) })).toBeVisible();
    await expect(page.locator("tbody tr", { has: page.locator("td:first-child", { hasText: "3" }) })).toBeVisible();

    // Проверяем, что URL не изменился (без redirect)
    await expect(page).toHaveURL(/\/nextjs\/nextjs22\/invoices$/);

    // Проверяем, что кнопки удаления для оставшихся инвойсов работают
    await page.locator('[data-testid="delete-2"]').click();
    await expect(rows).toHaveCount(1);
    await expect(page.locator("tbody tr:first-child td:first-child")).not.toHaveText("2");

    // Удаляем последний инвойс
    await page.locator('[data-testid="delete-3"]').click();
    await expect(rows).toHaveCount(0);
  });
});