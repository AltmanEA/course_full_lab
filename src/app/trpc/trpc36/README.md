# trpc36 — useMutation с onError (client-only)

## Цель задачи

Научиться использовать onError callback
в useMutation.

## Тип задачи

Функциональная (client-side).

## Задание

Реализуйте функцию useCreateUserWithError,
которая вызывает:

trpc.user.create.useMutation({
  onError: () => {
    console.error('error')
  }
})

Функция должна возвращать результат useMutation.

## Ограничения

- Использовать только trpc из client_core.
- Не использовать React-компоненты.
- Не добавлять дополнительную логику.
- Решение должно содержать 2–10 строк кода.

## Проверяемые требования

- useMutation вызывается.
- В useMutation передан объект с onError.
- onError является функцией.
- Возвращается результат useMutation.