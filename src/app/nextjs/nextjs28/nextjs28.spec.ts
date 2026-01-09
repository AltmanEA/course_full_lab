/* cSpell:ignore networkidle */

import { test, expect } from '@playwright/test';

test.describe('Next.js 28: ARIA атрибуты для доступности форм', () => {
  test('должен иметь aria-describedby с валидным id на поле формы', async ({ page }) => {
    await page.goto('http://localhost:3000/nextjs/nextjs28');
    await page.waitForLoadState('networkidle');
    
    // Проверяем наличие input с атрибутом aria-describedby
    const emailInput = page.locator('input#email');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
  });

  test('должен иметь aria-live="polite" на контейнере ошибок', async ({ page }) => {
    await page.goto('http://localhost:3000/nextjs/nextjs28');
    await page.waitForLoadState('networkidle');
    
    // Вызываем ошибку валидации
    await page.click('button[type="submit"]');
    
    // Проверяем наличие контейнера ошибок с aria-live="polite"
    const errorContainer = page.locator('[aria-live="polite"]');
    await expect(errorContainer).toBeVisible();
  });

  test('должен иметь id="email-error" на контейнере ошибки', async ({ page }) => {
    await page.goto('http://localhost:3000/nextjs/nextjs28');
    await page.waitForLoadState('networkidle');
    
    // Вызываем ошибку валидации
    await page.click('button[type="submit"]');
    
    // Проверяем наличие контейнера с id="email-error"
    const errorElement = page.locator('#email-error');
    await expect(errorElement).toBeVisible();
  });

  test('должен отображать ошибку валидации и связывать её с полем', async ({ page }) => {
    await page.goto('http://localhost:3000/nextjs/nextjs28');
    await page.waitForLoadState('networkidle');
    
    // Отправляем форму без заполнения поля email
    await page.click('button[type="submit"]');
    
    // Проверяем, что ошибка отображается
    const errorMessage = page.locator('#email-error');
    await expect(errorMessage).toContainText('обязательно');
    
    // Проверяем связь между полем ввода и сообщением об ошибке
    const emailInput = page.locator('input#email');
    await expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
    
    // Проверяем aria-live для анонса изменений
    await expect(errorMessage).toHaveAttribute('aria-live', 'polite');
  });

  test('должен загружаться без ошибок консоли', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('http://localhost:3000/nextjs/nextjs28');
    await page.waitForLoadState('networkidle');
    
    // Фильтруем критические ошибки
    const criticalErrors = consoleErrors.filter(msg => 
      msg.includes('Failed to fetch') || 
      msg.includes('TypeError') || 
      msg.includes('ReferenceError')
    );
    expect(criticalErrors.length).toBe(0);
  });
});