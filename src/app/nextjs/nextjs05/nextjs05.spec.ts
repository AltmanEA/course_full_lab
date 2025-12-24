/* cSpell:ignore networkidle DashboardNav rendered data-render-id  */

import { test, expect } from '@playwright/test';

test.describe('Next.js 05: Dashboard Nested Layout', () => {
  test('should minimize DashboardNav re-renders when using layout', async ({ page }) => {
    const consoleMessages: string[] = [];
    
    // Собираем консольные сообщения от DashboardNav
    page.on('console', msg => {
      if (msg.text().includes('DashboardNav rendered')) {
        consoleMessages.push(msg.text());
      }
    });
    
    // Переходим на первую страницу
    await page.goto('http://localhost:3000/nextjs/nextjs05');
    await page.waitForLoadState('networkidle');
    
    // Переходим на вторую страницу (Settings)
    await page.goto('http://localhost:3000/nextjs/nextjs05/settings');
    await page.waitForLoadState('networkidle');
    
    // Переходим на третью страницу (Profile)
    await page.goto('http://localhost:3000/nextjs/nextjs05/profile');
    await page.waitForLoadState('networkidle');
    
    // Возвращаемся на первую страницу для дополнительного рендера
    await page.goto('http://localhost:3000/nextjs/nextjs05');
    await page.waitForLoadState('networkidle');
    
    // Снова переходим на Settings
    await page.goto('http://localhost:3000/nextjs/nextjs05/settings');
    await page.waitForLoadState('networkidle');
    
    // Снова переходим на Profile
    await page.goto('http://localhost:3000/nextjs/nextjs05/profile');
    await page.waitForLoadState('networkidle');
    
    // Подсчитываем количество рендеров DashboardNav
    const totalRenders = consoleMessages.length;
    
    // Проверяем результат:
    // При правильном решении (DashboardNav в layout) должно быть ≤ 6 рендеров
    // При неправильном решении (DashboardNav в page) будет ≥ 7 рендеров
    expect(totalRenders).toBeLessThanOrEqual(6);
    
    // Проверяем, что все страницы загружаются корректно
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('nav')).toContainText('Profile');
  });

  test('should have navigation working correctly across all pages', async ({ page }) => {
    const pages = [
      { url: 'http://localhost:3000/nextjs/nextjs05', expectedTitle: 'Dashboard Home' },
      { url: 'http://localhost:3000/nextjs/nextjs05/settings', expectedTitle: 'Dashboard Settings' },
      { url: 'http://localhost:3000/nextjs/nextjs05/profile', expectedTitle: 'Dashboard Profile' }
    ];
    
    for (const pageData of pages) {
      await page.goto(pageData.url);
      await page.waitForLoadState('networkidle');
      
      // Проверяем, что навигация присутствует и работает
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('h1')).toContainText('Dashboard');
      await expect(page.locator('h2')).toContainText(pageData.expectedTitle);
      
      // Проверяем, что все ссылки навигации присутствуют
      await expect(page.locator('nav')).toContainText('Home');
      await expect(page.locator('nav')).toContainText('Settings');
      await expect(page.locator('nav')).toContainText('Profile');
    }
  });
      
  test('should load all pages without console errors', async ({ page }) => {
    const pages = [
      'http://localhost:3000/nextjs/nextjs05',
      'http://localhost:3000/nextjs/nextjs05/settings',
      'http://localhost:3000/nextjs/nextjs05/profile'
    ];
    
    for (const url of pages) {
      const consoleMessages: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleMessages.push(msg.text());
        }
      });
      
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      
      // Проверяем, что нет критических ошибок
      const criticalErrors = consoleMessages.filter(msg => 
        msg.includes('Failed to fetch') || 
        msg.includes('TypeError') || 
        msg.includes('ReferenceError')
      );
      expect(criticalErrors.length).toBe(0);
      
      // Проверяем, что страница загружается корректно
      await expect(page.locator('h1')).toContainText('Dashboard');
      await expect(page.locator('nav')).toBeVisible();
    }
  });
});