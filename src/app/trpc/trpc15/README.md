# trpc15 — Delete (deleteUser)

## Цель задачи

Освоить реализацию Delete-операции через mutation.

## Тип задачи

Функциональная (CRUD: Delete).

## Задание

В файле `router.ts` необходимо:

1. Создать appRouter.
2. Добавить mutation-процедуру `deleteUser`.
3. Процедура должна принимать input:

   { id: string }

4. Процедура должна вызвать:

   ctx.dataAccess.deleteUser(id)

5. Процедура должна возвращать:

   { success: boolean }

## Ограничения

- Валидация input обязательна.
- Нельзя импортировать data-access напрямую.
- Использовать только ctx.dataAccess.
- Нельзя использовать глобальное состояние.

## Проверяемые требования

- deleteUser вызывается через injected dataAccess.
- Возвращается корректный success.
- Пустой id вызывает ошибку.