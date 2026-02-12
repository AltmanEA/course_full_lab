# trpc14 — Update (updateUser)

## Цель задачи

Освоить реализацию Update-операции через mutation.

## Тип задачи

Функциональная (CRUD: Update).

## Задание

В файле `router.ts` необходимо:

1. Создать appRouter.
2. Добавить mutation-процедуру `updateUser`.
3. Процедура должна принимать input:

   { id: string, name: string }

4. Процедура должна вызвать:

   ctx.dataAccess.updateUser(id, name)

5. Процедура должна возвращать:

   { success: boolean }

## Ограничения

- Валидация input обязательна.
- Нельзя импортировать data-access напрямую.
- Использовать только ctx.dataAccess.
- Нельзя использовать глобальное состояние.

## Проверяемые требования

- updateUser вызывается через injected dataAccess.
- Возвращается корректный success.
- Пустые значения вызывают ошибку.