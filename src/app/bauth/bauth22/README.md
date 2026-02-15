# bauth22 — Secure cookie

## Цель

Освоить настройку Secure-параметра cookie для production-среды.

## Тип задачи

security / session-level

## Формулировка

Реализуйте функцию `createSessionCookieConfig`.

Функция принимает параметр `env`,
который может быть:

- "development"
- "production"

Необходимо настроить параметр `secure`
в зависимости от среды выполнения:

- В production cookie должна быть Secure
- В development Secure включать не нужно

## Ограничения

- Нельзя использовать глобальные переменные
- Нельзя использовать process.env внутри функции
- Функция должна быть чистой
- Нельзя добавлять дополнительные поля
- Нельзя изменять существующие поля
- HttpOnly должен оставаться true

## Проверяемые требования

1. В production `secure === true`
2. В development `secure === false`
3. `httpOnly` остаётся true
4. Тип возвращаемого значения соответствует `SessionCookieConfig`
