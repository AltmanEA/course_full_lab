# bauth28 — Middleware Next.js vs tRPC

## Цель

Понять различие уровней проверки авторизации:

- Route-level (Next.js middleware)
- Procedure-level (tRPC protectedProcedure)

## Тип задачи

architecture / security

## Формулировка

Реализуйте две функции:

1. `routeGuard`
2. `procedureGuard`

routeGuard:
- принимает `session: Session | null`
- если session отсутствует — выбрасывает UNAUTHORIZED
- иначе возвращает true

procedureGuard:
- принимает `user: User | null`
- если user отсутствует — выбрасывает UNAUTHORIZED
- иначе возвращает true

Важно:

routeGuard работает на уровне запроса,
procedureGuard — на уровне конкретной операции.

## Ограничения

- Нельзя смешивать проверки
- Нельзя использовать глобальные переменные
- Нельзя использовать реальные middleware
- Функции должны быть чистыми
- Нельзя объединять обе проверки в одну функцию

## Проверяемые требования

1. routeGuard выбрасывает ошибку при отсутствии session
2. procedureGuard выбрасывает ошибку при отсутствии user
3. При наличии данных функции возвращают true
