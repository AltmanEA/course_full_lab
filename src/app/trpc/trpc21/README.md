# trpc21 — Request metadata в context

## Цель задачи

Научиться использовать инфраструктурные данные из context
(requestId) внутри процедуры.

## Тип задачи

Функциональная (работа с context).

## Задание

В router.ts реализуйте query `getRequestId`,
которая возвращает значение `ctx.requestId`.

Если requestId отсутствует,
процедура должна выбросить ошибку
с кодом INTERNAL_SERVER_ERROR.

## Ограничения

- Использовать publicProcedure.
- Не импортировать ничего напрямую, кроме _core.
- Не изменять _core.
- Не использовать any.
- Не добавлять глобальные значения.

## Проверяемые требования

- Процедура возвращает requestId из context.
- При отсутствии requestId выбрасывается TRPCError с кодом INTERNAL_SERVER_ERROR.