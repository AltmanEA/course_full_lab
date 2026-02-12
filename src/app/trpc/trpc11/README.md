# trpc11 — Data-access через context

## Цель задачи

Освоить использование dependency injection через context для вызова data-access функций.

## Тип задачи

Архитектурная (DI).

## Задание

В файле `router.ts` необходимо:

1. Создать appRouter.
2. Добавить query-процедуру `getVersion`.
3. Процедура должна вызывать:

   ctx.dataAccess.getVersion()

4. Процедура должна возвращать:

   { version: string }

## Ограничения

- Нельзя импортировать data-access напрямую.
- Доступ к data-access только через ctx.
- Нельзя использовать глобальные переменные.
- Нельзя изменять файлы в папке `_core`.

## Проверяемые требования

- Метод getVersion вызывается через injected dataAccess.
- Возвращаемое значение соответствует результату dataAccess.