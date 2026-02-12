# trpc25 — Role-based protectedProcedure

## Цель задачи

Освоить архитектурную модель role-based доступа (RBAC)
через композицию процедур.

## Тип задачи

Функциональная (guard + DI).

## Задание

Реализуйте `adminProcedure` на основе `protectedProcedure`.

adminProcedure должен:

- разрешать выполнение только если ctx.user?.role === 'ADMIN';
- в остальных случаях выбрасывать TRPCError с кодом UNAUTHORIZED.

Используйте adminProcedure для процедуры `getSecret`.

Процедура должна возвращать строку "secret".

## Ограничения

- Не изменять _core.
- Использовать protectedProcedure.
- Не использовать any.
- Не использовать глобальные значения.
- Проверять только роль (без полноценной авторизации).

## Проверяемые требования

- ADMIN получает результат.
- USER получает UNAUTHORIZED.
- Отсутствие user также приводит к UNAUTHORIZED.