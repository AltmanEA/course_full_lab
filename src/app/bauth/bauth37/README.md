# bauth37 — Повторная проверка прав в access-layer

## Цель

Реализовать проверку владения ресурсом в access-layer.

## Тип задачи

access-layer / security

## Формулировка

Реализуйте функцию `updateResource`.

Функция принимает:

- `user: User | null`
- `resource: Resource`
- `data: string`

Resource содержит:

- `ownerId: string`

Необходимо:

1. Если user отсутствует — выбросить UnauthorizedError
2. Если user.id !== resource.ownerId — выбросить ForbiddenError
3. Иначе вернуть обновлённый ресурс

Важно:

- Проверка должна происходить внутри функции
- Нельзя полагаться на router-level защиту
- Нельзя использовать глобальные переменные
- Функция должна быть чистой

## Проверяемые требования

1. При отсутствии user выбрасывается UnauthorizedError
2. При несовпадении ownerId выбрасывается ForbiddenError
3. При совпадении возвращается обновлённый ресурс
