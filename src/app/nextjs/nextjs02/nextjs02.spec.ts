/* cSpell:ignore networkidle */

import { test, expect } from '@playwright/test';

test.describe('Next.js 02: Optimizing Fonts and Images', () => {
  test('should use optimized fonts and images', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs02');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что НЕТ внешних ссылок на Google Fonts (они должны быть заменены на next/font)
    const fontLinks = page.locator('link[href*="fonts.googleapis.com"]');
    await expect(fontLinks).toHaveCount(0);
    
    // Проверяем оптимизированное изображение
    const optimizedImage = page.locator('img');
    await expect(optimizedImage).toHaveCount(1);
    
    // Проверяем атрибуты изображения от next/image
    const image = optimizedImage.first();
    await expect(image).toHaveAttribute('alt', 'Font Example');
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
    await page.goto('http://localhost:3000/nextjs/nextjs02');
    
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
    await expect(page.locator('h1')).toContainText('Font and Image Optimization Demo');
    await expect(page.locator('h2')).toContainText('Optimized Fonts and Images Example');
    
    // Проверяем, что текст задачи виден
    await expect(page.locator('text=should use optimized fonts')).toBeVisible();
    
    // Проверяем, что есть различные стили текста
    await expect(page.locator('text=Sample text with custom font styling')).toBeVisible();
    await expect(page.locator('text=Bold text example')).toBeVisible();
    await expect(page.locator('text=Small text for demonstration')).toBeVisible();
  });

  test('should have proper font loading and display', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs02');
    
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что шрифты применяются (проверяем computed styles)
    const heading = page.locator('h1').first();
    const headingStyles = await heading.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontWeight: computed.fontWeight,
        fontSize: computed.fontSize
      };
    });
    
    // Шрифты должны быть загружены (не system fonts)
    expect(headingStyles.fontFamily).not.toContain('system-ui');
    expect(headingStyles.fontWeight).toBe('700');
    
    // Проверяем, что текст корректно отображается
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Font and Image Optimization Demo');
  });
});