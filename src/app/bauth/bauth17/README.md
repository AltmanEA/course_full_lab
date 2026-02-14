# bauth17 — Ownership в access-layer

## Цель

Перенести проверку владения ресурсом
из router в access-layer.

---

## Тип задачи

access-layer

---

## Задание

В файле `bauth17.ts` необходимо:

1. Создать функцию updateProfileAccess.
2. Принять:
   - currentUserId (string | null)
   - ownerId (string)
   - operation (handler)
3. Если currentUserId отсутствует —
   выбросить UNAUTHORIZED.
4. Если currentUserId !== ownerId —
   выбросить FORBIDDEN.
5. Иначе выполнить operation и вернуть результат.

---

## Ограничения

- Нельзя использовать router.
- Нельзя использовать ctx.
- Нельзя проверять роль.
- Нельзя обращаться к БД.
- Нельзя добавлять бизнес-логику.

---

## Проверяемые требования

- Нет currentUserId → UNAUTHORIZED.
- currentUserId !== ownerId → FORBIDDEN.
- currentUserId === ownerId → operation выполняется.
