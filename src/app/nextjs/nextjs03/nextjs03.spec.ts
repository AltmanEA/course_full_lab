/* cSpell:ignore networkidle */

import { test, expect } from '@playwright/test';

test.describe('Next.js 03: Lazy Loading Images', () => {
  test('should have lazy loading on images', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs03');
    
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что есть изображения с lazy loading
    const images = page.locator('img[loading="lazy"]');
    await expect(images).toHaveCount(2);
    
    // Проверяем первые изображения
    const firstImage = images.first();
    await expect(firstImage).toHaveAttribute('alt', 'Gallery Image 1');
    await expect(firstImage).toHaveAttribute('width', '400');
    await expect(firstImage).toHaveAttribute('height', '300');
    
    // Проверяем второе изображение
    const secondImage = images.nth(1);
    await expect(secondImage).toHaveAttribute('alt', 'Gallery Image 2');
    await expect(secondImage).toHaveAttribute('width', '400');
    await expect(secondImage).toHaveAttribute('height', '300');
    
    // Проверяем, что изображения видимы и загружаются
    const firstImageBox = await firstImage.boundingBox();
    expect(firstImageBox?.width).toBeGreaterThan(0);
    expect(firstImageBox?.height).toBeGreaterThan(0);
    
    await expect(firstImage).toBeVisible();
    await expect(secondImage).toBeVisible();
  });

  test('should load page without errors and show task content', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs03');
    
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
    await expect(page.locator('h1')).toContainText('Lazy Loading Demo');
    await expect(page.locator('h2').first()).toContainText('Image Gallery');
    await expect(page.locator('h2').nth(1)).toContainText('Performance Benefits');
    
    // Проверяем, что текст задачи виден
    await expect(page.locator('text=should load only when they are about to enter')).toBeVisible();
    
    // Проверяем подписи к изображениям
    await expect(page.locator('text=Image 1')).toBeVisible();
    await expect(page.locator('text=Image 2')).toBeVisible();
  });

  test('should have proper image optimization attributes', async ({ page }) => {
    // Переходим на страницу задачи
    await page.goto('http://localhost:3000/nextjs/nextjs03');
    
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что все изображения имеют правильные атрибуты
    const allImages = page.locator('img');
    const imageCount = await allImages.count();
    
    // Должно быть ровно 2 изображения
    expect(imageCount).toBe(2);
    
    // Проверяем, что оба изображения имеют loading="lazy"
    for (let i = 0; i < imageCount; i++) {
      const image = allImages.nth(i);
      await expect(image).toHaveAttribute('loading', 'lazy');
      
      // Проверяем наличие обязательных атрибутов
      await expect(image).toHaveAttribute('alt');
      await expect(image).toHaveAttribute('width');
      await expect(image).toHaveAttribute('height');
      
      // Проверяем, что изображения не имеют loading="eager" или loading="auto"
      const loadingAttr = await image.getAttribute('loading');
      expect(loadingAttr).toBe('lazy');
    }
  });
});