import { test } from '@playwright/test';

test.describe('Next.js 15: Route Groups for Loading Isolation', () => {
  test('should show loading on / - loading.tsx applies to this route', async ({ page }) => {
    // Проверяем /dashboard - loading ДОЛЖЕН быть виден
    await page.goto('http://localhost:3000/nextjs/nextjs15', { waitUntil: 'commit' });

    // Проверяем что loading indicator присутствует
    await page.locator('text=Loading...').waitFor({ state: 'attached', timeout: 5000 });
  });

  test('should NOT show loading on /invoices - loading.tsx should be isolated', async ({ page }) => {
    // Проверяем /invoices - loading НЕ должен быть частью этой страницы
    await page.goto('http://localhost:3000/nextjs/nextjs15/invoices', { waitUntil: 'commit' });

    let notFound=false
    // Проверяем что loading indicator НЕ присутствует
    try {
      await page.locator('text=Loading...').waitFor({ state: 'attached', timeout: 5000 });      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {      
      // Если элемент не найден за - это правильный результат  
      notFound = true
    }
    if(!notFound){
      throw new Error(`Найден Loading on the /invoices page. (URL=${page.url()})`);
    }
  });

  test('should NOT show loading on /customers - loading.tsx should be isolated', async ({ page }) => {
    // Проверяем /customers - loading НЕ должен быть частью этой страницы
    await page.goto('http://localhost:3000/nextjs/nextjs15/customers', { waitUntil: 'commit' });

    let notFound=false
    // Проверяем что loading indicator НЕ присутствует
    try {
      await page.locator('text=Loading...').waitFor({ state: 'attached', timeout: 5000 });      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {      
      // Если элемент не найден за - это правильный результат  
      notFound = true
    }
    if(!notFound){
      throw new Error(`Найден Loading on the /customers page. (URL=${page.url()})`);
    }
  });
});