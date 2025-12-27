# Next.js 11: Loading States with Suspense

## Задача
Улучшите UX, добавив индикатор загрузки вместо пустого экрана или "мигания" контента.

## Инструкция
1. Найдите TODO комментарий в файле `DashboardContent.tsx`
2. Добавьте `useState` для loading state и данных
3. Добавьте `useEffect` для асинхронной загрузки данных
4. Показывайте skeleton-компонент пока данные загружаются

## Требования
- Используйте `useState` для хранения loading state
- Используйте `useEffect` для загрузки данных
- Показывайте skeleton с `animate-pulse` пока loading
- После загрузки покажите реальные данные

## Подсказка
Используйте `useState` для loading state и `useEffect` с async функцией для загрузки данных.