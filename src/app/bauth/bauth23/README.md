# bauth23 — SameSite политика

## Цель

Освоить настройку параметра SameSite для session cookie.

## Тип задачи

security / session-level

## Формулировка

Реализуйте функцию `createSessionCookieConfig`.

Функция принимает параметр `env`:

- "development"
- "production"

Необходимо настроить параметр `sameSite` следующим образом:

- В production использовать "lax"
- В development использовать "strict"

## Ограничения

- Нельзя использовать process.env
- Функция должна быть чистой
- Нельзя добавлять дополнительные поля
- Нельзя изменять существующие поля
- HttpOnly должен оставаться true
- Secure должен настраиваться как в предыдущей задаче

## Проверяемые требования

1. В production `sameSite === "lax"`
2. В development `sameSite === "strict"`
3. `httpOnly` остаётся true
4. `secure` корректно зависит от env
5. Тип возвращаемого значения соответствует `SessionCookieConfig`
