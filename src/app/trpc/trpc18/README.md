# trpc18 — postRouter (вторая сущность)

## Цель задачи

Освоить добавление новой доменной сущности через отдельный router.

## Тип задачи

Архитектурная (масштабирование API).

## Задание

В файле `router.ts` необходимо:

1. Создать postRouter.
2. Добавить процедуры:

   - createPost (mutation)
   - getPostById (query)

3. createPost:
   - принимает { title: string }
   - вызывает ctx.dataAccess.createPost
   - возвращает { id: string }

4. getPostById:
   - принимает { id: string }
   - вызывает ctx.dataAccess.getPostById
   - если пост не найден — выбрасывает NOT_FOUND
   - иначе возвращает пост

5. Подключить postRouter к appRouter вместе с userRouter.

## Ограничения

- Валидация input обязательна.
- Использовать только ctx.dataAccess.
- Нельзя импортировать access-слой напрямую.
- Нельзя размещать процедуры напрямую в appRouter.

## Проверяемые требования

- Процедуры доступны через appRouter.post.*
- createPost вызывает injected dataAccess.
- getPostById выбрасывает NOT_FOUND при отсутствии.