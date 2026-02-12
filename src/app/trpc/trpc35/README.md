# trpc35 — useMutation с onSuccess (client-only)

## Цель задачи

Научиться передавать options в useMutation
и использовать onSuccess callback.

## Тип задачи

Функциональная (client-side).

## Задание

Реализуйте функцию useCreateUserWithSuccess,
которая вызывает:

trpc.user.create.useMutation({
  onSuccess: () => {
    console.log('success')
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
- В useMutation передан объект с onSuccess.
- onSuccess является функцией.
- Возвращается результат useMutation.