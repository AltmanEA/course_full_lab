# trpc29 — Middleware composition order

## Цель задачи

Понять, что порядок подключения middleware через .use()
влияет на итоговый результат.

## Тип задачи

Функциональная (middleware composition).

## Задание

Реализуйте два middleware:

1. prefixMiddleware — добавляет к result.data строку "prefix-".
2. suffixMiddleware — добавляет к result.data строку "-suffix".

Оба middleware должны:

- выполнить opts.next();
- изменить result.data;
- вернуть обновлённый result.

Подключите middleware в следующем порядке:

prefixMiddleware → suffixMiddleware

Процедура getValue должна возвращать строку "value".

## Проверяемые требования

- Итоговый результат: "prefix-value-suffix".
- Если поменять порядок middleware — результат изменится.