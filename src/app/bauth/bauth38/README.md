# bauth38 — Анти-паттерн: проверка роли только в UI

## Цель

Выявить архитектурную уязвимость при проверке роли только на уровне UI.

## Тип задачи

architecture / anti-pattern

## Формулировка

Дана функция `uiOnlyDelete`.

Она принимает:

- `user: User | null`
- `deleteFromDb: () => string`

Требуется:

1. Реализовать server-side проверку роли ADMIN
2. Если user отсутствует — выбросить UnauthorizedError
3. Если роль не ADMIN — выбросить ForbiddenError
4. Если роль ADMIN — выполнить deleteFromDb

Важно:

- Нельзя полагаться на UI-level проверку
- Нельзя удалять проверку
- Проверка должна быть внутри функции

## Проверяемые требования

1. Отсутствие user → UnauthorizedError
2. USER роль → ForbiddenError
3. ADMIN роль → выполняется deleteFromDb
