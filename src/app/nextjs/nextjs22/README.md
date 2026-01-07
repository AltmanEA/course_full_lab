# Задание nextjs22 - Удаление инвойса через Server Action

## Что изучается:
- Server Action для операции удаления
- Передача данных через bind в форму
- Использование revalidatePath без redirect
- Прогрессивное улучшение (работа без JavaScript)

## Задача:
Реализуйте удаление инвойса:
1. Оберните кнопку удаления в элемент `<form>`
2. Передайте `id` через `bind({ id })` в action
3. Реализуйте `deleteInvoice` action с удалением из массива invoices
4. Вызовите `revalidatePath` для обновления UI

## Ссылки:
- [Документация Next.js - Mutating Data](https://nextjs.org/learn/dashboard-app/mutating-data)