import { test, expect } from '@playwright/test';

test.describe('nextjs23 - Server Action Error Handling', () => {
  const baseURL = 'http://localhost:3000';

  test('полный тест: ошибка при маленькой сумме, успешное создание при большой', async ({ page }) => {
    // ШАГ 1: Проверяем ошибку при создании инвойса с недопустимой суммой
    await page.goto(`${baseURL}/nextjs/nextjs23`);
    await expect(page.locator('h1')).toContainText('Создать инвойс');

    // Заполняем форму с суммой менее 1000 (чтобы вызвать ошибку)
    await page.selectOption('select[name="customer_id"]', 'customer_1');
    await page.fill('input[name="amount"]', '500'); // Меньше минимума
    await page.selectOption('select[name="status"]', 'pending');

    // Отправляем форму
    await page.click('button[type="submit"]');

    // Ожидаем появления сообщения об ошибке
    await expect(page.locator('[data-testid="error-message"]')).toContainText(
      'Invalid amount: minimum is 1000 cents'
    );

    // Проверяем, что мы остались на странице создания (не было redirect)
    await expect(page.locator('h1')).toContainText('Создать инвойс');

    // ШАГ 2: Проверяем успешное создание инвойса
    // Заполняем форму с допустимой суммой (>= 1000)
    await page.selectOption('select[name="customer_id"]', 'customer_1');
    await page.fill('input[name="amount"]', '1500'); // Допустимая сумма
    await page.selectOption('select[name="status"]', 'pending');

    // Отправляем форму
    await page.click('button[type="submit"]');

    // Ожидаем перенаправления на страницу списка
    await expect(page).toHaveURL(`${baseURL}/nextjs/nextjs23/invoices`);
    await expect(page.locator('h1')).toContainText('Список инвойсов');

    // Проверяем, что новый инвойс (id=2) появился в списке
    await expect(page.locator('[data-testid="invoice-id"]').first()).toHaveText('1');
    await expect(page.locator('[data-testid="invoice-id"]').last()).toHaveText('2');
  });
});

