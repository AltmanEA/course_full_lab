# Задание nextjs21 - Обновление инвойса с использованием динамического маршрута

## Что изучается:
- Динамические маршрутные сегменты `[id]`
- Чтение параметров `params` в Server Component
- Передача `id` в Server Action через `bind`
- Предзаполнение формы данными (`defaultValue`)

## Задача:
Реализуйте обновление инвойса:
1. Передайте `id` в Server Action через `bind({ id })`
2. Добавьте `id` в извлечение данных из `formData`
3. Используйте функцию обновления данных с WHERE условием
4. Вызовите `revalidatePath` после обновления

## Ссылки:
- [Документация Next.js - Mutating Data](https://nextjs.org/learn/dashboard-app/mutating-data)