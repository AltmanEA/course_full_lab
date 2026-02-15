# bauth40 — Полный защищённый data-flow приложения

## Цель

Собрать целостный защищённый fullstack flow.

## Тип задачи

integration / architecture

## Формулировка

Реализуйте функцию `executeUpdateFlow`.

Функция принимает:

- `cookie: string | null`
- `storage: SessionStorage`
- `resource: Resource`
- `newData: string`
- `updateAccess: (userId: string, resource: Resource, data: string) => Resource`

Flow должен быть следующим:

1. Получить session из cookie
2. Если session отсутствует — выбросить UnauthorizedError
3. Создать user из session
4. Передать user в access-layer
5. Вернуть обновлённый ресурс

Access-layer выполняет ownership-проверку.

Важно:

- Нельзя выполнять ownership-проверку в router
- Нельзя использовать глобальные переменные
- Нельзя использовать UI-level защиту
- Функция должна быть чистой

## Проверяемые требования

1. Нет cookie → UnauthorizedError
2. Session не найдена → UnauthorizedError
3. User не владелец → ForbiddenError (из access-layer)
4. User владелец → ресурс обновляется
