# bauth39 — Анти-паттерн: бизнес-логика в router

## Цель

Устранить бизнес-логику из router и перенести её в access-layer.

## Тип задачи

architecture / anti-pattern

## Формулировка

Дана функция `updateEmailRouter`.

Она принимает:

- `user: User | null`
- `newEmail: string`
- `accessUpdate: (userId: string, email: string) => string`

В текущей реализации router:

- выполняет проверку пользователя
- выполняет валидацию email
- вызывает access-layer

Требуется:

1. Оставить в router только проверку авторизации
2. Перенести бизнес-валидацию email в access-layer
3. Router должен вызывать accessUpdate без собственной валидации email

Важно:

- Router не должен содержать бизнес-правил
- Валидация email — часть доменной логики
- Нельзя использовать глобальные зависимости

## Проверяемые требования

1. При отсутствии user выбрасывается UnauthorizedError
2. Router не валидирует email
3. Access-layer отвечает за валидацию
4. При корректных данных возвращается результат accessUpdate
