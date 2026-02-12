# trpc10 — Композиция router

## Цель задачи

Освоить композицию router и построение модульного API.

## Тип задачи

Архитектурная.

## Задание

В файле `router.ts` необходимо:

1. Создать два отдельных router:
   - userRouter
   - systemRouter

2. userRouter должен содержать query:
   - "me"
   - возвращает { userId: string }
   - использует protectedProcedure

3. systemRouter должен содержать query:
   - "ping"
   - возвращает { status: "ok" }

4. Объединить оба router в appRouter.

## Ограничения

- Нельзя дублировать middleware.
- Нельзя использовать глобальные переменные.
- Нельзя изменять файлы в папке `_core`.
- Использовать router-композицию.

## Проверяемые требования

- Оба router доступны через appRouter.
- protectedProcedure работает.
- ping доступен без авторизации.