# trpc12 — Create (mutation)

## Цель задачи

Освоить реализацию Create-операции через mutation с использованием data-access слоя.

## Тип задачи

Функциональная (CRUD: Create).

## Задание

В файле `router.ts` необходимо:

1. Создать appRouter.
2. Добавить mutation-процедуру `createUser`.
3. Процедура должна принимать input:

   { name: string }

4. Процедура должна вызвать:

   ctx.dataAccess.createUser(name)

5. Процедура должна возвращать:

   { id: string }

## Ограничения

- Валидация input обязательна.
- Нельзя импортировать data-access напрямую.
- Использовать только ctx.dataAccess.
- Нельзя использовать глобальное состояние.

## Проверяемые требования

- createUser вызывается через injected dataAccess.
- Возвращаемый id соответствует результату access-слоя.