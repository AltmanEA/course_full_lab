# trpc40 — Полный data-flow сценарий (client-only)

## Цель задачи

Собрать полный клиентский data-flow:

- query для получения данных
- mutation для изменения данных
- invalidate после mutation

## Тип задачи

Архитектурная (client-side).

## Задание

Реализуйте функцию useUserModule,
которая:

1. Получает данные через:
   trpc.user.getAll.useQuery()

2. Создаёт mutation через:
   trpc.user.create.useMutation()

3. Получает utils через:
   trpc.useUtils()

4. Вызывает:
   utils.user.getAll.invalidate()

Функция должна вернуть объект:

{
  users,
  createUser
}

где:
- users — результат useQuery
- createUser — результат useMutation

## Ограничения

- Использовать только trpc из client_core.
- Не использовать React-компоненты.
- Не добавлять дополнительную логику.
- Решение должно содержать 2–10 строк кода.

## Проверяемые требования

- useQuery вызывается.
- useMutation вызывается.
- useUtils вызывается.
- invalidate вызывается.
- Возвращается объект с users и createUser.