# bauth30 — Production-ready security конфигурация

## Цель

Собрать production-ready конфигурацию session cookie
с учётом всех требований безопасности.

## Тип задачи

security / session-level

## Формулировка

Реализуйте функцию `createSessionSecurityConfig`.

Функция принимает:

- `env: "development" | "production"`
- `ttlMs: number`
- `clock: () => number`

Необходимо вернуть объект:

{
  cookie: {
    name: string
    httpOnly: boolean
    secure: boolean
    sameSite: "lax" | "strict"
  },
  expiresAt: number
}

Требования:

1. httpOnly всегда true
2. secure === true только в production
3. sameSite:
   - production → "lax"
   - development → "strict"
4. expiresAt = clock() + ttlMs

## Ограничения

- Нельзя использовать Date.now
- Нельзя использовать process.env
- Нельзя использовать глобальные переменные
- Функция должна быть чистой
- Нельзя добавлять дополнительные поля

## Проверяемые требования

1. Все cookie-параметры корректны
2. expiration вычисляется правильно
3. Поведение зависит только от аргументов
