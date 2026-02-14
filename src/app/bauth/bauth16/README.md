# bauth16 — Ownership check в router

## Цель

Реализовать проверку владения ресурсом
на уровне router.

---

## Тип задачи

router

---

## Задание

В файле `bauth16.ts` необходимо:

1. Создать функцию updateProfile.
2. Принять:
   - ctx (с user)
   - ownerId (id ресурса)
   - handler
3. Если user отсутствует — выбросить UNAUTHORIZED.
4. Если user.id !== ownerId — выбросить FORBIDDEN.
5. Иначе выполнить handler и вернуть результат.

---

## Ограничения

- Нельзя проверять роль.
- Нельзя обращаться к БД.
- Нельзя использовать access-layer.
- Нельзя добавлять бизнес-логику.

---

## Проверяемые требования

- Нет user → UNAUTHORIZED.
- user.id !== ownerId → FORBIDDEN.
- user.id === ownerId → handler выполняется.
