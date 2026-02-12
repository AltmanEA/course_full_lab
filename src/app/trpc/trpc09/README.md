# trpc09 — protectedProcedure

## Цель задачи

Освоить архитектурный паттерн protectedProcedure на основе middleware.

## Тип задачи

Архитектурная.

## Задание

В файле `router.ts` необходимо:

1. Создать protectedProcedure на основе publicProcedure.
2. protectedProcedure должен:
   - проверять наличие ctx.user;
   - если user отсутствует — выбрасывать TRPCError с кодом "UNAUTHORIZED".

3. Создать query-процедуру `me`, использующую protectedProcedure.
4. Процедура должна возвращать:

   { userId: string }

   где userId берётся из ctx.user.id.

## Ограничения

- Ошибка должна выбрасываться через TRPCError.
- Нельзя использовать try/catch.
- Нельзя изменять файлы в папке `_core`.
- Доступ к данным — только через ctx.

## Проверяемые требования

- При наличии user процедура возвращает userId.
- При отсутствии user возникает ошибка.