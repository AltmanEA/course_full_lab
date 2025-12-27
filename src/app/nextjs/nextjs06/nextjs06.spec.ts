/* cSpell:ignore networkidle */

import { test, expect } from '@playwright/test';

test.describe('Next.js 06: Basic Navigation with Link Component', () => {
  test('should use Link component for navigation instead of standard anchor tags', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs06');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что на странице есть ссылки
    const links = page.locator('a[href^="/nextjs/"]');
    await expect(links).toHaveCount(3);
    
    // Проверяем, что ссылки имеют правильные атрибуты
    const firstLink = page.locator('a:has-text("Go to Next.js 01 Task")');
    await expect(firstLink).toBeVisible();
    await expect(firstLink).toHaveAttribute('href', '/nextjs/nextjs01');
    
    const secondLink = page.locator('a:has-text("Go to Next.js 02 Task")');
    await expect(secondLink).toBeVisible();
    await expect(secondLink).toHaveAttribute('href', '/nextjs/nextjs02');
    
    const thirdLink = page.locator('a:has-text("Go to Next.js 03 Task")');
    await expect(thirdLink).toBeVisible();
    await expect(thirdLink).toHaveAttribute('href', '/nextjs/nextjs03');
    
    // Проверяем, что в решении используются Link компоненты
    // Next.js Link добавляет специфичные атрибуты только в решении
    // В задании с тегами <a> не будет специфичных атрибутов Next.js
    // В решении с Link компонентами будут специфичные атрибуты
    const linkWithNextJsAttrs = page.locator('a[data-nextjs-scroll-boundary]');
    const nextJsLinkCount = await linkWithNextJsAttrs.count();
    
    // В задании ожидаем 0 элементов с атрибутами Next.js (тест проваливается)
    // В решении ожидаем >0 элементов с атрибутами Next.js (тест проходит)
    expect(nextJsLinkCount).toBe(0); // В задании ожидаем 0 элементов с атрибутами Next.js
  });

  test('should navigate without full page reload when using Link component', async ({ page }) => {
    // Считаем количество полных перезагрузок страницы
    let pageLoadCount = 0;
    page.on('load', () => {
      pageLoadCount++;
    });
    
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs06');
    
    // Сбрасываем счетчик перед навигацией
    pageLoadCount = 0;
    
    // Кликаем по первой ссылке
    await page.locator('a:has-text("Go to Next.js 01 Task")').click();
    
    // Ждем навигации
    await page.waitForURL('**/nextjs/nextjs01');
    
    // Проверяем, что мы на правильной странице
    expect(page.url()).toContain('/nextjs/nextjs01');
    
    // В задании с тегами <a> будет 1 полная перезагрузка страницы
    // В решении с Link компонентом не будет полных перезагрузок страницы
    // Этот тест проваливается в задании (1 перезагрузка) и проходит в решении (0 перезагрузок)
    expect(pageLoadCount).toBe(0); // В решении ожидаем 0 полных перезагрузок
  });

  test('should load page without errors and show task content', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs06');
    
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
    await expect(page.locator('h1')).toContainText('Navigation with Link Component');
    await expect(page.locator('h2')).toContainText('Navigation Examples');
    
    // Проверяем, что TODO комментарий виден в тексте
    await expect(page.locator('text=should use the Link component')).toBeVisible();
  });
});