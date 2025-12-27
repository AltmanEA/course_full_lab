/* cSpell:ignore networkidle */

import { test, expect } from '@playwright/test';

test.describe('Next.js 07: Active Link Navigation', () => {
  test('should highlight the active link in navigation', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs07');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что навигация присутствует
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Проверяем, что есть список ссылок
    const links = page.locator('nav a');
    await expect(links).toHaveCount(4);
    
    // Проверяем, что активная ссылка (Home) имеет специальный класс или стиль
    const activeLink = page.locator('a:has-text("Home")');
    await expect(activeLink).toBeVisible();
    
    // В задании активная ссылка не выделена специальным образом
    // В решении активная ссылка должна иметь специальный класс или стиль
    const activeLinkClasses = await activeLink.getAttribute('class');
    const hasActiveBorder = activeLinkClasses?.includes('border-indigo-500') ?? false;
    const hasActiveText = activeLinkClasses?.includes('text-gray-900') ?? false;
    
    // В задании ожидаем, что активная ссылка не имеет специального фона и текста
    // В решении ожидаем, что активная ссылка имеет специальный фон и текст
    // Этот тест проваливается в задании (false) и проходит в решении (true)
    expect(hasActiveBorder && hasActiveText).toBe(true); // В решении ожидаем true
  });

  test('should apply active styling to current page link', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs07');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что активная ссылка (Home) имеет специальный стиль
    const homeLink = page.locator('a:has-text("Home")');
    await expect(homeLink).toBeVisible();
    
    // В задании активная ссылка не имеет специального стиля
    // В решении активная ссылка должна иметь специальный стиль
    const homeLinkClasses = await homeLink.getAttribute('class');
    const hasActiveBorder = homeLinkClasses?.includes('border-indigo-500') ?? false;
    const hasActiveText = homeLinkClasses?.includes('text-gray-900') ?? false;
    
    // В задании ожидаем, что активная ссылка не имеет специального фона и текста
    // В решении ожидаем, что активная ссылка имеет специальный фон и текст
    // Этот тест проваливается в задании (false) и проходит в решении (true)
    expect(hasActiveBorder && hasActiveText).toBe(true); // В решении ожидаем true
  });

  test('should navigate to different pages and highlight active link correctly', async ({ page }) => {
    // Переходим на страницу Page 1 напрямую
    await page.goto('http://localhost:3000/nextjs/nextjs07/page1');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что активная ссылка (Page 1) имеет специальный стиль
    const page1Link = page.locator('a:has-text("Page 1")');
    await expect(page1Link).toBeVisible();
    
    // Проверяем, что Page 1 ссылка активна
    const page1LinkClasses = await page1Link.getAttribute('class');
    expect(page1LinkClasses).toContain('border-indigo-500');
    expect(page1LinkClasses).toContain('text-gray-900');
    
    // Проверяем, что Home ссылка теперь неактивна
    const inactiveHomeLink = page.locator('a:has-text("Home")');
    const inactiveHomeLinkClasses = await inactiveHomeLink.getAttribute('class');
    expect(inactiveHomeLinkClasses).not.toContain('border-indigo-500');
    expect(inactiveHomeLinkClasses).not.toContain('text-gray-900');
  });

  test('should load page without errors and show task content', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs07');
    
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
    await expect(page.locator('h1.text-3xl')).toContainText('Active Link Navigation');
    
    // Проверяем, что навигация присутствует
    await expect(page.locator('nav')).toBeVisible();
    
    // Проверяем, что есть 4 ссылки в навигации
    const links = page.locator('nav a');
    await expect(links).toHaveCount(4);
  });
});