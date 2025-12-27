import { test, expect } from '@playwright/test';

test.describe('Next.js 08: Programmatic Navigation with useRouter', () => {
  test('should navigate to success page after form submission', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs08');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что форма присутствует
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    // Заполняем email
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('test@example.com');
    
    // Нажимаем кнопку отправки
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Проверяем, что URL изменился на success page
    await expect(page).toHaveURL(/.*success/);
    
    // Проверяем, что на success странице есть подтверждение
    const successMessage = page.locator('text=Success!');
    await expect(successMessage).toBeVisible();
  });

  test('should have form with email input and submit button', async ({ page }) => {
    await page.goto('http://localhost:3000/nextjs/nextjs08');
    await page.waitForLoadState('networkidle');
    
    // Проверяем наличие формы
    await expect(page.locator('form')).toBeVisible();
    
    // Проверяем наличие email input
    await expect(page.locator('input[type="email"]')).toBeVisible();
    
    // Проверяем наличие кнопки отправки
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Проверяем текст на странице
    await expect(page.locator('text=Newsletter Subscription')).toBeVisible();
  });

  test('should navigate to success page when email is submitted', async ({ page }) => {
    await page.goto('http://localhost:3000/nextjs/nextjs08');
    await page.waitForLoadState('networkidle');
    
    // Заполняем форму
    await page.locator('input[type="email"]').fill('user@test.com');
    
    // Отправляем форму
    await page.locator('button[type="submit"]').click();
    
    // Ожидаем перехода на success страницу
    await expect(page).toHaveURL(/.*nextjs\/nextjs08\/success/);
    
    // Проверяем содержимое success страницы
    await expect(page.locator('text=You have successfully subscribed')).toBeVisible();
  });

  test('should load page without errors in console', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('http://localhost:3000/nextjs/nextjs08');
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что нет критических ошибок
    const criticalErrors = consoleErrors.filter(msg =>
      msg.includes('Failed to fetch') || 
      msg.includes('TypeError') || 
      msg.includes('ReferenceError')
    );
    expect(criticalErrors.length).toBe(0);
    
    // Проверяем основное содержимое страницы
    await expect(page.locator('h1.text-4xl')).toContainText('Programmatic Navigation Demo');
  });
});
