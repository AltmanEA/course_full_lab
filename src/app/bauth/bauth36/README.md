# bauth36 — Обработка ошибок доступа в UI

## Цель

Реализовать корректную реакцию UI на разные типы ошибок доступа.

## Тип задачи

ui-level / error-handling

## Формулировка

Реализуйте функцию `handleAccessError`.

Функция принимает:

- `error: unknown`

Необходимо:

- если ошибка имеет name === "UnauthorizedError"
  вернуть строку "redirect:/login"

- если ошибка имеет name === "ForbiddenError"
  вернуть строку "show:forbidden"

- в остальных случаях вернуть "show:generic-error"

Важно:

- Нельзя выбрасывать исключения
- Нельзя проверять текст сообщения
- Проверка должна выполняться по типу ошибки
- Функция должна быть чистой

## Проверяемые требования

1. UnauthorizedError → redirect:/login
2. ForbiddenError → show:forbidden
3. Другие ошибки → show:generic-error
