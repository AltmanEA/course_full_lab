# trpc28 — Deterministic logging middleware

## Цель задачи

Освоить middleware, который логирует результат выполнения процедуры
без перехвата исключений.

## Тип задачи

Функциональная (middleware + observability).

## Задание

Реализуйте middleware loggingMiddleware, который:

- выполняет opts.next();
- если result.data === 'ok' → вызывает ctx.logger?.info;
- иначе → вызывает ctx.logger?.error;
- возвращает результат без изменений.

Процедура getData:

- если input.ok === true → возвращает 'ok';
- если input.ok === false → возвращает 'error'.

## Ограничения

- Не использовать try/catch.
- Не выбрасывать ошибок.
- Не использовать any.
- Не изменять _core.