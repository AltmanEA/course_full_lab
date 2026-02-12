# trpc34 — Invalidate после mutation (client-only)

## Цель задачи

Научиться инвалидировать query после выполнения mutation.

## Тип задачи

Функциональная (client-side).

## Задание

Реализуйте функцию useCreateUserWithInvalidate,
которая:

1. Вызывает trpc.user.create.useMutation()
2. Получает utils через trpc.useUtils()
3. После вызова mutate выполняет:
   utils.user.getAll.invalidate()

Функция должна вернуть mutation.

## Ограничения

- Использовать только trpc из client_core.
- Не использовать React-компоненты.
- Не добавлять лишнюю логику.
- Решение должно содержать 2–10 строк кода.

## Проверяемые требования

- useMutation вызывается.
- useUtils вызывается.
- invalidate вызывается для user.getAll.