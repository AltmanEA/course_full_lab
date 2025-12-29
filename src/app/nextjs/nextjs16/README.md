# Next.js 16: Streaming отдельного компонента с Suspense

## Задача
Оптимизируйте загрузку страницы, перенеся fetch данных с уровня страницы на уровень отдельного компонента. Используйте Suspense для стриминга и избегайте "popping effect".

## Инструкция
1. Найдите TODO комментарий в файле `page.tsx`
2. Перенесите `fetchRevenue()` из `page.tsx` в компонент `RevenueChart`
3. Оберните `<RevenueChart>` в `<Suspense>` с fallback `<RevenueChartSkeleton>`
4. Уберите проп `data` из `RevenueChart`

## Требования
- Компонент `RevenueChart` должен сам загружать свои данные
- Используйте `<Suspense>` для стриминга `RevenueChart`
- Создайте `RevenueChartSkeleton` как fallback компонент
- `Header` и `Stats` должны отображаться сразу, не дожидаясь `RevenueChart`

## Подсказка
Используйте `await` внутри асинхронного компонента для загрузки данных. Внешний компонент не должен ждать завершения загрузки `RevenueChart`.