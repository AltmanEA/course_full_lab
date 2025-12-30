/* cSpell:ignore networkidle */

import { test, expect } from '@playwright/test';

test.describe('Next.js 17: Базовый поиск с debounce', () => {
  test('should display all products initially', async ({ page }) => {
    await page.goto('http://localhost:3000/nextjs/nextjs17');
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что отображаются все 10 товаров
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(10);
    
    // Проверяем заголовок
    await expect(page.locator('h1')).toContainText('Поиск товаров');
  });

  test('should filter products when typing in search input', async ({ page }) => {
    await page.goto('http://localhost:3000/nextjs/nextjs17');
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('input[placeholder*="Поиск"]');
    
    // Вводим "Ноутбук"
    await input.fill('Ноутбук');
    
    // Ждем debounce (300мс + небольшой запас)
    await page.waitForTimeout(500);
    
    // Проверяем, что отображается только 1 товар
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(1);
    
    // Проверяем, что это именно Ноутбук
    await expect(rows.first()).toContainText('Ноутбук');
  });

  test('should update URL with query parameter after debounce', async ({ page }) => {
    await page.goto('http://localhost:3000/nextjs/nextjs17');
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('input[placeholder*="Поиск"]');
    
    // Вводим текст
    await input.fill('Смартфон');
    
    // Ждем debounce
    await page.waitForTimeout(500);
    
    // Проверяем URL
    await expect(page).toHaveURL(/[?]query=/);
    // URL encoded: Смартфон = %D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD
    await expect(page).toHaveURL(/%D0%A1%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD/);
  });

  test('should show empty state when no products match', async ({ page }) => {
    await page.goto('http://localhost:3000/nextjs/nextjs17');
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('input[placeholder*="Поиск"]');
    
    // Вводим несуществующий товар
    await input.fill('Несуществующий товар');
    
    // Ждем debounce
    await page.waitForTimeout(500);
    
    // Проверяем, что отображается сообщение "Ничего не найдено"
    await expect(page.locator('text=Ничего не найдено')).toBeVisible();
    
    // Проверяем, что в таблице есть только одна строка с сообщением
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(1);
  });

  test('should not reload page when searching (using debounce)', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('http://localhost:3000/nextjs/nextjs17');
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('input[placeholder*="Поиск"]');
    
    // Быстро вводим текст (чтобы проверить debounce)
    await input.fill('Кофе');
    await page.waitForTimeout(100); // меньше чем debounce
    await input.fill('Кофеварка');
    
    // Ждем завершения debounce
    await page.waitForTimeout(500);
    
    // Проверяем, что товар найден
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Кофеварка');
    
    // Проверяем, что нет критических ошибок
    const criticalErrors = errors.filter(msg => 
      msg.includes('TypeError') || msg.includes('ReferenceError')
    );
    expect(criticalErrors.length).toBe(0);
  });

  test('should work with query in URL on page load', async ({ page }) => {
    // Переходим сразу с параметром в URL - ищем "ноут"
    await page.goto('http://localhost:3000/nextjs/nextjs17?query=ноут');
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что в input есть текст
    const input = page.locator('input[placeholder*="Поиск"]');
    await expect(input).toHaveValue('ноут');

    // Проверяем, что отображается только 1 товар (Ноутбук)
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Ноутбук');
  });
    
  test('should clear filter when input is cleared', async ({ page }) => {
    await page.goto('http://localhost:3000/nextjs/nextjs17');
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('input[placeholder*="Поиск"]');
    
    // Вводим и очищаем
    await input.fill('Часы');
    await page.waitForTimeout(500);
    
    let rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(1);
    
    // Очищаем поле
    await input.clear();
    await page.waitForTimeout(500);
    
    // Проверяем, что все товары вернулись
    rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(10);
  });
});