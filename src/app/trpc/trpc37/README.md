# trpc37 — Разделение hooks по доменам (client-only)

## Цель задачи

Научиться группировать client hooks
по доменной области.

## Тип задачи

Архитектурная (client-side).

## Задание

Создайте объект userHooks,
который содержит методы:

- useUsers — вызывает trpc.user.getAll.useQuery()
- useCreateUser — вызывает trpc.user.create.useMutation()

Экспортируйте userHooks.

## Ограничения

- Использовать только trpc из client_core.
- Не использовать React-компоненты.
- Не добавлять дополнительную логику.
- Решение должно содержать 2–10 строк кода.

## Проверяемые требования

- userHooks существует.
- useUsers вызывает useQuery.
- useCreateUser вызывает useMutation.