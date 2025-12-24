/* cSpell:ignore networkidle */

import { test, expect } from '@playwright/test';

test.describe('Next.js 01: Optimizing Images', () => {
  test('should have optimized image using next/image', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs01');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что используется next/image компонент
    // next/image может создавать разные структуры в зависимости от версии
    const optimizedImage = page.locator('img');
    await expect(optimizedImage).toHaveCount(1);
    
    // Проверяем, что изображение имеет правильные атрибуты от next/image
    const image = optimizedImage.first();
    await expect(image).toHaveAttribute('alt', 'Example');
    await expect(image).toHaveAttribute('width', '800');
    await expect(image).toHaveAttribute('height', '400');
    
    // Проверяем, что изображение загружается и имеет правильные размеры
    const imageBox = await image.boundingBox();
    expect(imageBox?.width).toBeGreaterThan(0);
    expect(imageBox?.height).toBeGreaterThan(0);
    
    // Проверяем, что изображение видимо
    await expect(image).toBeVisible();
  });

  test('should load page without errors and show task content', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs01');
    
    // Проверяем, что страница загружается без ошибок в консоли
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });
    
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что нет критических ошибок
    const criticalErrors = consoleMessages.filter(msg => 
      msg.includes('Failed to fetch') || msg.includes('TypeError') || msg.includes('ReferenceError')
    );
    expect(criticalErrors.length).toBe(0);
    
    // Проверяем основное содержимое страницы
    await expect(page.locator('h1')).toContainText('Next.js Optimization Demo');
    await expect(page.locator('h2')).toContainText('Optimized Image Example');
    
    // Проверяем, что TODO комментарий виден в тексте
    await expect(page.locator('text=should be optimized')).toBeVisible();
  });
});