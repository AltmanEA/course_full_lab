# trpc38 — Композиция hooks (client-only)

## Цель задачи

Научиться объединять доменные hook-группы
в единый экспортируемый объект.

## Тип задачи

Архитектурная (client-side).

## Задание

1. Создайте объект userHooks:
   - useUsers → trpc.user.getAll.useQuery()

2. Создайте объект postHooks:
   - usePosts → trpc.post.getAll.useQuery()

3. Создайте объект hooks,
   который объединяет userHooks и postHooks.

Экспортируйте hooks.

## Ограничения

- Использовать только trpc из client_core.
- Не использовать React-компоненты.
- Не добавлять дополнительную логику.
- Решение должно содержать 2–10 строк кода.

## Проверяемые требования

- hooks.user.useUsers вызывает useQuery.
- hooks.post.usePosts вызывает useQuery.