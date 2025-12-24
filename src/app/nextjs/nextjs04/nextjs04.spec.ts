/* cSpell:ignore networkidle */

import { test, expect } from '@playwright/test';

test.describe('Next.js 04: Creating Route Segments', () => {
  test('should be accessible at demo route', async ({ page }) => {
    // Переходим на страницу по правильному пути
    await page.goto('http://localhost:3000/nextjs/nextjs04/demo');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что страница не возвращает 404
    await expect(page.locator('h1')).not.toContainText('404');
    
    // Проверяем основное содержимое страницы
    await expect(page.locator('h1')).toContainText('Route Segments Demo');
    await expect(page.locator('h2')).toContainText('Understanding Route Segments');
    
    // Проверяем, что текст задачи виден
    await expect(page.locator('text=should be accessible at /demo path')).toBeVisible();
    
    // Проверяем информацию о route segments
    await expect(page.locator('text=Route segments are created by folders')).toBeVisible();
    await expect(page.locator('text=Files create pages, folders create routes')).toBeVisible();
  });

  test('should show different content at root route', async ({ page }) => {
    // Проверяем, что в корне nextjs04 контент отличается
    await page.goto('http://localhost:3000/nextjs/nextjs04');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что содержимое изменилось - больше нет текста о том, что должно быть в /demo
    const pageContent = await page.textContent('body');
    
    // Если задача решена, то на корневом пути будет другой контент
    expect(pageContent).not.toContain('This page should be accessible at /demo path');
  });

  test('should load page without errors and show task content', async ({ page }) => {
    // Переходим на страницу задачи по правильному пути
    await page.goto('http://localhost:3000/nextjs/nextjs04/demo');
    
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
    await expect(page.locator('h1')).toContainText('Route Segments Demo');
    await expect(page.locator('h2').first()).toContainText('Understanding Route Segments');
  });
});