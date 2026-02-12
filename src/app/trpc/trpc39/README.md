# trpc39 — Централизованный экспорт hooks (client-only)

## Цель задачи

Научиться создавать единую точку входа
для клиентских hooks.

## Тип задачи

Архитектурная (client-side).

## Задание

В файле router.ts создайте объект hooks:

- user.useUsers → trpc.user.getAll.useQuery()
- post.usePosts → trpc.post.getAll.useQuery()

В файле index.ts выполните реэкспорт hooks.

Экспорт hooks должен происходить только из index.ts.

## Ограничения

- Использовать только trpc из client_core.
- Не использовать React-компоненты.
- Не добавлять дополнительную логику.
- Решение должно содержать 2–10 строк кода в router.ts.

## Проверяемые требования

- index.ts экспортирует hooks.
- hooks.user.useUsers вызывает useQuery.
- hooks.post.usePosts вызывает useQuery.